# Final encoding fix
$filePath = "c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Tool_LeanWorkshop.html"
$content = [System.IO.File]::ReadAllBytes($filePath)
$str = [System.Text.Encoding]::UTF8.GetString($content)

# 5S Japanese Terms
$str = $str.Replace("jp: '?? (Seiri)'", "jp: '整理 (Seiri)'")
$str = $str.Replace("jp: '?? (Seiton)'", "jp: '整頓 (Seiton)'")
$str = $str.Replace("jp: '?? (Seiso)'", "jp: '清掃 (Seiso)'")
$str = $str.Replace("jp: '?? (Seiketsu)'", "jp: '清潔 (Seiketsu)'")
$str = $str.Replace("jp: '? (Shitsuke)'", "jp: '躾 (Shitsuke)'")
$str = $str.Replace("jp: '?? (Shitsuke)'", "jp: '躾 (Shitsuke)'") # Cover both cases

# Industry Icons (guess context based on previous grep)
# "if (k === 'mfg') icon = '??';"
$str = $str.Replace("if (k === 'mfg') icon = '??';", "if (k === 'mfg') icon = '🏭';")
$str = $str.Replace("if (k === 'service') icon = '??';", "if (k === 'service') icon = '🛎️';")
$str = $str.Replace("let icon = '??';", "let icon = '📊';")

# CTQ / Data Owner
$str = $str.Replace('span style="font-weight:bold;">??</span>', 'span style="font-weight:bold;">🎯</span>')
$str = $str.Replace("data.owner || '??'", "data.owner || '👤'")

# Save
[System.IO.File]::WriteAllBytes($filePath, [System.Text.Encoding]::UTF8.GetBytes($str))

Write-Host "Fixed remaining patterns."
