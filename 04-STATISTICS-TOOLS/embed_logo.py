import base64
import os

html_path = r"c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Tool_ExamEngine.html"
image_path = r"c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\images\health_quality_logo.jpg"

print(f"Processing {html_path}...")

try:
    # 1. Read Image and convert to Base64
    if not os.path.exists(image_path):
        print(f"Error: Image not found at {image_path}")
        exit(1)
        
    with open(image_path, "rb") as img_file:
        b64_string = base64.b64encode(img_file.read()).decode('utf-8')
    
    # Create Data URI
    # Note: Assuming it is a jpg based on extension
    data_uri = f"data:image/jpeg;base64,{b64_string}"
    print(f"Generated Base64 string (len: {len(data_uri)})")

    # 2. Read HTML
    with open(html_path, "r", encoding="utf-8") as html_file:
        content = html_file.read()
    
    # 3. Replace all occurrences
    # We replace the specific relative path string
    target_str = "images/health_quality_logo.jpg"
    count = content.count(target_str)
    
    if count == 0:
        print("Warning: No occurrences of 'images/health_quality_logo.jpg' found in HTML.")
        # Check if it was already replaced?
        if "data:image/jpeg;base64" in content:
            print("It seems base64 data is already present.")
    else:
        new_content = content.replace(target_str, data_uri)
        
        # 4. Write HTML
        with open(html_path, "w", encoding="utf-8") as html_file:
            html_file.write(new_content)
            
        print(f"Successfully replaced {count} occurrences of the logo with Base64 data.")

except Exception as e:
    print(f"Critical Error: {e}")
