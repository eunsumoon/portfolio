param([int]$Port = 8108)

$Root = Split-Path -Parent $PSScriptRoot

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".webp" = "image/webp"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".mp4"  = "video/mp4"
  ".woff" = "font/woff"
  ".woff2" = "font/woff2"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root at http://localhost:$Port/"

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $res = $ctx.Response
  try {
    $path = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($path.EndsWith("/")) { $path += "index.html" }
    $file = Join-Path $Root ($path.TrimStart("/") -replace "/", "\")
    if ((Test-Path $file) -and (Get-Item $file).PSIsContainer) {
      $file = Join-Path $file "index.html"
    }
    if (Test-Path $file -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      if ($mime.ContainsKey($ext)) { $res.ContentType = $mime[$ext] }
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $nf = Join-Path $Root "404.html"
      if (Test-Path $nf -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($nf)
        $res.ContentType = "text/html; charset=utf-8"
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    }
  } catch {
    try { $res.StatusCode = 500 } catch {}
  }
  try { $res.Close() } catch {}
}
