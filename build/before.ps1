Param (
[string]$workspace,
[string]$project
)

dotnet build "$($workspace)/$($project)"

$pidPath = $workspace + "/build/pid.txt"

if (Test-Path $pidPath -PathType Leaf)
{
    $pidObj = Get-Content $pidPath
    $oldProc = Get-Process -Id $pidObj -ErrorAction SilentlyContinue
    if ($oldProc -ne $null)
    {
        Write-Output "exist vue-cli-serve pid:$($pidObj)"
        return
    }
}

$proc = Start-Process cmd -WorkingDirectory $workspace -Passthru -ArgumentList "/c yarn run serve"

Remove-Item $pidPath -Force -Recurse -ErrorAction SilentlyContinue

Out-File -FilePath $pidPath -InputObject $proc.Id

Start-Process cmd -WorkingDirectory $workspace -ArgumentList "/c node.exe ./build/wait-bonjour.js" -Wait -Passthru -NoNewWindow