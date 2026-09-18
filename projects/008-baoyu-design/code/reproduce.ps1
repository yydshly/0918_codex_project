param([Parameter(Mandatory=$true)][string]$UpstreamDir)
$ErrorActionPreference = 'Stop'
$projectDir = Split-Path -Parent $PSScriptRoot
$upstreamRoot = (Resolve-Path -LiteralPath $UpstreamDir).Path
$expected = '026d4ea012bdd5cada72ac8cc13f21ba4edf2245'
$revision = (git -C $upstreamRoot rev-parse HEAD).Trim()
if ($revision -ne $expected) { throw "Expected upstream $expected; got $revision" }
$skillDir = Join-Path $upstreamRoot 'skills/baoyu-design'
$systemDir = Join-Path $PSScriptRoot 'reader-kit'
$demoDir = Join-Path $projectDir 'demo'
foreach ($scriptName in @('compile-design-system.mjs', 'check-design-system.mjs', 'build-preview.mjs')) {
    & node (Join-Path $skillDir "agents/$scriptName") $systemDir
    if ($LASTEXITCODE -ne 0) { throw "$scriptName failed" }
}
& node (Join-Path $skillDir 'agents/import-design-system.mjs') $systemDir $demoDir
if ($LASTEXITCODE -ne 0) { throw 'Import failed' }
& node (Join-Path $PSScriptRoot 'build-demo.cjs') $upstreamRoot
if ($LASTEXITCODE -ne 0) { throw 'Prototype build failed' }
& node (Join-Path $skillDir 'agents/record-asset.mjs') $demoDir 'index.html' --name '拾页阅读原型'
if ($LASTEXITCODE -ne 0) { throw 'Asset recording failed' }
& node (Join-Path $skillDir 'agents/record-asset.mjs') $demoDir 'deck.html' --name '拾页演示文稿'
if ($LASTEXITCODE -ne 0) { throw 'Asset recording failed' }
Write-Output 'Rebuilt design system, preview, runtime binding and reader prototype. PPTX export is a separate documented step.'
