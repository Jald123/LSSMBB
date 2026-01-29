$badge1 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_badge_blank_1767686959723.png"
$badge2 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_shield_blank_1767686993661.png"
$badge3 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_laurel_badge_blank_1767687375783.png"
$badge4 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_award_ribbon_blank_1767687404494.png"
$badge5 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_premium_ribbon_badge_blank_1767687595586.png"
$badge6 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_tag_badge_blank_1767687627163.png"
$badge7 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_trophy_laurel_blank_1767687709153.png"
$badge8 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/gold_medal_red_ribbon_blank_1767687740486.png"
$badge9 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/creative_problem_solver_badge_1767688638701.png"
$badge10 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/positive_energy_award_badge_1767688678014.png"
$badge11 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/consistency_champion_badge_1767688718302.png"
$badge12 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/early_achiever_badge_1767688758714.png"
$badge13 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/growth_mindset_award_badge_1767688796793.png"

# New 4 Badges
$badge14 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/first_step_badge_1767691266077.png"
$badge15 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/scholar_award_badge_1767691281605.png"
$badge16 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/speedster_badge_1767691298043.png"
$badge17 = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/mastery_badge_1767691315280.png"

# User Signature (Uploaded Image 1 corresponds to Signature)
$signature = "C:/Users/haldhaher/.gemini/antigravity/brain/928b30f5-3aec-46e5-bae5-008f40b2e047/uploaded_image_1_1767690995211.png"

# Base64 Encode
$b64_1 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge1))
$b64_2 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge2))
$b64_3 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge3))
$b64_4 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge4))
$b64_5 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge5))
$b64_6 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge6))
$b64_7 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge7))
$b64_8 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge8))
$b64_9 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge9))
$b64_10 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge10))
$b64_11 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge11))
$b64_12 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge12))
$b64_13 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge13))
$b64_14 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge14))
$b64_15 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge15))
$b64_16 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge16))
$b64_17 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($badge17))
$b64_sig = [Convert]::ToBase64String([IO.File]::ReadAllBytes($signature))

$img1_data = "data:image/png;base64,$b64_1"
$img2_data = "data:image/png;base64,$b64_2"
$img3_data = "data:image/png;base64,$b64_3"
$img4_data = "data:image/png;base64,$b64_4"
$img5_data = "data:image/png;base64,$b64_5"
$img6_data = "data:image/png;base64,$b64_6"
$img7_data = "data:image/png;base64,$b64_7"
$img8_data = "data:image/png;base64,$b64_8"
$img9_data = "data:image/png;base64,$b64_9"
$img10_data = "data:image/png;base64,$b64_10"
$img11_data = "data:image/png;base64,$b64_11"
$img12_data = "data:image/png;base64,$b64_12"
$img13_data = "data:image/png;base64,$b64_13"
$img14_data = "data:image/png;base64,$b64_14"
$img15_data = "data:image/png;base64,$b64_15"
$img16_data = "data:image/png;base64,$b64_16"
$img17_data = "data:image/png;base64,$b64_17"
$sig_data = "data:image/png;base64,$b64_sig"

$jsContent = @"
const BADGE_IMAGES = {
    circle: '$img1_data',
    shield: '$img2_data',
    laurel: '$img3_data',
    ribbon: '$img4_data',
    premium: '$img5_data',
    tag: '$img6_data',
    trophy: '$img7_data',
    medal: '$img8_data',
    creative: '$img9_data',
    positive: '$img10_data',
    consistency: '$img11_data',
    achiever: '$img12_data',
    growth: '$img13_data',
    first_step: '$img14_data',
    scholar: '$img15_data',
    speedster: '$img16_data',
    mastery: '$img17_data',
    signature: '$sig_data'
};
"@

Set-Content -Path "c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\badges_data.js" -Value $jsContent -Encoding UTF8
Write-Host "Created badges_data.js with ALL 17 Base64 images and SIGNATURE."
