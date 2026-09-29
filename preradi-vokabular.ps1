# preradi-vokabular.ps1 - nocni rad Claude Codea, bez nadzora.
# Napisano 29.09.2026.
#   Faza 1: Vocabulary 1-20 prema UPUTE-vokabular-preradba.md
#   Faza 2: razine 13-20 (Lesson -> Grammar -> Practice -> Test) prema UPUTE-razine-13-20-nocni.md
#
# Svaka cjelina je zaseban poziv "claude -p" (svjez kontekst). Gotova je tek kad Claude
# upise "GOTOVO <oznaka>" u vokabular-preradba-status.txt. Ponovno pokretanje preskace gotove.
#
# LIMIT: kad Claude javi da je limit potrosen, skripta ceka dok se ne obnovi (iz poruke
# procita sat obnove; ako ga ne nade, provjerava svakih 30 min) i nastavlja - koliko god
# puta treba. Ostale greske: 3 pokusaja, zatim se cjelina oznaci PRESKOCENO i ide dalje.
#
# Pokretanje: preradi-vokabular.bat              (sve)
#             preradi-vokabular.bat -SamoFaza 2  (samo razine 13-20)

param([int]$SamoFaza = 0, [string]$Model = 'opus')
$ErrorActionPreference = 'Continue'
Set-Location -LiteralPath $PSScriptRoot
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$status = Join-Path $PSScriptRoot 'vokabular-preradba-status.txt'
$logDir = Join-Path $PSScriptRoot '_arhiva\nocni-rad-log'
$bakDir = Join-Path $PSScriptRoot ('_arhiva\vokabular-prije-preradbe-' + (Get-Date -Format 'yyyy-MM-dd'))
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
if (-not (Test-Path $status)) { New-Item -ItemType File -Path $status | Out-Null }
if (-not (Test-Path $bakDir)) {
  New-Item -ItemType Directory -Force -Path $bakDir | Out-Null
  Copy-Item -Path (Join-Path $PSScriptRoot 'igre\*.md') -Destination $bakDir
  Write-Host "Kopija svih igre/*.md: $bakDir"
}
# racunalo ne smije zaspati dok je na struji (vrati poslije u postavkama napajanja)
try { powercfg /change standby-timeout-ac 0; powercfg /change hibernate-timeout-ac 0 } catch {}

# ---- gdje je Claude Code? (PATH ili uobicajena mjesta instalacije) ----
$claudeExe = $null
$c = Get-Command claude -ErrorAction SilentlyContinue
if ($c) { $claudeExe = $c.Source }
if (-not $claudeExe) {
  foreach ($k in @("$env:USERPROFILE\.local\bin\claude.exe", "$env:APPDATA\npm\claude.cmd", "$env:LOCALAPPDATA\Programs\claude\claude.exe", "$env:USERPROFILE\.claude\local\claude.exe")) {
    if (Test-Path $k) { $claudeExe = $k; break }
  }
}
if (-not $claudeExe) {
  Write-Host ''
  Write-Host 'Claude Code (naredba "claude") nije pronadjen na ovom racunalu.' -ForegroundColor Red
  Write-Host 'Instaliraj ga: otvori PowerShell i upisi   irm https://claude.ai/install.ps1 | iex'
  Write-Host 'Zatim u novom prozoru upisi   claude   i prijavi se svojim racunom (jednom).'
  Write-Host 'Onda ponovno pokreni preradi-vokabular.bat.'
  exit 1
}
Write-Host "Claude Code: $claudeExe   model: $Model"
# oznake PRESKOCENO iz ranijih pokretanja brisu se, da se te cjeline pokusaju ponovno
$stari = Get-Content -Path $status -ErrorAction SilentlyContinue | Where-Object { $_ -notmatch '^PRESKOCENO ' }
Set-Content -Path $status -Value $stari

$alati = @('Read','Edit','Write','Glob','Grep','Bash(node:*)','Bash(ls:*)','Bash(cat:*)','Bash(grep:*)','Bash(head:*)','Bash(wc:*)','Bash(mkdir:*)','Bash(cp:*)')

