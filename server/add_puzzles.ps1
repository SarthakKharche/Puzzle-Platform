$source = "C:\Users\sarth\Downloads\Puzzles1"
$dest = "c:\Users\sarth\Desktop\Puzzle Platform\server\puzzle_bank"

if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force
}

Get-ChildItem -Path $source -Directory | ForEach-Object {
    $puzzleName = $_.Name
    $targetDir = Join-Path $dest $puzzleName
    if (-not (Test-Path $targetDir)) {
        Copy-Item -Path $_.FullName -Destination $targetDir -Recurse -Force
        Write-Host "Added puzzle: $puzzleName"
    } else {
        Write-Host "Puzzle already exists: $puzzleName"
    }
}
