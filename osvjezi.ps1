$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$igreDir = Join-Path $root 'igre'

# ---------------------------------------------------------------
# MD format:
#   Zaglavlje datoteke (prije prvog '## '):
#     # Naslov cjeline / igre
#     cjelina: Lesson 1        (opcionalno; tip + razina)
#     broj: N                  (za samostalne igre bez cjeline)
#   Svaki '## Naslov' odjeljak = jedna stranica (igra):
#     format: tekst|kartice|parovi|memorija|brzina|izbor|upis|slaganje|razvrstavanje|dijalog|provjera
#     kljuc: vrijednost        (opis, trajanje, stupci, prag, tekst...)
#     - a | b | c              (stavka; znacenje polja ovisi o formatu)
#   Datoteka bez '##' odjeljaka = jedna igra (stari stil).
# ---------------------------------------------------------------

$tipRang = @{ lesson = 1; vocabulary = 2; grammar = 3; practice = 4; test = 5 }

# osnovni bodovi po formatu (moze se pregaziti s "bodovi: N" u odjeljku md-a)
$bazaBodova = @{
    tekst = 2; kartice = 3; dijalog = 4; parovi = 5; memorija = 5
    brzina = 6; izbor = 6; slaganje = 6; razvrstavanje = 6; poredak = 6
    upis = 7; provjera = 10
}

