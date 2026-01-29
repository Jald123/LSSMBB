
$path = "Tool_LeanWorkshop.html"
$content = Get-Content $path -Raw

Write-Host "File size before: $($content.Length)"

# 1. Basic formatting: Split on semicolons and braces
# We use a negative lookbehind/lookahead to avoid splitting inside typical string patterns if possible, 
# but simply splitting on '; ' to ';\n' is a good start.
# However, we must be careful not to split css styles like 'color:red;' inside strings.
# But since this is a JS/HTML file, '; ' usually ends a statement.
# We'll be conservative: Split `;} ` -> `;}\n` and `; ` -> `;\n` (if followed by non-space?)
# Let's just do `}` -> `}\n` and `{` -> `{\n` and `;` -> `;\n`
# This might break CSS strings but restores structure.
# Valid JS: `var x = "color:red;";` -> `var x = "color:red;\n";` (Valid string, but might look weird)
# But `var x = "color:red;"` is fine.

# Just purely strictly for readability and rescuing comments:
# Replace `;` with `;\n`
$content = $content -replace ";", ";`n"
# Replace `{` with `{\n`
$content = $content -replace "{", "{`n"
# Replace `}` with `}\n`
$content = $content -replace "}", "}`n"

# 2. Rescue code from comments
# Pattern: `// comment... keyword`
# We look for `//` followed by space, then chars, then space, then keyword
# Keywords: var, const, let, function, window, if, for, return, document, svgHtml
# We use regex replacement.
$keywords = "var|const|let|function|window|if|for|return|document|svgHtml|else|case|break|default"
$content = [Regex]::Replace($content, "(//.*?)\s+($keywords)", '$1`n$2')

# 3. Fix the specific SVG broken strings we know about
# Flowchart Path - ensure it is on its own line if it got merged
$content = $content -replace "svgHtml \+= '<path", "`nsvgHtml += '<path"
$content = $content -replace "svgHtml \+= '<rect", "`nsvgHtml += '<rect"
$content = $content -replace "svgHtml \+= '<line", "`nsvgHtml += '<line"
$content = $content -replace "svgHtml \+= '<circle", "`nsvgHtml += '<circle"

# 4. Fix Swimlane broken strings
$content = $content -replace "class=`"swim-edge`" />';", "class=`"swim-edge`" />';`n"

# 5. Restore indentation (optional, but helps)
# We can't easily auto-indent without a parser, but splitting lines is the main goal.

Set-Content $path $content -NoNewline
Write-Host "File size after: $($content.Length)"
Write-Host "Restoration complete."
