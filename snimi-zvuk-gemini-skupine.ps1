# Snima rijeci s Gemini TTS - u SKUPINAMA (20 rijeci u jednom zahtjevu) i pojedinacno -
# i SVAKU snimku provjerava: jeftini tekstni model (Flash-Lite) napise sto cuje, pa se
# usporedi s ocekivanom rijeci. Tako se hvata npr. "one" izgovoreno kao "jedan".
#
# Redoslijed:
#   1. provjera starih snimki u zvuk-gemini\<glas>\  (bez TTS-a, ne trosi TTS limit)
#   2. skupine  -> zvuk-gemini\<glas>-skupine\skupina-NNN.wav (+ .txt)
#                  rijeci koje provjera ne prihvati idu u zvuk-gemini-ponovi.txt
#   3. pojedinacno (recenice, rizicne rijeci iz zvuk-gemini-rizicne.txt, zvuk-gemini-ponovi.txt)
#                -> zvuk-gemini\<glas>-pojedinacno\   (2 pokusaja s provjerom)
#                -> ako oba padnu: edge-tts, zenski hrvatski glas -> zvuk-gemini\Gabrijela\
#
# Sve provjere se biljeze u zvuk-gemini-provjera.csv. Nista se ne brise.
# Vec snimljeno se preskace; kod dnevnog limita skripta ispise poruku i stane.
# Rezanje skupina na rijeci radi Claude poslije (izrezi-skupine.py).
#
# Proba:  powershell -ExecutionPolicy Bypass -File snimi-zvuk-gemini-skupine.ps1 -Samo 1
#         (1 skupina + 3 pojedinacne rijeci)
# Napravljeno 27.09.2026.

param(
  [string]$Popis         = 'zvuk-gemini-nedostaje.txt',
  [string]$Glas          = 'Kore',
  [int]$Velicina         = 20,
  [int]$Samo             = 0,
  [double]$MaxUSD        = 1.5,
  [int]$RazmakSek        = 7,
  [string]$Model         = 'gemini-2.5-flash-preview-tts',
  [string]$ModelProvjera = '',
  [string]$Rezerva       = 'hr-HR-GabrijelaNeural'
)

$ErrorActionPreference = 'Stop'
$mapa = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $mapa
$utf8 = New-Object Text.UTF8Encoding($false)

function Kraj([int]$kod) { Read-Host 'Enter za izlaz' | Out-Null; exit $kod }

# --- kljuc i model za provjeru iz .env ---
$kljuc = $null; $envModel = $null
foreach ($r in [IO.File]::ReadAllLines((Join-Path $mapa '.env'))) {
  if ($r -match '^\s*GEMINI_API_KEY\s*=\s*(.+?)\s*$') { $kljuc = $Matches[1].Trim('"').Trim("'") }
  if ($r -match '^\s*GEMINI_MODEL\s*=\s*(.+?)\s*$')   { $envModel = $Matches[1].Trim('"').Trim("'") }
}
if (-not $kljuc) { Write-Host 'U .env nema retka GEMINI_API_KEY=...' -ForegroundColor Red; Kraj 1 }
if (-not $ModelProvjera) { $ModelProvjera = $(if ($envModel) { $envModel } else { 'gemini-3.1-flash-lite' }) }

