Param (
[string]$workspace
)

$pidPath = $workspace + "/build/pid.txt"
$pidObj = Get-Content $pidPath -ErrorAction SilentlyContinue

if ($pidObj -eq $null)
{
    return
}

taskkill.exe /pid $pidObj

Remove-Item $pidPath -Force -Recurse -ErrorAction SilentlyContinue