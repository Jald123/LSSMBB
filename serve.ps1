$root = "c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM"
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:7889/")
$listener.Start()
Write-Host "Server running at http://localhost:7889/" -ForegroundColor Green

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $resp = $ctx.Response
    $path = $req.Url.LocalPath

    if ($path -eq "/") { $path = "/index.html" }

    $file = Join-Path $root ($path -replace "/", "\")
    Write-Host "$($req.HttpMethod) $path"

    if (Test-Path $file -PathType Leaf) {
        $bytes = [IO.File]::ReadAllBytes($file)
        $ext = [IO.Path]::GetExtension($file).ToLower()
        $mime = switch ($ext) {
            ".html"  { "text/html; charset=utf-8" }
            ".css"   { "text/css; charset=utf-8" }
            ".js"    { "application/javascript; charset=utf-8" }
            ".json"  { "application/json" }
            ".png"   { "image/png" }
            ".jpg"   { "image/jpeg" }
            ".jpeg"  { "image/jpeg" }
            ".gif"   { "image/gif" }
            ".svg"   { "image/svg+xml" }
            ".ico"   { "image/x-icon" }
            ".woff"  { "font/woff" }
            ".woff2" { "font/woff2" }
            ".ttf"   { "font/ttf" }
            ".mp4"   { "video/mp4" }
            ".webp"  { "image/webp" }
            ".csv"   { "text/csv" }
            ".md"    { "text/markdown" }
            default  { "application/octet-stream" }
        }
        $resp.ContentType = $mime
        $resp.ContentLength64 = $bytes.Length
        $resp.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    else {
        $resp.StatusCode = 404
        $msg = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
        $resp.OutputStream.Write($msg, 0, $msg.Length)
    }
    $resp.OutputStream.Close()
}
