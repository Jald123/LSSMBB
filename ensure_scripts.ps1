$files = Get-ChildItem -Recurse -Filter *.html -Path "02-TEMPLATES", "04-STATISTICS-TOOLS", "."
foreach ($file in $files) {
    # Skip directories we don't own
    if ($file.FullName -match "node_modules") { continue }
    
    $content = Get-Content -Raw $file.FullName
    
    # 1. Ensure AssistantTools.js is included
    if ($content -notmatch 'AssistantTools\.js') {
        if ($content -match '</body>') {
            $content = $content -replace '</body>', "`n<script src=""AssistantTools.js""></script></body>"
            Write-Host "Injected Script: $($file.FullName)"
        }
    }
    
    # 2. Add extra CSS vars for Day Mode if missing (for Orbitron/inter overrides)
    # This helps pages that don't load twilight_theme.css
    
    $content | Set-Content $file.FullName -NoNewline
}
