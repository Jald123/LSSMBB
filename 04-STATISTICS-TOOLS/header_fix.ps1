
$path = "Tool_LeanWorkshop.html"
$content = Get-Content $path -Raw

# Define clean header
$header = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Lean Tools | Black Belt Studio</title>
    <link rel="stylesheet" href="twilight_theme.css">
    <script src="config.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
"@

# Regex to replace the corrupted start
# We look for DOCTYPE ... down to the first <style> tag
# The corrupted file had: 
# <!DOCTYPE html> ... <style> src=...
# We will match loosely
$pattern = "(?s)<!DOCTYPE html>.*?<style>.*?(?=\.input-tooltip)"
# The corrupted file had `.input-tooltip` after the style tag.

# Let's try to match up to `.input-tooltip`
if ($content -match $pattern) {
    $content = $content -replace $pattern, "$header`n        /* TOOLTIP STYLE */`n        .input-tooltip"
    Write-Host "Header replaced."
}
else {
    Write-Host "Could not match header pattern clearly. Forcing top replacement."
    # Fallback: Just take substring from first <style> (if readable)
    # Or just prepend/replace the first N chars
}

# Fix stray </script>ript>
$content = $content -replace "</script>ript>", "</script>"
$content = $content -replace "<script src=`"config.js`"></script>`n    <script src=`"config.js`"></script>", "<script src=`"config.js`"></script>" # Remove double include if present

Set-Content $path $content -NoNewline
