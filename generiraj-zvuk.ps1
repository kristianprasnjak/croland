# Generira MP3 izgovor u folder zvuk\ za svaki redak iz:
#   rijeci.txt   - pojedinacne rijeci
#   recenice.txt - cijele recenice (ako datoteka postoji)
# Glas: hr-HR-SreckoNeural (edge-tts). Vec generirano se preskace,
# pa se skripta moze pokretati iznova nakon dodavanja novih redaka.
#
# Naziv datoteke = tekst bez zabranjenih znakova (\ / : * ? " < > |)
# i bez zavrsne interpunkcije, npr. "Kako ste?" -> "Kako ste.mp3"
#
# Pokretanje: desni klik na datoteku -> Run with PowerShell
# ili u cmd:  powershell -ExecutionPolicy Bypass -File generiraj-zvuk.ps1

$ErrorActionPreference = 'Continue'
$mapa  = Split-Path -Parent $MyInvocation.MyCommand.Path
$izlaz = Join-Path $mapa 'zvuk'
$glas  = 'hr-HR-SreckoNeural'

if (!(Test-Path $izlaz)) { New-Item -ItemType Directory -Path $izlaz | Out-Null }

function NazivDatoteke([string]$t) {
    $n = $t -replace '[\\/:*?"<>|]', ''    # zabranjeni znakovi u Windows nazivima
    $n = $n -replace '\s+', ' '
    $n = $n.Trim() -replace '[.!?\s]+$', ''  # zavrsna interpunkcija / razmaci
    return $n
}

# --- pronalazi Python koji ima edge_tts ---
# 'py' bez argumenta bira najnoviju instaliranu verziju, a edge_tts ne mora
# biti u njoj. Zato se redom probaju kandidati, pa se u zadnjem koraku
# modul pokusa instalirati u onaj koji 'py' pokrece.

function ImaEdgeTts([string[]]$cmd) {
    $a = @($cmd | Select-Object -Skip 1)
    try   { & $cmd[0] @($a + @('-m','edge_tts','--help')) *> $null }
    catch { return $false }
    return ($LASTEXITCODE -eq 0)
}

$kandidati = @(
    ,@('py')
    ,@('py','-3.13')
    ,@('py','-3.12')
    ,@('py','-3.11')
    ,@('py','-3.10')
    ,@('python')
)

$tts = $null
foreach ($k in $kandidati) {
    if (ImaEdgeTts $k) { $tts = $k; break }
}

if ($null -eq $tts) {
    Write-Host 'edge_tts nije pronaden ni u jednoj Python instalaciji - instaliram ga...' -ForegroundColor Yellow
    & py -m pip install --upgrade --quiet edge-tts
    if (ImaEdgeTts @('py')) {
        $tts = @('py')
        Write-Host 'edge-tts instaliran.' -ForegroundColor Green
    } else {
        Write-Host ''
        Write-Host 'Ne mogu instalirati edge-tts. Pokusaj rucno u cmd-u:' -ForegroundColor Red
        Write-Host '    py -m pip install --upgrade edge-tts'
        Write-Host '(py -0 pokazuje koje Python verzije imas)'
        Read-Host 'Enter za izlaz'
        exit 1
    }
}

$ttsExe  = $tts[0]
$ttsArgs = @($tts | Select-Object -Skip 1)
Write-Host ("edge-tts: {0} {1}" -f $ttsExe, ($ttsArgs -join ' '))

$rijeci = @()
foreach ($f in 'rijeci.txt', 'recenice.txt') {
    $p = Join-Path $mapa $f
    if (Test-Path $p) {
        $rijeci += Get-Content $p -Encoding UTF8 |
                   ForEach-Object { $_.Trim() } |
                   Where-Object { $_ -ne '' }
        Write-Host ("Ucitano: {0}" -f $f)
    }
}
if ($rijeci.Count -eq 0) { Write-Host 'Ne mogu naci rijeci.txt ni recenice.txt!' -ForegroundColor Red; Read-Host 'Enter za izlaz'; exit 1 }

$ukupno = $rijeci.Count
$novo = 0; $preskoceno = 0; $greske = @(); $prvaGreska = ''
$i = 0

Write-Host ("Rijeci u listi: {0}" -f $ukupno)
Write-Host ''

foreach ($r in $rijeci) {
    $i++
    $naziv = NazivDatoteke $r
    if ($naziv -eq '') { continue }
    $dat = Join-Path $izlaz ($naziv + '.mp3')

    if ((Test-Path $dat) -and ((Get-Item $dat).Length -gt 0)) { $preskoceno++; continue }

    Write-Host ("[{0}/{1}] {2}" -f $i, $ukupno, $r)
    $izlazTTS = & $ttsExe @($ttsArgs + @('-m','edge_tts','--voice',$glas,'--text',$r,'--write-media',$dat)) 2>&1

    if (!(Test-Path $dat) -or ((Get-Item $dat).Length -eq 0)) {
        if (Test-Path $dat) { Remove-Item $dat }
        $greske += $r
        if ($prvaGreska -eq '') {
            $prvaGreska = ($izlazTTS | Out-String)
            Write-Host '--- edge-tts je javio gresku ---' -ForegroundColor Red
            Write-Host $prvaGreska
            Add-Content -Path (Join-Path $mapa 'zvuk-greska-log.txt') -Value $prvaGreska -Encoding UTF8
        }
    } else {
        $novo++
    }
}

Write-Host ''
Write-Host ("Gotovo. Novo: {0} | Preskoceno (vec postoji): {1} | Greske: {2}" -f $novo, $preskoceno, $greske.Count) -ForegroundColor Green
if ($greske.Count -gt 0) {
    Write-Host 'Ove rijeci nisu uspjele - pokreni skriptu ponovno:' -ForegroundColor Yellow
    $greske | ForEach-Object { Write-Host ('  ' + $_) }
}
Read-Host 'Enter za izlaz'
