$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server listening on http://localhost:8080/"
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
            
            # Set content type and encoding
            if ($localPath.EndsWith(".html")) {
                $response.ContentType = "text/html; charset=utf-8"
            }
            elseif ($localPath.EndsWith(".css")) {
                $response.ContentType = "text/css; charset=utf-8"
            }
            elseif ($localPath.EndsWith(".js")) {
                $response.ContentType = "application/javascript; charset=utf-8"
            }
            
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            $response.StatusCode = 200
        }
        else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
}
catch {
    Write-Error $_
}
finally {
    $listener.Stop()
}
