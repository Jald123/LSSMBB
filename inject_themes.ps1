$buttons = @"
                <div style="background:var(--surface-2); padding:5px; border-radius:50px; border:1px solid var(--glass-border); display:flex; gap:5px; margin-right: 15px; display: inline-flex;">
                    <button onclick="setTheme('universal')" class="btn btn-ghost" style="border-radius:50px; padding:6px 12px; font-size:12px; border:none; box-shadow:none;" title="Universal Laws (Light)"><i class="fas fa-sun"></i></button>
                    <button onclick="setTheme('twilight')" class="btn btn-ghost" style="border-radius:50px; padding:6px 12px; font-size:12px; border:none; box-shadow:none;" title="Twilight Mode"><i class="fas fa-moon"></i></button>
                    <button onclick="setTheme('night')" class="btn btn-ghost" style="border-radius:50px; padding:6px 12px; font-size:12px; border:none; box-shadow:none;" title="Futuristic Dark (Night)"><i class="fas fa-rocket"></i></button>
                </div>
"@

$dirs = @("04-STATISTICS-TOOLS", "02-TEMPLATES")
foreach ($dir in $dirs) {
    if (Test-Path $dir) {
        $files = Get-ChildItem -Recurse -Filter *.html -Path $dir
        foreach ($file in $files) {
            $content = Get-Content -Raw $file.FullName
            if ($content -match "setTheme\('day'\)") { continue }
            
            # Escape the buttons string for regex replacement or just use fixed string replacement if possible
            # Powershell -replace takes a regex as first arg and $1 $2 etc as second.
            if ($content -match '(?s)<button[^>]*onclick="window\.location\.href=''Stats_Calculator_Main\.html''[^>]*>.*?/button>') {
                # We use a placeholder to avoid regex escaping hell
                $newContent = $content -replace '(?s)(<button[^>]*onclick="window\.location\.href=''Stats_Calculator_Main\.html''[^>]*>.*?/button>)', ($buttons + "`$1")
                $newContent | Set-Content $file.FullName -NoNewline
                Write-Host "Updated: $($file.FullName)"
            }
        }
    }
}
