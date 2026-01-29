$badge1 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_badge_blank_1767686959723.png"
$badge2 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_shield_blank_1767686993661.png"
$htmlPath = "c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Tool_ExamEngine.html"

if (-not (Test-Path $badge1) -or -not (Test-Path $badge2)) {
    Write-Host "Error: Generated image files not found."
    exit 1
}

Write-Host "Reading Images..."
$b64_1 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge1))
$b64_2 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge2))

$img1_data = "data:image/png;base64,$b64_1"
$img2_data = "data:image/png;base64,$b64_2"

Write-Host "Reading HTML..."
$content = Get-Content $htmlPath -Raw -Encoding UTF8

if ($content -match "INSERT_BADGE_CIRCLE_HERE") {
    $content = $content.Replace("INSERT_BADGE_CIRCLE_HERE", $img1_data)
}
else {
    # If the placeholder isn't there, we might need to inject it first or just update CSS dynamically.
    # But since we can't edit the file in sync, let's just make replacement tokens.
    # ACTUALLY, I should update the HTML file FIRST with my tool to add placeholders or specific CSS variables, then run this.
    # But I can also just replace the CSS rules directly here if I'm clever.
    
    # We will target the CSS directly.
    # Targeted string for Circle Badge
    $cssTarget1 = "background: radial-gradient(circle at 30% 30%, #fbf5b7, #bf953f);"
    $cssReplace1 = "background: url('$img1_data') no-repeat center center; background-size: contain; border: none; box-shadow: none;"
    
    # Targeted string for Shield Badge (Certificate) 
    # This is trickier as it uses ::before or specific HTML.
    # The certificate badge currently is: <div class="ui-badge unlocked" ... <span>🛡️</span>
    
    $content = $content.Replace($cssTarget1, $cssReplace1)
}

Set-Content -Path $htmlPath -Value $content -Encoding UTF8
Write-Host "Replaced Badge CSS with Base64 Images."