# ---------------- pomocne ----------------
function NazivDatoteke([string]$t) {
  $n = $t.Normalize([Text.NormalizationForm]::FormC)
  $n = $n -replace '[\\/:*?"<>|]', ''
  $n = $n -replace '\s+', ' '
  $n = $n.Trim() -replace '[.!?\s]+$', ''
  return $n
}
function Kljuc([string]$t) { return (NazivDatoteke $t).ToLowerInvariant() }
function Norm([string]$t) {
  $t = $t.Normalize([Text.NormalizationForm]::FormC).ToLowerInvariant()
  $t = $t -replace '[^\p{L}\p{N}\s]', ' '
  return ($t -replace '\s+', ' ').Trim()
}
function Lev([string]$a, [string]$b) {
  $n = $a.Length; $m = $b.Length
  if ($n -eq 0) { return $m }; if ($m -eq 0) { return $n }
  $d = New-Object 'int[,]' ($n + 1), ($m + 1)
  for ($i = 0; $i -le $n; $i++) { $d[$i, 0] = $i }
  for ($j = 0; $j -le $m; $j++) { $d[0, $j] = $j }
  for ($i = 1; $i -le $n; $i++) {
    for ($j = 1; $j -le $m; $j++) {
      $c = 1; if ($a[$i - 1] -ceq $b[$j - 1]) { $c = 0 }
      $d[$i, $j] = [Math]::Min([Math]::Min($d[($i - 1), $j] + 1, $d[$i, ($j - 1)] + 1), $d[($i - 1), ($j - 1)] + $c)
    }
  }
  return $d[$n, $m]
}
# slicnost 0..1 (1 = isto); male razlike u prijepisu (1 slovo) se toleriraju
function Slicnost([string]$a, [string]$b) {
  $a = Norm $a; $b = Norm $b
  $mx = [Math]::Max($a.Length, $b.Length); if ($mx -eq 0) { return 1.0 }
  return 1.0 - (Lev $a $b) / $mx
}
function WavIzPcm([byte[]]$pcm, [int]$rate) {
  $ms = New-Object IO.MemoryStream
  $w  = New-Object IO.BinaryWriter($ms)
  $w.Write([Text.Encoding]::ASCII.GetBytes('RIFF')); $w.Write([int](36 + $pcm.Length))
  $w.Write([Text.Encoding]::ASCII.GetBytes('WAVEfmt ')); $w.Write([int]16); $w.Write([int16]1); $w.Write([int16]1)
  $w.Write([int]$rate); $w.Write([int]($rate * 2)); $w.Write([int16]2); $w.Write([int16]16)
  $w.Write([Text.Encoding]::ASCII.GetBytes('data')); $w.Write([int]$pcm.Length); $w.Write($pcm)
  $w.Flush(); return $ms.ToArray()
}
function WavBajtovi($dio) {
  $rate = 24000
  if ($dio.inlineData.mimeType -match 'rate=(\d+)') { $rate = [int]$Matches[1] }
  return (WavIzPcm ([Convert]::FromBase64String($dio.inlineData.data)) $rate)
}
function Linije([string]$p) {
  if (-not (Test-Path -LiteralPath $p)) { return @() }
  return @([IO.File]::ReadAllLines($p, $utf8) | ForEach-Object { $_.Trim() } | Where-Object { $_ -and -not $_.StartsWith('#') })
}

