$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:7005/")
$listener.Start()
Write-Host "Server listening on http://localhost:7005/"
$root = "c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $root + $request.Url.LocalPath.Replace('/', '\')
        
        # Default file
        if ((Test-Path $localPath) -and (Get-Item $localPath) -is [System.IO.DirectoryInfo]) {
            $localPath = Join-Path $localPath "index.html"
        }

        if (Test-Path $localPath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            $response.StatusCode = 200
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Stop()
}
