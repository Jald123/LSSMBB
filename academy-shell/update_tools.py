import os
import re

tools_dir = r'c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\academy-shell\public\tools'

edu_classes = [
    'guide-detail-card', 'example-box', 'critique-section', 
    'challenge-container', 'tip-box', 'did-you-know', 
    'theory-card', 'video-placeholder', 'learning-objectives',
    'evidence-section', 'upload-evidence', 'reset-data'
]

count = 0
for filename in os.listdir(tools_dir):
    if filename.endswith('.html') and filename not in ['index.html', 'NexusOS_Landing.html']:
        path = os.path.join(tools_dir, filename)
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified = False
            
            # Add script tag if missing
            if 'do-mode.js' not in content:
                content = content.replace('</body>', '<script src="../shared/do-mode.js"></script></body>')
                modified = True
            
            # Add edu-only class to common containers
            for cls in edu_classes:
                # Optimized pattern to avoid re-matching
                pattern = f'class="([^"]*{cls}[^"]*)"'
                
                # Check if it already has edu-only
                matches = re.findall(pattern, content)
                for m in matches:
                    if 'edu-only' not in m:
                        old_class = f'class="{m}"'
                        new_class = f'class="{m} edu-only"'
                        content = content.replace(old_class, new_class)
                        modified = True

            # Add data-roles (best effort)
            if 'data-role="tool-form"' not in content:
                if '<div class="main-content">' in content:
                    content = content.replace('<div class="main-content">', '<div class="main-content" data-role="tool-form">')
                    modified = True
            
            if 'data-role="primary-submit"' not in content:
                if 'id="calculateBtn"' in content:
                    content = content.replace('id="calculateBtn"', 'id="calculateBtn" data-role="primary-submit"')
                    modified = True
                elif 'class="submit-action"' in content:
                    content = content.replace('class="submit-action"', 'class="submit-action" data-role="primary-submit"')
                    modified = True

            if modified:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
        except Exception as e:
            print(f'Error processing {filename}: {e}')

print(f'Successfully updated {count} tools.')