function Parse-Blok($linije) {
    $r = @{ format = $null; meta = [ordered]@{}; stavke = @(); naslov = $null; broj = $null; cjelina = $null }
    foreach ($line in $linije) {
        $t = ([string]$line).Trim()
        if ($t -match '^[-\s|:>]*$') { continue }               # prazno / separatori / citati
        if ($t -match '^#\s+(.+)$') { $r.naslov = $Matches[1].Trim(); continue }
        if ($t -match '^[-*]\s+(.+)$') {
            $parts = @($Matches[1] -split '\|' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
            if ($parts.Count -gt 0) { $r.stavke += ,(@($parts)) }
            continue
        }
        if ($t -match '^format:\s*(\S+)') { $r.format = $Matches[1].Trim(); continue }
        if ($t -match '^broj:\s*(\d+)') { $r.broj = [int]$Matches[1]; continue }
        if ($t -match '^cjelina:\s*(.+)$') { $r.cjelina = $Matches[1].Trim(); continue }
        if ($t -match '^(\w+):\s*(.+)$') { $r.meta[$Matches[1].ToLower()] = $Matches[2].Trim(); continue }
    }
    return $r
}

$igre = @()
Get-ChildItem -Path $igreDir -Filter *.md | ForEach-Object {
    $text = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    $lines = $text -split "\r?\n"

    # podijeli na zaglavlje + '## ' odjeljke
    $blokovi = New-Object System.Collections.ArrayList
    $cur = @{ naslov = $null; linije = New-Object System.Collections.ArrayList }
    [void]$blokovi.Add($cur)
    foreach ($line in $lines) {
        if ($line -match '^##\s+(.+)$') {
            $cur = @{ naslov = $Matches[1].Trim(); linije = New-Object System.Collections.ArrayList }
            [void]$blokovi.Add($cur)
        } else {
            [void]$cur.linije.Add($line)
        }
    }

    $header = Parse-Blok $blokovi[0].linije
    $cjelina = $header.cjelina
    $cjelinaNaslov = $header.naslov
    $brojFile = if ($null -ne $header.broj) { $header.broj } else { 9999 }

    $sekcije = @($blokovi | Select-Object -Skip 1)
    if ($sekcije.Count -eq 0) {
        # jedna igra po datoteci (stari stil)
        if ($header.format -and $header.stavke.Count -gt 0) {
            $n = if ($header.naslov) { $header.naslov } else { $_.BaseName }
            $igre += ,([ordered]@{
                cjelina = $cjelina; cjelinanaslov = $null; stranica = 1; broj = $brojFile
                format = $header.format; naslov = $n; meta = $header.meta; stavke = $header.stavke
            })
        }
    } else {
        $str = 0
        foreach ($s in $sekcije) {
            $g = Parse-Blok $s.linije
            if ($g.format -and $g.stavke.Count -gt 0) {
                $str++
                $cj = if ($g.cjelina) { $g.cjelina } else { $cjelina }
                $igre += ,([ordered]@{
                    cjelina = $cj; cjelinanaslov = $cjelinaNaslov; stranica = $str; broj = $brojFile
                    format = $g.format; naslov = $s.naslov; meta = $g.meta; stavke = $g.stavke
                })
            }
        }
    }
}

# sortiranje: cjeline (razina -> tip -> stranica), zatim samostalne igre po broju
foreach ($g in $igre) {
    $kljuc = 100000000 + $g.broj * 100 + $g.stranica
    if ($g.cjelina -and $g.cjelina -match '^(.+?)\s*(\d+)$') {
        $tip = $Matches[1].Trim().ToLower()
        $razina = [int]$Matches[2]
        if ($tipRang.ContainsKey($tip)) {
            # tecaj: Lesson/Vocabulary/Grammar/Practice/Test po razini
            $kljuc = $razina * 100000 + $tipRang[$tip] * 1000 + $g.stranica
        } elseif ($tip -eq 'daily challenge') {
            # daily challengei dolaze nakon tecaja
            $kljuc = 50000000 + $razina * 1000 + $g.stranica
        } else {
            $kljuc = 90000000 + $razina * 1000 + $g.stranica
        }
    }
    $g['sortkljuc'] = $kljuc

    # bodovi: eksplicitni (bodovi: N) ili baza formata x mnozitelj razine
    # Lesson/Vocabulary/Grammar/Practice: m = 1 + 0.12*(N-1); Test: t = 1 + 0.25*(N-1); daily/weekly: 1 (interni ponderi)
    $b = 0
    if ($g.meta.Contains('bodovi')) {
        $b = [int]$g.meta['bodovi']
    } else {
        $baza = if ($bazaBodova.ContainsKey($g.format)) { $bazaBodova[$g.format] } else { 5 }
        $mn = 1.0
        if ($g.cjelina -and $g.cjelina -match '^(.+?)\s*(\d+)$') {
            $tip2 = $Matches[1].Trim().ToLower()
            $raz = [int]$Matches[2]
            if ($tip2 -eq 'test') { $mn = 1 + 0.25 * ($raz - 1) }
            elseif ($tipRang.ContainsKey($tip2)) { $mn = 1 + 0.12 * ($raz - 1) }
        }
        $b = [Math]::Max(1, [int][Math]::Round($baza * $mn))
    }
    $g['bodovi'] = $b
}
$igre = @($igre | Sort-Object { $_.sortkljuc }, { $_.naslov })

# skeniranje slika: naziv datoteke = hrvatska rijec/fraza/recenica
# (interpunkcija na kraju i velika/mala slova ignoriraju se pri sparivanju)
$slikeDir = Join-Path $root 'slike'
$slike = [ordered]@{}
if (Test-Path $slikeDir) {
    Get-ChildItem -Path $slikeDir -File | ForEach-Object {
        if ($_.Extension -match '^\.(jpe?g|png|gif|webp|bmp|avif|svg)$') {
            $k = $_.BaseName.ToLower().Trim() -replace '[\s\.\!\?]+$', ''
            if ($k -and -not $slike.Contains($k)) { $slike[$k] = 'slike/' + $_.Name }
        }
    }
}

# skeniranje zvukova: naziv datoteke = hrvatska rijec (mala slova)
$zvukDir = Join-Path $root 'zvuk'
$zvukovi = [ordered]@{}
if (Test-Path $zvukDir) {
    Get-ChildItem -Path $zvukDir -File | ForEach-Object {
        if ($_.Extension -match '^\.(mp3|wav|ogg|m4a|webm)$') {
            # NFC normalizacija (dijakritici), mala slova, sazeti razmaci, bez zavrsne interpunkcije
            $k = $_.BaseName.Normalize([Text.NormalizationForm]::FormC).ToLower().Trim()
            $k = $k -replace '\s+', ' '
            $k = $k -replace '[\s\.\!\?…]+$', ''
            if ($k -and -not $zvukovi.Contains($k)) { $zvukovi[$k] = 'zvuk/' + $_.Name }
        }
    }
}

$obj = [ordered]@{
    generirano = (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
    slike      = $slike
    zvukovi    = $zvukovi
    igre       = $igre
}
$json = $obj | ConvertTo-Json -Depth 8
$js = "// Automatski generirano putem osvjezi.bat - ne uredjivati rucno`r`nwindow.PODACI = $json;`r`n"
[System.IO.File]::WriteAllText((Join-Path $root 'data.js'), $js, (New-Object System.Text.UTF8Encoding $true))
Write-Host ("data.js osvjezen - broj igara: " + $igre.Count + ", broj slika: " + $slike.Count + ", broj zvukova: " + $zvukovi.Count)

# ---- rjecnik.js: tri .jsonl datoteke -> window.RJECNIK ----
function Citaj-Jsonl($ime) {
    $p = Join-Path $root $ime
    if (-not (Test-Path $p)) { return @() }
    return @(Get-Content -Path $p -Encoding UTF8 | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
}
$leme = Citaj-Jsonl 'rjecnik.jsonl'
$prijevodi = [ordered]@{}
foreach ($r in (Citaj-Jsonl 'prijevodi.jsonl')) { $prijevodi[$r.lema] = $r.en }
$enHr = [ordered]@{}
foreach ($r in (Citaj-Jsonl 'rjecnik-en-hr.jsonl')) { $enHr[$r.en] = $r.hr }

$rjObj = [ordered]@{ leme = $leme; prijevodi = $prijevodi; enHr = $enHr }
$rjJson = $rjObj | ConvertTo-Json -Depth 8 -Compress
$rjJs = "// Automatski generirano putem osvjezi.bat - ne uredjivati rucno`r`nwindow.RJECNIK = $rjJson;`r`n"
[System.IO.File]::WriteAllText((Join-Path $root 'rjecnik.js'), $rjJs, (New-Object System.Text.UTF8Encoding $true))
Write-Host ("rjecnik.js osvjezen - broj lema: " + $leme.Count)
