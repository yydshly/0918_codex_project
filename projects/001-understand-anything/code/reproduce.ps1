param([string]$UpstreamDir = (Join-Path $PSScriptRoot '../upstream-local/understand-anything'))
$ErrorActionPreference = 'Stop'
$pin = '6df3065f1d8ddc2ce3615314d1d493f36d6b1c80'
foreach ($tool in @('git', 'node', 'pnpm')) { Get-Command $tool -ErrorAction Stop | Out-Null }
if ([int]((& node -p 'process.versions.node.split(".")[0]')) -lt 24) { throw 'Use Node.js 24 or newer for the TypeScript experiment entrypoint.' }
function Invoke-Checked([scriptblock]$Action) {
    & $Action
    if ($LASTEXITCODE -ne 0) { throw "External command failed with exit code $LASTEXITCODE" }
}
if (-not (Test-Path -LiteralPath $UpstreamDir)) {
    $parent = Split-Path -Parent ([IO.Path]::GetFullPath($UpstreamDir))
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
    Invoke-Checked { git clone --filter=blob:none --no-checkout https://github.com/Egonex-AI/Understand-Anything.git $UpstreamDir }
    Invoke-Checked { git -C $UpstreamDir checkout --detach $pin }
}
$revision = & git -C $UpstreamDir rev-parse HEAD
if ($LASTEXITCODE -ne 0 -or $revision.Trim() -ne $pin) { throw "The existing checkout must be at $pin. No existing checkout was changed." }
Push-Location $UpstreamDir
try {
    Invoke-Checked { pnpm install --frozen-lockfile --ignore-scripts }
    Invoke-Checked { pnpm --filter '@understand-anything/core' build }
} finally { Pop-Location }
Invoke-Checked { node (Join-Path $PSScriptRoot 'run-experiments.mjs') ([IO.Path]::GetFullPath($UpstreamDir)) }
