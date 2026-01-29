
import os

file_path = r"c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Tool_LeanWorkshop.html"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# We want to keep lines 0 to 3449 (which corresponds to line 3450 in 1-based indexing)
# Line 3449 (index 3448) is the 'action' line.
# Line 3450 (index 3449) is the start of garbage: </linearGradient >
# We want to delete from index 3449 onwards until we find 'healthcare': {

start_delete_idx = 3449 # Line 3450
end_delete_idx = -1

for i in range(start_delete_idx, len(lines)):
    if "'healthcare': {" in lines[i]:
        end_delete_idx = i
        break

if end_delete_idx == -1:
    print("Could not find healthcare block")
    exit(1)

print(f"Deleting from line {start_delete_idx + 1} to {end_delete_idx}")
print(f"Content starting at deletion: {lines[start_delete_idx].strip()[:20]}...")
print(f"Content resuming at: {lines[end_delete_idx].strip()[:20]}...")

# Construct new content
# Lines up to action
new_lines = lines[:start_delete_idx]

# Add closing braces for manufacturing block
# The previous line (3449) ends with "...", so we just append the closings
# Check if 3449 has a comma. It likely doesn't since it's the last item in the obj.
# But we might want to check.
# Actually, the previous action line does not have a comma in the snapshot 755.
# So we just add the braces.
new_lines.append("                        }\n") # Close data
new_lines.append("                    },\n")      # Close manufacturing

# Add the rest from healthcare onwards
new_lines.extend(lines[end_delete_idx:])

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("File updated successfully.")
