
$backupPath = "Tool_LeanWorkshop.html.backup"
$brokenPath = "Tool_LeanWorkshop.html"
$outPath = "Tool_LeanWorkshop.html"

# Read files
$backupCtx = Get-Content $backupPath
$brokenCtx = Get-Content $brokenPath

# Find split points
$backupBodyLine = 0
for ($i = 0; $i -lt $backupCtx.Count; $i++) {
    if ($backupCtx[$i].Trim() -eq "<body>") {
        $backupBodyLine = $i
        break
    }
}

$brokenBodyLine = 0
for ($i = 0; $i -lt $brokenCtx.Count; $i++) {
    if ($brokenCtx[$i].Trim() -eq "<body>") {
        $brokenBodyLine = $i
        break
    }
}

Write-Host "Backup Body at line: $backupBodyLine"
Write-Host "Broken Body at line: $brokenBodyLine"

if ($backupBodyLine -gt 0 -and $brokenBodyLine -gt 0) {
    # Take header from backup (lines 0 to backupBodyLine - 1)
    $cleanHeader = $backupCtx[0..($backupBodyLine - 1)]
    
    # Take body from broken (lines brokenBodyLine to end)
    $currentBody = $brokenCtx[$brokenBodyLine..($brokenCtx.Count - 1)]
    
    # Combine
    $cleanHeader + $currentBody | Set-Content $outPath
    Write-Host "Spliced successfully."
}
else {
    Write-Host "Could not find body tags to splice."
}
