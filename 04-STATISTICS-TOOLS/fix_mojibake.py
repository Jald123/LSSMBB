
import os

# Define the file path
file_path = r"c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Tool_LeanWorkshop.html"

# Read the file content
# We'll read it as binary first to see exactly what bytes we have, 
# but for replacement, reading as 'utf-8' and replacing the garbled characters 
# (which are valid utf-8 sequences interpreted wrong) is the safest way if we know the mapping.
# However, the user sees `ðŸ...` which means the file IS valid UTF-8, but the characters inside it 
# ARE literally those weird characters now.

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the Mojibake replacements based on the user's image and common UTF-8 Mojibake
# These are the strings currently in the file that look like garbage
mojibake_map = {
    'ðŸ“‹': '📋', # SIPOC Clipboard
    'ðŸŽ¯': '🎯', # QFD Target / MoSCoW
    'ðŸ”—': '🔗', # Affinity Link
    'ðŸŸ': '🐟', # Fishbone Fish
    'ðŸ“Š': '📊', # SWOT Chart / Process / C&E
    'ðŸ§ ': '🧠', # Brainstorm Brain
    'ðŸ§¹': '🧹', # 5S Broom
    'ðŸ“„': '📄', # A3 Page
    'âš ï¸': '⚠️', # Risk Warning (often becomes âš ï¸)
    'ðŸŒ³': '🌳', # CTQ Tree
    'ðŸ”Š': '🔊', # VOC Speaker
    'ðŸšš': '🚚', # VSM Truck
    'ðŸŠ': '🏊', # Swimlane
    'ðŸ“': '📏', # Gage Ruler
    'ðŸ': '🍝', # Spaghetti
    'ðŸ¤': '🤏', # Hand (maybe)
    '🏭': '🏭', # Factory (already correct?)
    '🛎️': '🛎️', # Bell (already correct?)
    
    # Specific ones from the image
    'ðŸŽ¯': '🎯', 
    'ðŸŽ': '🎯',
    'ðŸŒ': '🌳',
    'ðŸš': '🚚',
}

# Add more specific variations that might occur due to partial corruption
corrections = [
    # Sidebar specific corrections
    ('ðŸ“‹ SIPOC', '📋 SIPOC'),
    ('ðŸŽ¯ QFD', '🎯 QFD'),
    ('ðŸ”— Affinity', '🔗 Affinity'),
    ('ðŸ“Š Process', '📊 Process'),
    ('ðŸŒ³ CTQ', '🌳 CTQ'),
    ('ðŸ”Š VOC', '🔊 VOC'),
    ('ðŸšš Value', '🚚 Value'),
    ('ðŸ Spaghetti', '🍝 Spaghetti'),
    ('ðŸ“ Gage', '📏 Gage'),
    ('ðŸŸ Fishbone', '🐟 Fishbone'),
    ('ðŸ“Š SWOT', '📊 SWOT'),
    ('ðŸŠ Swimlane', '🏊 Swimlane'),
    ('ðŸŽ¯ MoSCoW', '🎯 MoSCoW'),
    ('ðŸ§¹ 5S', '🧹 5S'),
    ('ðŸ“„ A3', '📄 A3'),
    ('âš ï¸ Risk', '⚠️ Risk'),
    
    # Textarea / Content corrections
    ('"ðŸ“‹', '"📋'),
    ('"ðŸŽ¯', '"🎯'),
    ('"ðŸ”—', '"🔗'),
    ('"ðŸŸ', '"🐟'),
    ('"ðŸ“Š', '"📊'),
    ('"ðŸ§ ', '"🧠'),
    ('"ðŸŽ¯', '"🎯'),
    ('"ðŸ§¹', '"🧹'),
    ('"ðŸ“„', '"📄'),
    ('"âš ï¸', '"⚠️'),
    ('"ðŸŒ³', '"🌳'),
    ('"ðŸ”Š', '"🔊'),
    ('"ðŸšš', '"🚚'),
    ('"ðŸŠ', '"🏊'),
    
    # 5S Specifics
    ('ðŸ“‹ (Seiri)', '整理 (Seiri)'), # If it got double corrupted
]

# Apply corrections
count = 0
for bad, good in corrections:
    if bad in content:
        content = content.replace(bad, good)
        count += 1
        print(f"Fixed: {bad} -> {good}")

# Generic loop for any remaining single instances
for bad, good in mojibake_map.items():
    if bad in content:
        content = content.replace(bad, good)
        count += 1
        print(f"Generic Fix: {bad} -> {good}")

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Replacement complete. Made {count} types of replacements.")
