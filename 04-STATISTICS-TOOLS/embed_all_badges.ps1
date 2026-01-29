$badge1 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_badge_blank_1767686959723.png"
$badge2 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_shield_blank_1767686993661.png"
$badge3 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_laurel_badge_blank_1767687375783.png"
$badge4 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_award_ribbon_blank_1767687404494.png"

$htmlPath = "c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Tool_ExamEngine.html"

# Base64 Encode
$b64_1 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge1))
$b64_2 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge2))
$b64_3 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge3))
$b64_4 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge4))

$img1_data = "data:image/png;base64,$b64_1"
$img2_data = "data:image/png;base64,$b64_2"
$img3_data = "data:image/png;base64,$b64_3"
$img4_data = "data:image/png;base64,$b64_4"

$content = Get-Content $htmlPath -Raw -Encoding UTF8

# Targeted CSS Replacements
# We will use random assignment in the JS logic for the tool to make it interesting, 
# But for now, let's just make the .ui-badge use image 1 (Circle), and the certificate shield use image 2 (Shield).
# We can add CSS classes for the others.

# 1. Update the Main UI Badge CSS (Circle)
$cssTarget1 = "/* IMAGE_PLACEHOLDER_CIRCLE */"
$cssReplace1 = "background-image: url('$img1_data'); background-size: contain; background-repeat: no-repeat; background-position: center; border: none; box-shadow: none; background-color: transparent;"
$content = $content.Replace($cssTarget1, $cssReplace1)

# 2. Update the Certificate Shield CSS
$cssTarget2 = "/* IMAGE_PLACEHOLDER_SHIELD */"
# This one was an inner div or img. The logic in the HTML was:
# <div class="ui-badge unlocked" id="cert-seal-badge" ...>
# We can inject the background style into the ID via CSS or just inline style replacement if we had a token.
# Retrying CSS injection strategy:
# We will add a new <style> block at the end of head or body if we can't find a token, 
# BUT the previous step failed to insert the token because i cancelled it. 
# So I need to rely on the MultiReplace that is coming NEXT to insert the tokens, 
# Then run this script. 

# WAIT. I should write the images to a JS file `badges_data.js` and load it! 
# That is much cleaner than modifying HTML repeatedly.

$jsContent = @"
const BADGE_IMAGES = {
    circle: '$img1_data',
    shield: '$img2_data',
    laurel: '$img3_data',
    ribbon: '$img4_data'
};
"@

Set-Content -Path "c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\badges_data.js" -Value $jsContent -Encoding UTF8
Write-Host "Created badges_data.js with Base64 images."
