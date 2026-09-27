# Snima izgovor s Gemini TTS u mapu zvuk-gemini\<glas>\ (WAV).
# Postojeca mapa zvuk\ se NE dira. Vec snimljeno se preskace, pa se skripta
# moze pokretati iznova (nastavlja gdje je stala).
#
# Kljuc se cita iz .env (redak GEMINI_API_KEY=...) i nigdje se ne ispisuje.
# Kocnica: skripta staje kad procijenjeni trosak dosegne -MaxUSD.
#
# Primjer:  powershell -ExecutionPolicy Bypass -File snimi-zvuk-gemini.ps1 -Popis zvuk-gemini-proba.txt -Glasovi Kore,Charon -MaxUSD 0.5
# Napravljeno 27.09.2026.

param(
  [string[]]$Popis   = @('zvuk-gemini-proba.txt'),
  [string[]]$Glasovi = @('Kore'),
  [double]$MaxUSD    = 0.5,
  [string]$Model     = 'gemini-2.5-flash-preview-tts',
  [string]$Stil      = 'Read in clear, neutral standard Croatian, at a calm pace, like a language teacher reading for a learner:'
)

$ErrorActionPreference = 'Stop'
# .bat preko -File predaje 'Kore,Charon' kao jedan tekst - rastavi ga na glasove
$Glasovi = @($Glasovi | ForEach-Object { $_ -split ',' } | ForEach-Object { $_.Trim() } | Where-Object { $_ })
$Popis = @($Popis | ForEach-Object { $_ -split ',' } | ForEach-Object { $_.Trim() } | Where-Object { $_ })
$mapa = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $mapa

# --- kljuc iz .env ---
$kljuc = $null
foreach ($r in [IO.File]::ReadAllLines((Join-Path $mapa '.env'))) {
  if ($r -match '^\s*GEMINI_API_KEY\s*=\s*(.+?)\s*$') { $kljuc = $Matches[1].Trim('"').Trim("'") }
}
if (-not $kljuc) { Write-Host 'U .env nema retka GEMINI_API_KEY=...' -ForegroundColor Red; exit 1 }

