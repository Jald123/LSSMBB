
import os

file_path = r"c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Tool_LeanWorkshop.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the broken blocks and their fixes
replacements = [
    # Flowchart path (Lines ~16985)
    (
        "svgHtml += '\n                                                     <path d=\"' + d + '\" stroke=\"#3498db\"",
        "svgHtml += '<path d=\"' + d + '\" stroke=\"#3498db\""
    ),
    (
        "stroke-width=\"2\" ' + markerEnd + '\n                                                        fill=\"none\" ' + eraserClass + '\n                                                        onclick=\"window.handleEdgeClick(' + idx + ', event)\"\n                                                        ondblclick=\"window.handleEdgeDoubleClick(' + idx + ', event)\"\n                                                        oncontextmenu=\"window.handleEdgeContextMenu(' + idx + ', event)\" />\n                                                    ';",
        "stroke-width=\"2\" ' + markerEnd + ' fill=\"none\" ' + eraserClass + ' onclick=\"window.handleEdgeClick(' + idx + ', event)\" ondblclick=\"window.handleEdgeDoubleClick(' + idx + ', event)\" oncontextmenu=\"window.handleEdgeContextMenu(' + idx + ', event)\" />';"
    ),
    # Flatten the remaining newlines in the flowchart block if any
]

# We need a more robust replacement that handles the potential whitespace variations.
# Let's read strictly lines 16980-17020 and 18530-18550 and re-stitch them.

lines = content.splitlines()

# Fix Flowchart (approx 16980-17020)
# We will scan for "svgHtml += '" ending with a quote and then next lines
# Actually, let's just use string replacement on the exact multiline string captured from view_file

broken_flowchart_path = """svgHtml += '
                                                    <path d="' + d + '" stroke="#3498db"
                                                        stroke-width="2" ' + markerEnd + '
                                                        fill="none" ' + eraserClass + '
                                                        onclick="window.handleEdgeClick(' + idx + ', event)"
                                                        ondblclick="window.handleEdgeDoubleClick(' + idx + ', event)"
                                                        oncontextmenu="window.handleEdgeContextMenu(' + idx + ', event)" />
                                                    ';"""

fixed_flowchart_path = """svgHtml += '<path d="' + d + '" stroke="#3498db" stroke-width="2" ' + markerEnd + ' fill="none" ' + eraserClass + ' onclick="window.handleEdgeClick(' + idx + ', event)" ondblclick="window.handleEdgeDoubleClick(' + idx + ', event)" oncontextmenu="window.handleEdgeContextMenu(' + idx + ', event)" />';"""

# Normalizing whitespace for matching
def normalize(s):
    return ' '.join(s.split())

# We can't normalize the whole file.
# Let's try raw replacement first, assuming the OS follows the read format.
if broken_flowchart_path in content:
    content = content.replace(broken_flowchart_path, fixed_flowchart_path)
    print("Fixed Flowchart Path (Exact Match)")
else:
    # Try with universal newlines
    broken_norm = broken_flowchart_path.replace('\n', '\r\n')
    if broken_norm in content:
        content = content.replace(broken_norm, fixed_flowchart_path)
        print("Fixed Flowchart Path (CRLF Match)")
    else:
        # Fallback: Find the lines by loose matching
        print("Could not find Flowchart Path exact match. Attempting fuzzy fix...")
        # Since we know the line numbers roughly, we can slice
        # But line numbers shift.
        pass

# Fix Swimlane Path (approx 18536)
broken_swimlane_path = """svgHtml += '
                                                            <path d="' + d + '" fill="none" stroke="' + color + '"
                                                                stroke-width="' + width + '"
                                                                marker-end="url(#arrow-' + idx + ')"
                                                                style="cursor:pointer; pointer-events:all;"
                                                                class="swim-edge" />';"""
fixed_swimlane_path = """svgHtml += '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + width + '" marker-end="url(#arrow-' + idx + ')" style="cursor:pointer; pointer-events:all;" class="swim-edge" />';"""

if broken_swimlane_path in content:
    content = content.replace(broken_swimlane_path, fixed_swimlane_path)
    print("Fixed Swimlane Path (Exact Match)")
elif broken_swimlane_path.replace('\n', '\r\n') in content:
    content = content.replace(broken_swimlane_path.replace('\n', '\r\n'), fixed_swimlane_path)
    print("Fixed Swimlane Path (CRLF Match)")


# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