# ---------------- mape i datoteke ----------------
$dirStari = Join-Path $mapa ("zvuk-gemini\" + $Glas)
$dirSkup  = Join-Path $mapa ("zvuk-gemini\" + $Glas + "-skupine")
$dirPoj   = Join-Path $mapa ("zvuk-gemini\" + $Glas + "-pojedinacno")
$dirOdb   = Join-Path $mapa ("zvuk-gemini\" + $Glas + "-odbaceno")
$imeRez   = ($Rezerva -replace '^hr-HR-', '' -replace 'Neural$', '')
$dirRez   = Join-Path $mapa ("zvuk-gemini\" + $imeRez)
foreach ($d in @($dirSkup, $dirPoj, $dirOdb, $dirRez)) { New-Item -ItemType Directory -Force -Path $d | Out-Null }
$planDat  = Join-Path $mapa 'zvuk-gemini-plan.txt'
$ponDat   = Join-Path $mapa 'zvuk-gemini-ponovi.txt'
$provDat  = Join-Path $mapa 'zvuk-gemini-provjera.csv'
$log      = Join-Path $mapa 'zvuk-gemini-log.csv'
if (-not (Test-Path $log)) { 'vrijeme;glas;tekst;ulaz_tokena;izlaz_tokena;usd;status' | Out-File $log -Encoding UTF8 }
if (-not (Test-Path $provDat)) { [IO.File]::WriteAllText($provDat, "vrijeme;izvor;ocekivano;cuje;jezik;ok`r`n", $utf8) }

# rizicne rijeci
$rizicne = @{}
foreach ($r in (Linije (Join-Path $mapa 'zvuk-gemini-rizicne.txt'))) {
  $p = $r -split "`t", 2
  $rizicne[(Kljuc $p[0])] = $(if ($p.Count -gt 1) { $p[1] } else { '' })
}

# sto vec ima zvuk
function ImenaU([string]$dir) {
  $h = @{}
  if (Test-Path -LiteralPath $dir) { Get-ChildItem -LiteralPath $dir -File | ForEach-Object { $h[(Kljuc $_.BaseName)] = 1 } }
  return $h
}
$imaZvuk  = ImenaU (Join-Path $mapa 'zvuk')
$imaStari = ImenaU $dirStari

$script:trosak = 0.0
$script:provjeraRadi = $true
$script:ttsZahtjeva = 0

# ---------------- zahtjevi ----------------
# $vrsta = 'tts' ili 'provjera'. Vraca odgovor ili $null.
function Zahtjev([string]$model, $tijelo, [string]$oznaka, [string]$vrsta) {
  $url = "https://generativelanguage.googleapis.com/v1beta/models/$($model):generateContent"
  $bajtovi = [Text.Encoding]::UTF8.GetBytes(($tijelo | ConvertTo-Json -Depth 12))
  for ($pokusaj = 1; $pokusaj -le 3; $pokusaj++) {
    try {
      $odg = Invoke-RestMethod -Method Post -Uri $url -Headers @{ 'x-goog-api-key' = $kljuc } -ContentType 'application/json; charset=utf-8' -Body $bajtovi -TimeoutSec 180
      $u = [double]$odg.usageMetadata.promptTokenCount; $i = [double]$odg.usageMetadata.candidatesTokenCount
      if ($vrsta -eq 'tts') { $usd = $u * 0.50 / 1e6 + $i * 10.0 / 1e6; $script:ttsZahtjeva++ }
      else { $usd = $u * 0.50 / 1e6 + $i * 1.50 / 1e6 }
      $script:trosak += $usd
      ("{0};{1};{2};{3};{4};{5:N6};{6}" -f (Get-Date -Format s), $(if ($vrsta -eq 'tts') { $Glas } else { 'provjera' }), $oznaka, $u, $i, $usd, 'ok') | Out-File $log -Append -Encoding UTF8
      return $odg
    } catch {
      $kod = $null; try { $kod = [int]$_.Exception.Response.StatusCode } catch {}
      $poruka = "$($_.ErrorDetails.Message)"
      if ($kod -eq 429) {
        if ($poruka -match 'PerDay|per day|daily') {
          if ($vrsta -eq 'provjera') {
            Write-Host 'Dnevni limit za PROVJERU je potrosen - nastavljam bez provjere (oznaceno kao neprovjereno).' -ForegroundColor Yellow
            $script:provjeraRadi = $false; return $null
          }
          Write-Host ''
          Write-Host ("DNEVNI LIMIT za snimanje je potrosen (danas {0} zahtjeva). Pokreni ponovo sutra nakon 9 h - nastavlja gdje je stala." -f $script:ttsZahtjeva) -ForegroundColor Yellow
          Write-Host ("Potroseno u ovoj turi: ~{0:N3} USD" -f $script:trosak)
          Kraj 0
        }
        Write-Host ("  limit po minuti - cekam 60 s ({0}/3)" -f $pokusaj) -ForegroundColor DarkGray
        Start-Sleep -Seconds 60; continue
      }
      if ($kod -ge 500) { Write-Host "  greska posluzitelja ($kod) - cekam 20 s" -ForegroundColor DarkGray; Start-Sleep -Seconds 20; continue }
      Write-Host ("Greska ({0}) za: {1}" -f $kod, $oznaka) -ForegroundColor Red
      if ($poruka) { Write-Host $poruka -ForegroundColor DarkYellow }
      if ($vrsta -eq 'provjera') { $script:provjeraRadi = $false; Write-Host 'Nastavljam bez provjere.' -ForegroundColor Yellow; return $null }
      Kraj 1
    }
  }
  if ($vrsta -eq 'provjera') { $script:provjeraRadi = $false; return $null }
  Write-Host 'Tri puta zaredom limit - vjerojatno je dnevni. Pokreni ponovo sutra.' -ForegroundColor Yellow
  Kraj 0
}

function Tts([string]$tekst, [string]$oznaka) {
  for ($p = 1; $p -le 3; $p++) {
    $tijelo = @{
      contents = @(@{ parts = @(@{ text = $tekst }) })
      generationConfig = @{
        responseModalities = @('AUDIO')
        speechConfig = @{ voiceConfig = @{ prebuiltVoiceConfig = @{ voiceName = $Glas } } }
      }
    }
    $odg = Zahtjev $Model $tijelo $oznaka 'tts'
    $dio = $odg.candidates[0].content.parts | Where-Object { $_.inlineData } | Select-Object -First 1
    if ($dio) { return $dio }
    Write-Host "  (nema zvuka za: $oznaka - pokusavam ponovo)" -ForegroundColor DarkGray
    Start-Sleep -Seconds $RazmakSek
  }
  return $null
}

# Vraca listu @{t=..; jez=..} ili $null (provjera nedostupna)
function Prepisi([byte[]]$wav, [int]$n, [string]$oznaka) {
  if (-not $script:provjeraRadi) { return $null }
  $upit = "The audio contains $n short item(s) spoken one after another. They should be Croatian dictionary words or phrases, " +
          "but some may have been spoken in English or translated. Transcribe exactly what is said, item by item, as spoken - " +
          "do not translate, do not correct. For each item give the language it was actually spoken in: HR (Croatian) or EN (English). " +
          'Answer only with JSON: {"items":[{"t":"...","lang":"HR"}]}'
  $tijelo = @{
    contents = @(@{ parts = @(@{ text = $upit }, @{ inlineData = @{ mimeType = 'audio/wav'; data = [Convert]::ToBase64String($wav) } }) })
    generationConfig = @{ temperature = 0; responseMimeType = 'application/json' }
  }
  $odg = Zahtjev $ModelProvjera $tijelo ("provjera " + $oznaka) 'provjera'
  if (-not $odg) { return $null }
  try {
    $s = [string]$odg.candidates[0].content.parts[0].text
    $s = $s -replace '^\s*```(json)?', '' -replace '```\s*$', ''
    $j = $s | ConvertFrom-Json
    $lista = New-Object System.Collections.Generic.List[object]
    foreach ($x in $j.items) { $lista.Add(@{ t = [string]$x.t; jez = [string]$x.lang }) }
    return ,$lista
  } catch { return $null }
}

function Ok([string]$ocek, $h) {
  if (-not $h) { return $false }
  return ($h.jez -ne 'EN') -and ((Slicnost $ocek $h.t) -ge 0.75)
}
function Biljezi([string]$izvor, [string]$ocek, $h, $ok) {
  $cuje = ''; $jez = ''
  if ($h) { $cuje = ($h.t -replace ';', ','); $jez = $h.jez }
  $st = $(if ($null -eq $ok) { 'neprovjereno' } elseif ($ok) { '1' } else { '0' })
  [IO.File]::AppendAllText($provDat, ("{0};{1};{2};{3};{4};{5}`r`n" -f (Get-Date -Format s), $izvor, ($ocek -replace ';', ','), $cuje, $jez, $st), $utf8)
}
function DodajPonovi([string]$t) {
  $post = @{}; foreach ($x in (Linije $ponDat)) { $post[(Kljuc $x)] = 1 }
  if (-not $post.ContainsKey((Kljuc $t))) { [IO.File]::AppendAllText($ponDat, $t + "`r`n", $utf8) }
}

# ---------------- edge-tts (rezerva) ----------------
$script:edgeCmd = $null; $script:edgeTrazen = $false
function EdgeTts([string]$t, [string]$izlaz) {
  if (-not $script:edgeTrazen) {
    $script:edgeTrazen = $true
    foreach ($k in @(@('py'), @('py', '-3.13'), @('py', '-3.12'), @('py', '-3.11'), @('python'))) {
      $a = @($k | Select-Object -Skip 1)
      try { & $k[0] @($a + @('-m', 'edge_tts', '--help')) *> $null; if ($LASTEXITCODE -eq 0) { $script:edgeCmd = $k; break } } catch {}
    }
    if (-not $script:edgeCmd) { Write-Host '  edge-tts nije pronaden - rezerva nije moguca.' -ForegroundColor Yellow }
  }
  if (-not $script:edgeCmd) { return $false }
  $tmp = Join-Path $env:TEMP 'croland-edge.txt'
  [IO.File]::WriteAllText($tmp, $t, $utf8)
  $a = @($script:edgeCmd | Select-Object -Skip 1)
  try { & $script:edgeCmd[0] @($a + @('-m', 'edge_tts', '--voice', $Rezerva, '--file', $tmp, '--write-media', $izlaz)) *> $null } catch {}
  return (Test-Path -LiteralPath $izlaz)
}

# ---------------- plan ----------------
$skupine = New-Object System.Collections.Generic.List[object]
$pojedinacno = New-Object System.Collections.Generic.List[string]
if (Test-Path $planDat) {
  foreach ($r in [IO.File]::ReadAllLines($planDat, $utf8)) {
    if ($r -match '^(\d+)\t(.+)$') { $skupine.Add(@($Matches[2] -split '\|')) }
    elseif ($r -match '^P\t(.+)$') { $pojedinacno.Add($Matches[1]) }
  }
  Write-Host ("Plan ucitan: {0} skupina, {1} pojedinacno" -f $skupine.Count, $pojedinacno.Count)
} else {
  $vidjeno = @{}; $rijeci = New-Object System.Collections.Generic.List[string]
  foreach ($t in (Linije (Join-Path $mapa $Popis))) {
    $k = Kljuc $t
    if (-not $k -or $vidjeno.ContainsKey($k) -or $imaZvuk.ContainsKey($k)) { continue }
    $vidjeno[$k] = 1
    $riz = $rizicne.ContainsKey($k)
    if (-not $riz -and $imaStari.ContainsKey($k)) { continue }      # stara snimka - provjerava se u koraku 1
    if ($riz -or $t -match '[.,!?:;"]' -or ($t -split '\s+').Count -gt 3) { $pojedinacno.Add($t) } else { $rijeci.Add($t) }
  }
  for ($i = 0; $i -lt $rijeci.Count; $i += $Velicina) {
    $kraj = [Math]::Min($i + $Velicina, $rijeci.Count) - 1
    $skupine.Add(@($rijeci[$i..$kraj]))
  }
  $lin = New-Object System.Collections.Generic.List[string]
  for ($s = 0; $s -lt $skupine.Count; $s++) { $lin.Add(('{0:D3}' -f ($s + 1)) + "`t" + ($skupine[$s] -join '|')) }
  foreach ($p in $pojedinacno) { $lin.Add("P`t" + $p) }
  [IO.File]::WriteAllLines($planDat, $lin, $utf8)
  Write-Host ("Plan napravljen: {0} rijeci u {1} skupina, {2} pojedinacno" -f $rijeci.Count, $skupine.Count, $pojedinacno.Count)
}

$UPUTA_SKUPINA = "Read the following Croatian dictionary words aloud in clear, neutral standard Croatian, like a Croatian language teacher. " +
  "Every word is Croatian, even if it looks like an English word: pronounce it the Croatian way and never translate it. " +
  "Read every line as a separate word: say it exactly once, with calm falling intonation, then stay completely silent for one full second before the next line. " +
  "Do not add, skip, repeat or explain anything."
function UputaPoj([string]$t, [string]$napomena) {
  $u = "Read the following Croatian text aloud in clear, neutral standard Croatian, at a calm pace, like a Croatian language teacher. " +
       "It is Croatian, not English: pronounce it the Croatian way and never translate it. "
  if ($napomena) { $u += "Note for you only, do not read this note aloud: it is the $napomena. " }
  return $u + "Say only this: " + $t
}

# ---------------- 1. provjera starih snimki ----------------
$provjereno = @{}
foreach ($r in [IO.File]::ReadAllLines($provDat, $utf8)) { $p = $r -split ';'; if ($p.Count -ge 3) { $provjereno[$p[1] + '|' + (Kljuc $p[2])] = 1 } }
$stare = @()
if (Test-Path -LiteralPath $dirStari) { $stare = @(Get-ChildItem -LiteralPath $dirStari -Filter *.wav -File) }
$nStarih = 0
foreach ($f in $stare) {
  $k = Kljuc $f.BaseName
  if ($imaZvuk.ContainsKey($k) -or $rizicne.ContainsKey($k) -or $provjereno.ContainsKey('stari|' + $k)) { continue }
  if (-not $script:provjeraRadi) { break }
  if ($nStarih -eq 0) { Write-Host 'Provjera starih snimki...' }
  $h = Prepisi ([IO.File]::ReadAllBytes($f.FullName)) 1 $f.BaseName
  if ($null -eq $h) { break }
  $ok = Ok $f.BaseName $h[0]
  Biljezi 'stari' $f.BaseName $h[0] $ok
  $nStarih++
  if (-not $ok) { DodajPonovi $f.BaseName; Write-Host ("  LOSE: {0}  (cuje se: {1} [{2}])" -f $f.BaseName, $h[0].t, $h[0].jez) -ForegroundColor Red }
}
if ($nStarih) { Write-Host ("  provjereno starih: {0}" -f $nStarih) }

# ---------------- 2. skupine ----------------
$novih = 0; $gresaka = 0; $losih = 0
$broj = $skupine.Count; if ($Samo -gt 0) { $broj = [Math]::Min($Samo, $broj) }
for ($s = 0; $s -lt $broj; $s++) {
  $ime = 'skupina-{0:D3}' -f ($s + 1)
  $wav = Join-Path $dirSkup ($ime + '.wav')
  if (Test-Path -LiteralPath $wav) { continue }
  if ($script:trosak -ge $MaxUSD) { Write-Host "Kocnica: $MaxUSD USD. Stajem." -ForegroundColor Yellow; break }
  $rijeci = @($skupine[$s])
  $tekst = $UPUTA_SKUPINA + "`n`n" + (($rijeci | ForEach-Object { $_ + '.' }) -join "`n")
  Write-Host ("[{0}] {1} rijeci: {2} ..." -f $ime, $rijeci.Count, (($rijeci | Select-Object -First 3) -join ', '))
  $dio = Tts $tekst $ime
  if (-not $dio) { $gresaka++; Write-Host "  Nema zvuka za $ime" -ForegroundColor Red; continue }
  $bajt = WavBajtovi $dio
  [IO.File]::WriteAllLines((Join-Path $dirSkup ($ime + '.txt')), [string[]]$rijeci, $utf8)
  [IO.File]::WriteAllBytes($wav, $bajt)
  $novih++
  # provjera cijele skupine jednim zahtjevom
  $h = Prepisi $bajt $rijeci.Count $ime
  $losiOvdje = @()
  for ($i = 0; $i -lt $rijeci.Count; $i++) {
    $w = $rijeci[$i]
    if ($null -eq $h) { Biljezi $ime $w $null $null; continue }
    $hi = $null
    if ($h.Count -eq $rijeci.Count) { $hi = $h[$i] }
    else { foreach ($x in $h) { if (Ok $w $x) { $hi = $x; break } } }
    $ok = Ok $w $hi
    Biljezi $ime $w $hi $ok
    if (-not $ok) { $losiOvdje += $w; DodajPonovi $w }
  }
  $losih += $losiOvdje.Count
  $poruka = "  snimljeno (~{0:N4} USD)" -f $script:trosak
  if ($null -eq $h) { $poruka += ' - neprovjereno' }
  elseif ($losiOvdje.Count) { $poruka += ' - za ponoviti pojedinacno: ' + ($losiOvdje -join ', ') }
  else { $poruka += ' - provjera: sve ok' }
  Write-Host $poruka -ForegroundColor $(if ($losiOvdje.Count) { 'Yellow' } else { 'Green' })
  Start-Sleep -Seconds $RazmakSek
}

# ---------------- 3. pojedinacno ----------------
$red = New-Object System.Collections.Generic.List[string]
$uRedu = @{}
foreach ($t in @($pojedinacno) + @(Linije $ponDat)) {
  $k = Kljuc $t; if ($uRedu.ContainsKey($k)) { continue }; $uRedu[$k] = 1; $red.Add($t)
}
$maxPoj = $(if ($Samo -gt 0) { 3 } else { [int]::MaxValue })
$nPoj = 0; $rezervnih = 0
foreach ($t in $red) {
  if ($nPoj -ge $maxPoj) { break }
  $naziv = NazivDatoteke $t
  $datPoj = Join-Path $dirPoj ($naziv + '.wav')
  $datRez = Join-Path $dirRez ($naziv + '.mp3')
  if ((Test-Path -LiteralPath $datPoj) -or (Test-Path -LiteralPath $datRez)) { continue }
  if ($script:trosak -ge $MaxUSD) { Write-Host "Kocnica: $MaxUSD USD. Stajem." -ForegroundColor Yellow; break }
  $nPoj++
  $napomena = $rizicne[(Kljuc $t)]
  $uspjeh = $false
  for ($p = 1; $p -le 2 -and -not $uspjeh; $p++) {
    Write-Host ("[pojedinacno] {0}{1}" -f $t, $(if ($p -gt 1) { ' (2. pokusaj)' } else { '' }))
    $dio = Tts (UputaPoj $t $napomena) $t
    if (-not $dio) { continue }
    $bajt = WavBajtovi $dio
    $h = Prepisi $bajt 1 $t
    if ($null -eq $h) { [IO.File]::WriteAllBytes($datPoj, $bajt); Biljezi 'pojedinacno' $t $null $null; $novih++; $uspjeh = $true; break }
    $ok = Ok $t $h[0]
    Biljezi 'pojedinacno' $t $h[0] $ok
    if ($ok) { [IO.File]::WriteAllBytes($datPoj, $bajt); $novih++; $uspjeh = $true; Write-Host '  provjera: ok' -ForegroundColor Green }
    else {
      [IO.File]::WriteAllBytes((Join-Path $dirOdb ($naziv + "-$p.wav")), $bajt)
      Write-Host ("  LOSE - cuje se: {0} [{1}]" -f $h[0].t, $h[0].jez) -ForegroundColor Red
    }
    Start-Sleep -Seconds $RazmakSek
  }
  if (-not $uspjeh) {
    if (EdgeTts $t $datRez) { $rezervnih++; Biljezi 'rezerva' $t $null $true; Write-Host ("  snimljeno rezervnim glasom ({0})" -f $imeRez) -ForegroundColor Yellow }
    else { $gresaka++; Write-Host '  nije snimljeno - ostaje za rucnu provjeru' -ForegroundColor Red }
  }
}

Write-Host ''
Write-Host ("Gotovo. Novih snimki: {0} - za ponoviti iz skupina: {1} - rezervnim glasom: {2} - gresaka: {3} - trosak: ~{4:N3} USD" -f $novih, $losih, $rezervnih, $gresaka, $script:trosak) -ForegroundColor Green
Write-Host 'Javi Claudeu da izreze skupine i pripremi preslusavanje.'
Kraj 0
