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
$novo = 0; $preskoceno = 0; $greske = @()
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
    py -m edge_tts --voice $glas --text $r --write-media $dat 2>$null

    if (!(Test-Path $dat) -or ((Get-Item $dat).Length -eq 0)) {
        if (Test-Path $dat) { Remove-Item $dat }
        $greske += $r
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