# isti nazivi kao u generiraj-zvuk.ps1 (+ NFC normalizacija)
function NazivDatoteke([string]$t) {
  $n = $t.Normalize([Text.NormalizationForm]::FormC)
  $n = $n -replace '[\\/:*?"<>|]', ''
  $n = $n -replace '\s+', ' '
  $n = $n.Trim() -replace '[.!?\s]+$', ''
  return $n
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

# --- popis tekstova ---
$tekstovi = New-Object System.Collections.Generic.List[string]
$vidjeno = @{}
foreach ($p in $Popis) {
  foreach ($r in [IO.File]::ReadAllLines((Join-Path $mapa $p), [Text.Encoding]::UTF8)) {
    $t = $r.Trim()
    if (-not $t -or $t.StartsWith('#')) { continue }
    $k = NazivDatoteke $t
    if (-not $k -or $vidjeno.ContainsKey($k.ToLower())) { continue }
    $vidjeno[$k.ToLower()] = 1; $tekstovi.Add($t)
  }
}

$url = "https://generativelanguage.googleapis.com/v1beta/models/$($Model):generateContent"
$zaglavlja = @{ 'x-goog-api-key' = $kljuc }
$log = Join-Path $mapa 'zvuk-gemini-log.csv'
if (-not (Test-Path $log)) { 'vrijeme;glas;tekst;ulaz_tokena;izlaz_tokena;usd;status' | Out-File $log -Encoding UTF8 }

$script:uzastopnihGresaka = 0
$trosak = 0.0; $novih = 0; $preskoceno = 0; $gresaka = 0
Write-Host ("Tekstova: {0} - glasova: {1} - kocnica: {2} USD" -f $tekstovi.Count, $Glasovi.Count, $MaxUSD)

foreach ($glas in $Glasovi) {
  $izlaz = Join-Path $mapa ("zvuk-gemini\" + $glas)
  New-Item -ItemType Directory -Force -Path $izlaz | Out-Null
  foreach ($t in $tekstovi) {
    $dat = Join-Path $izlaz ((NazivDatoteke $t) + '.wav')
    if (Test-Path -LiteralPath $dat) { $preskoceno++; continue }
    if ($trosak -ge $MaxUSD) { Write-Host "Kocnica: dosegnuto $MaxUSD USD. Stajem." -ForegroundColor Yellow; break }

    $tijelo = @{
      contents = @(@{ parts = @(@{ text = "$Stil $t" }) })
      generationConfig = @{
        responseModalities = @('AUDIO')
        speechConfig = @{ voiceConfig = @{ prebuiltVoiceConfig = @{ voiceName = $glas } } }
      }
    } | ConvertTo-Json -Depth 10
    $bajtovi = [Text.Encoding]::UTF8.GetBytes($tijelo)

    $dio = $null; $odg = $null
    # Model ponekad vrati tekst umjesto zvuka (osobito za kratke rijeci) - tada ponovi do 3 puta.
    for ($ponovi = 1; $ponovi -le 3 -and -not $dio; $ponovi++) {
      $odg = $null
      for ($pokusaj = 1; $pokusaj -le 5; $pokusaj++) {
        try {
          $odg = Invoke-RestMethod -Method Post -Uri $url -Headers $zaglavlja -ContentType 'application/json; charset=utf-8' -Body $bajtovi -TimeoutSec 120
          break
        } catch {
          $kod = $null; try { $kod = [int]$_.Exception.Response.StatusCode } catch {}
          if ($kod -eq 429 -or $kod -ge 500) { Start-Sleep -Seconds (15 * $pokusaj); continue }
          Write-Host ("Greska ({0}) za: {1}" -f $kod, $t) -ForegroundColor Red
          $poruka = $_.ErrorDetails.Message
          if ($poruka) { Write-Host $poruka -ForegroundColor DarkYellow }
          $script:uzastopnihGresaka++
          if ($script:uzastopnihGresaka -ge 3) { Write-Host 'Tri greske zaredom - stajem. Posalji sliku ovog prozora.' -ForegroundColor Red; exit 1 }
          break
        }
      }
      if (-not $odg) { break }

      $dio = $odg.candidates[0].content.parts | Where-Object { $_.inlineData } | Select-Object -First 1
      if (-not $dio -and $ponovi -lt 3) { Write-Host "  (nema zvuka za: $t - pokusavam ponovo)" -ForegroundColor DarkGray }
    }
    if (-not $dio) {
      $gresaka++
      if ($odg) { Write-Host "Nema zvuka u odgovoru za: $t" -ForegroundColor Red }
      ("{0};{1};{2};;;;greska" -f (Get-Date -Format s), $glas, $t) | Out-File $log -Append -Encoding UTF8
      continue
    }
    $rate = 24000
    if ($dio.inlineData.mimeType -match 'rate=(\d+)') { $rate = [int]$Matches[1] }
    $pcm = [Convert]::FromBase64String($dio.inlineData.data)
    [IO.File]::WriteAllBytes($dat, (WavIzPcm $pcm $rate))
    $script:uzastopnihGresaka = 0

    $u = [double]$odg.usageMetadata.promptTokenCount; $i = [double]$odg.usageMetadata.candidatesTokenCount
    $usd = $u * 0.50 / 1e6 + $i * 10.0 / 1e6
    $trosak += $usd; $novih++
    ("{0};{1};{2};{3};{4};{5:N6};ok" -f (Get-Date -Format s), $glas, $t, $u, $i, $usd) | Out-File $log -Append -Encoding UTF8
    Write-Host ("[{0}] {1}  ({2:N4} USD ukupno)" -f $glas, $t, $trosak)
  }
}
Write-Host ""
Write-Host ("Gotovo. Novih: {0} - preskoceno (vec postoji): {1} - gresaka: {2} - trosak ove ture: ~{3:N3} USD" -f $novih, $preskoceno, $gresaka, $trosak) -ForegroundColor Green
