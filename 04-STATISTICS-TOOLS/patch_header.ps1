
$path = "Tool_LeanWorkshop.html"
$content = Get-Content $path -Raw

# Fix Header corruptions
$content = $content -replace "init\s+ml2canvas", "initial-scale=1.0`">`n<script src=`"https://cdnjs.cloudflare.com/ajax/libs/html2canvas"
$content = $content -replace "</script>ript>", "</script>"
$content = $content -replace "<style> src=", "<script src="
$content = $content -replace "href=`"twilight_theme.css`">\s*<style>", "href=`"twilight_theme.css`">`n<link rel=`"stylesheet`" href=`"twilight_theme.css`">"
# It seems lines got mashed.

# Global cleanup of mashed tags
$content = $content -replace "><", ">`n<"
$content = $content -replace ";}", ";}`n"
$content = $content -replace "\{", "{`n"

Set-Content $path $content -NoNewline
Write-Host "Patched header."
