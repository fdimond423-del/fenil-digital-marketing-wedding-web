Add-Type -AssemblyName System.Drawing

function Compress-ImageFile {
    param(
        [string]$Path,
        [int]$MaxWidth = 540,
        [int]$Quality = 78
    )

    if (-not (Test-Path $Path)) { return }

    $fullPath = (Resolve-Path $Path).Path
    $origSize = (Get-Item $fullPath).Length

    try {
        $sourceBmp = [System.Drawing.Bitmap]::FromFile($fullPath)
        
        $newWidth = $sourceBmp.Width
        $newHeight = $sourceBmp.Height

        if ($newWidth -gt $MaxWidth) {
            $newHeight = [int]($sourceBmp.Height * ($MaxWidth / $sourceBmp.Width))
            $newWidth = $MaxWidth
        }

        $destBmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graph = [System.Drawing.Graphics]::FromImage($destBmp)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $graph.DrawImage($sourceBmp, 0, 0, $newWidth, $newHeight)

        $sourceBmp.Dispose()
        $graph.Dispose()

        # JPEG encoder
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

        $tempPath = $fullPath + ".tmp"
        $destBmp.Save($tempPath, $codec, $encoderParams)
        $destBmp.Dispose()

        $newSize = (Get-Item $tempPath).Length

        if ($newSize -lt $origSize) {
            Move-Item -Path $tempPath -Destination $fullPath -Force
            $savedPct = [math]::Round((($origSize - $newSize) / $origSize) * 100, 1)
            Write-Host "Compressed $($Path): $([math]::Round($origSize/1KB,1))KB -> $([math]::Round($newSize/1KB,1))KB (-$savedPct%)"
        } else {
            Remove-Item -Path $tempPath -Force
            Write-Host "Skipped $($Path): already optimal"
        }
    } catch {
        Write-Warning "Failed on $($Path): $_"
    }
}

# Compress heavy MyPatrika images
Get-ChildItem -Path "assets/img/mypatrika/*.jpg" | ForEach-Object {
    Compress-ImageFile -Path $_.FullName -MaxWidth 540 -Quality 80
}

# Compress heavy Toran images
Get-ChildItem -Path "assets/img/toran/*.png" | ForEach-Object {
    Compress-ImageFile -Path $_.FullName -MaxWidth 540 -Quality 80
}