function Pisi([string]$t) { $l = "[{0}] {1}" -f (Get-Date -Format 'dd.MM. HH:mm'), $t; Write-Host $l; Add-Content -Path (Join-Path $logDir 'tijek.txt') -Value $l }
function Oznaceno([string]$oz) {
  return (Select-String -Path $status -Pattern ("^(GOTOVO|PRESKOCENO) " + [regex]::Escape($oz) + "\s*$") -Quiet)
}
function JeLimit([string]$tekst) {
  return ($tekst -match '(?i)(usage limit|limit reached|limit will reset|rate limit|session limit|out of (extra )?usage|resets? at|hit your limit)')
}
# koliko minuta cekati do obnove limita (iz poruke tipa "resets 3am" / "reset at 5:30pm"), inace 30
function MinutaDoObnove([string]$tekst) {
  $m = [regex]::Match($tekst, '(?i)reset[s]?\s*(?:at\s*)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)')
  if (-not $m.Success) { return 30 }
  $h = [int]$m.Groups[1].Value; $min = 0
  if ($m.Groups[2].Success) { $min = [int]$m.Groups[2].Value }
  $ap = $m.Groups[3].Value.ToLower()
  if ($ap -eq 'pm' -and $h -lt 12) { $h += 12 }
  if ($ap -eq 'am' -and $h -eq 12) { $h = 0 }
  $sad = Get-Date
  $cilj = Get-Date -Hour $h -Minute $min -Second 0
  if ($cilj -le $sad) { $cilj = $cilj.AddDays(1) }
  $razlika = [int][Math]::Ceiling(($cilj - $sad).TotalMinutes) + 3
  if ($razlika -gt 330) { return 30 }   # nesto ne stima - radije provjeri za pola sata
  return [Math]::Max($razlika, 5)
}

function Radi([string]$oznaka, [string]$prompt, $nista) {
  if (Oznaceno $oznaka) { Pisi "$oznaka vec oznacen - preskacem."; return }
  $greske = 0; $i = 0
  while (-not (Oznaceno $oznaka)) {
    $i++
    $log = Join-Path $logDir ("$oznaka-$i.log")
    Pisi "$oznaka - pokusaj $i"
    & $claudeExe -p $prompt --model $Model --permission-mode acceptEdits --allowedTools $alati 2>&1 | Tee-Object -FilePath $log
    if (Oznaceno $oznaka) { Pisi "$oznaka GOTOVO"; break }
    $izlaz = ''
    if (Test-Path $log) { $izlaz = Get-Content -Raw -Path $log }
    if (JeLimit $izlaz) {
      $cekaj = MinutaDoObnove $izlaz
      Pisi "$oznaka - limit potrosen, cekam $cekaj min do obnove."
      Start-Sleep -Seconds ($cekaj * 60)
      continue          # limit se ne broji kao greska - ceka koliko god puta treba
    }
    $greske++
    if ($greske -ge 3) {
      Add-Content -Path $status -Value ("PRESKOCENO " + $oznaka)
      Pisi "$oznaka - 3 neuspjela pokusaja, PRESKOCENO. Pogledaj $logDir"
      break
    }
    Pisi "$oznaka - nije zavrsen, ponavljam za 3 min."
    Start-Sleep -Seconds 180
  }
}

# ---------- FAZA 1: Vocabulary 1-20 ----------
if ($SamoFaza -eq 0 -or $SamoFaza -eq 1) {
  for ($n = 1; $n -le 20; $n++) {
    $nn = '{0:D2}' -f $n
    $p = @"
Radis Vocabulary $n. Procitaj UPUTE-vokabular-preradba.md i drzi ga se doslovno.
Stare rijeci za ovu razinu vec su u vokabular-plan.json pod kljucem $n - koristi upravo njih.
Prepisi igre/vokabular-$nn.md, pokreni node osvjezi.js, provjeri rezultat, dopisi odjeljak u VOKABULAR-dnevnik.md
i tek na kraju dopisi redak GOTOVO $n u vokabular-preradba-status.txt.
Ne postavljaj pitanja - radis bez nadzora. Kad nesto nije jasno, odluci razumno i zapisi odluku u dnevnik.
"@
    if (-not (Oznaceno "$n")) { node vokabular-stare.js $n }
    Radi "$n" $p $null
  }
}

# ---------- FAZA 2: razine 13-20 ----------
if ($SamoFaza -eq 0 -or $SamoFaza -eq 2) {
  $cjeline = @(
    @{ K = 'L'; Ime = 'Lesson';   Dat = 'lekcija' },
    @{ K = 'G'; Ime = 'Grammar';  Dat = 'gramatika' },
    @{ K = 'P'; Ime = 'Practice'; Dat = 'praksa' },
    @{ K = 'T'; Ime = 'Test';     Dat = 'test' }
  )
  for ($n = 13; $n -le 20; $n++) {
    $nn = '{0:D2}' -f $n
    foreach ($c in $cjeline) {
      $oz = $c.K + $n
      $p = @"
Radis $($c.Ime) $n (datoteka igre/$($c.Dat)-$nn.md). Procitaj UPUTE-razine-13-20-nocni.md i drzi ga se doslovno,
zajedno s dokumentima i uzorima koje on navodi za $($c.Ime).
Prosiri datoteku, pokreni node osvjezi.js, provjeri rezultat, dopisi odjeljak u NOCNI-dnevnik-13-20.md
i tek na kraju dopisi redak GOTOVO $oz u vokabular-preradba-status.txt.
Ne postavljaj pitanja - radis bez nadzora. Kad nesto nije jasno, odluci razumno i zapisi odluku u dnevnik.
"@
      Radi $oz $p $null
    }
  }
}
Pisi "Kraj. Status: vokabular-preradba-status.txt"
