
$path = "Tool_LeanWorkshop.html"
$content = Get-Content $path -Raw

# Helper to normalize multiline strings to single line
function Repair-Block($text, $startPattern, $endPattern) {
    # Regex to find the block
    $pattern = "(?s)(" + $startPattern + ".*?" + $endPattern + ")"
    
    # Replace function
    $text = [Regex]::Replace($text, $pattern, { param($match) 
            $block = $match.Value
            # Replace newlines and excessive spaces with a single space
            $clean = $block -replace "[\r\n]+", " " -replace "\s+", " "
            # Fix the specific broken syntax we know
            $clean = $clean -replace "svgHtml \+= ' <path", "svgHtml += '<path"
            $clean = $clean -replace "svgHtml \+= ' <rect", "svgHtml += '<rect"
            $clean = $clean -replace "svgHtml \+= ' <line", "svgHtml += '<line"
            $clean = $clean -replace " /> ';", " />';" 
            $clean = $clean -replace "text>';", "text>';"
        
            Write-Host "Fixed a block starting with: $($block.Substring(0, 30))..."
            return $clean
        })
    return $text
}

# 1. Flowchart Path
# Pattern: svgHtml += ' ... <path ... ';
$content = Repair-Block $content "svgHtml \+= '\s*<path" "contextmenu=.*?'\s*;"
# Note: My previous edit collapsed the start to "svgHtml += '<path", so the pattern matches that too.

# 2. Flowchart Rect/Text
# Pattern: svgHtml += ' ... <rect ... </text>';
$content = Repair-Block $content "svgHtml \+= '\s*<rect" "</text>'\s*;"

# 3. Flowchart Line/Circle
# Pattern: svgHtml += ' ... <line ... />';
$content = Repair-Block $content "svgHtml \+= '\s*<line" "stroke-dasharray=.*?'\s*;"

# 4. Swimlane Path
# Pattern: svgHtml += ' ... <path ... swim-edge" />';
$content = Repair-Block $content "svgHtml \+= '\s*<path" "class=.swim-edge.\s*/>'\s*;"

# 5. Swimlane Rect/Text
# Pattern: svgHtml += ' ... <rect ... </text>';
# This matches the same as #2, but logic handles all occurrences.

Set-Content $path $content -NoNewline
Write-Host "Done"
