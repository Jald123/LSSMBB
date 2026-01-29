
$path = "Tool_LeanWorkshop.html"
$content = Get-Content $path -Raw

# 1. Fix: '...${var}...' -> '...' + var + '...'
# We look for a single quote, then anything not a quote, then ${var}, then anything not a quote, then single quote.
# This pattern is tricky with regex because of backtracking and limits.
# Instead, we will iterate through the string and track quote state.

# Simple check for the specific variables we validated failing earlier
$vars = @("SVG_W", "SVG_H", "svgWidth", "svgHeight", "matrixW", "matrixH", "W", "H", "x", "y", "count", "PADDING", "p", "centerX", "centerY", "radius", "ang", "points", "val")

foreach ($v in $vars) {
    # Check for usage inside single quotes: ' ... ${v} ... '
    # We construct a regex to match: ' [^']* \$\{ \s* $v \s* \} [^']* '
    # Note: we need to handle spaces inside ${ } due to the healing script
    # Pattern: ' ... ${ v } ... '
    
    # We will just replace specific known failing patterns globally if they look like they are inside single quotes
    # Or actually, we can just replace '${v}' with "' + $v + '" everywhere?
    # NO! that would break backticks.
    
    # We must be context aware. Using a simple state machine in JS/Python is easier, but here we are in PowerShell.
    # Let's use a Replace with a MatchEvaluator if possible, or just very specific patterns.
    
    # We know the specific failing lines context from previous `Select-String` or `View-File`.
    # Let's target the exact strings we saw.
    
    # Case 1: <svg width="${...}"
    # If this is inside ', it looks like: html += '<svg width="${var}" ...';
    # Regex: '<svg width="\$\{\s*($v)\s*\}"
    # Replace: '<svg width="' + $v + '"
    
    $content = $content -replace "width=`"\$\{\s*$v\s*\}`"", "width=`"' + $v + '`""
    $content = $content -replace "height=`"\$\{\s*$v\s*\}`"", "height=`"' + $v + '`""
    $content = $content -replace "x=`"\$\{\s*$v\s*\}`"", "x=`"' + $v + '`""
    $content = $content -replace "y=`"\$\{\s*$v\s*\}`"", "y=`"' + $v + '`""
    $content = $content -replace "cx=`"\$\{\s*$v\s*\}`"", "cx=`"' + $v + '`""
    $content = $content -replace "cy=`"\$\{\s*$v\s*\}`"", "cy=`"' + $v + '`""
    $content = $content -replace "r=`"\$\{\s*$v\s*\}`"", "r=`"' + $v + '`""
    $content = $content -replace "points=`"\$\{\s*$v\s*\}`"", "points=`"' + $v + '`""
    
    # ViewBox is special with multiple vars
    # viewBox="0 0 ${v1} ${v2}"
}

# Fix viewBox manually for the cases we saw
$content = $content -replace "viewBox=`"0 0 \$\{\s*svgWidth\s*\}\s+\$\{\s*svgHeight\s*\}`"", "viewBox=`"0 0 ' + svgWidth + ' ' + svgHeight + '`""
$content = $content -replace "viewBox=`"0 0 \$\{\s*W\s*\}\s+\$\{\s*H\s*\}`"", "viewBox=`"0 0 ' + W + ' ' + H + '`""
$content = $content -replace "viewBox=`"0 0 \$\{\s*SVG_W\s*\}\s+\$\{\s*SVG_H\s*\}`"", "viewBox=`"0 0 ' + SVG_W + ' ' + SVG_H + '`""

Set-Content $path $content -NoNewline
Write-Host "Fixed variable interpolations."
