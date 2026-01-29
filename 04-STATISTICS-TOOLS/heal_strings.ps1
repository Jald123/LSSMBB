
$path = "Tool_LeanWorkshop.html"
$lines = Get-Content $path

$newLines = @()
$buffer = ""

foreach ($line in $lines) {
    if ($buffer -ne "") {
        $buffer += " " + $line  # Join with space to avoid merging words
    }
    else {
        $buffer = $line
    }

    # Remove escaped quotes for counting
    $test = $buffer -replace "\\'", "" -replace '\\"', ""
    
    # Count quotes
    $sQuotes = ($test.Length - $test.Replace("'", "").Length)
    $dQuotes = ($test.Length - $test.Replace('"', "").Length)
    
    # Check balance (odd number means open string)
    if (($sQuotes % 2 -eq 0) -and ($dQuotes % 2 -eq 0)) {
        # Balanced, flush buffer
        $newLines += $buffer
        $buffer = ""
    }
    # Else, keep buffer accumulating next line
}

# Flush remaining buffer if any
if ($buffer -ne "") { $newLines += $buffer }

Set-Content $path $newLines
Write-Host "Healed strings. New line count: $($newLines.Count)"
