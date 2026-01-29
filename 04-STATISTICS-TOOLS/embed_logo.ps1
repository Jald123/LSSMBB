$htmlPath = "c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Tool_ExamEngine.html"
$imagePath = "c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\images\health_quality_logo.jpg"

if (Test-Path $imagePath) {
    Write-Host "Reading image..."
    $bytes = [IO.File]::ReadAllBytes($imagePath)
    $b64 = [Convert]::ToBase64String($bytes)
    $dataUri = "data:image/jpeg;base64,$b64"
    
    Write-Host "Reading HTML..."
    $content = Get-Content $htmlPath -Raw -Encoding UTF8
    
    # Check if we need to replace
    if ($content.Contains("images/health_quality_logo.jpg")) {
        Write-Host "Replacing image links with Base64 data..."
        $newContent = $content.Replace("images/health_quality_logo.jpg", $dataUri)
        
        Set-Content -Path $htmlPath -Value $newContent -Encoding UTF8
        Write-Host "Success: Embedded image into HTML."
    }
    else {
        Write-Host "Warning: HTML does not contain the target image path. It might be already replaced."
    }
}
else {
    Write-Host "Error: Image not found."
}
