import os
import re

# THEME BUTTONS HTML
THEME_BUTTONS = """
                <div style="background:var(--surface-2); padding:5px; border-radius:50px; border:1px solid var(--glass-border); display:flex; gap:5px; margin-right: 15px;">
                    <button onclick="setTheme('day')" class="btn btn-ghost" style="border-radius:50px; padding:6px 12px; font-size:12px; border:none; box-shadow:none;" title="Corporate Tech (Day)"><i class="fas fa-sun"></i></button>
                    <button onclick="setTheme('twilight')" class="btn btn-ghost" style="border-radius:50px; padding:6px 12px; font-size:12px; border:none; box-shadow:none;" title="Twilight Mode"><i class="fas fa-moon"></i></button>
                    <button onclick="setTheme('night')" class="btn btn-ghost" style="border-radius:50px; padding:6px 12px; font-size:12px; border:none; box-shadow:none;" title="Futuristic Dark (Night)"><i class="fas fa-space-shuttle"></i></button>
                </div>"""

# List of directories to process
dirs = [
    r"c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS",
    r"c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\02-TEMPLATES"
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already injected
    if "setTheme('day')" in content:
        return

    # Look for the "Tools Hub" button to inject buttons BEFORE it
    # We look for the container div or the button itself.
    # Pattern matches the "Tools Hub" or "Back to Main" button typical in this project.
    pattern = re.compile(r'(<button[^>]*onclick="window\.location\.href=\'Stats_Calculator_Main\.html\'[^>]*>.*?/button>)', re.DOTALL)
    
    if pattern.search(content):
        new_content = pattern.sub(THEME_BUTTONS + r'\1', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")
    else:
        # Try a more generic match for header buttons
        pattern2 = re.compile(r'(<div[^>]*class="[^"]*flex-between[^"]*"[^>]*>.*?<div>.*?)(</div>\s*</div>)', re.DOTALL)
        # This is harder and riskier. Let's stick to the specific button first.
        pass

for d in dirs:
    if not os.path.exists(d): continue
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith(".html"):
                process_file(os.path.join(root, file))
