# Deploys the infrastructure, uploads the site and clears the CDN cache.
# Usage (from any folder):  .\deploy.ps1            or  .\deploy.ps1 -AwsProfile otherprofile
param([string]$AwsProfile = 'myprofile')

$ErrorActionPreference = 'Stop'
$Region = 'eu-north-1'
$Stack = 'portfolio-crc'
Set-Location $PSScriptRoot

function Assert-Ok($step) {
  if ($LASTEXITCODE -ne 0) { throw "$step failed (exit code $LASTEXITCODE)" }
}

function Get-StackOutput($key) {
  aws cloudformation describe-stacks --stack-name $Stack --region $Region --profile $AwsProfile `
    --query "Stacks[0].Outputs[?OutputKey=='$key'].OutputValue" --output text
  Assert-Ok "Reading stack output $key"
}

Write-Host '1/3 Deploying infrastructure with SAM...'
sam deploy --profile $AwsProfile
Assert-Ok 'sam deploy'

Write-Host '2/3 Uploading site files to S3...'
$bucket = Get-StackOutput 'SiteBucketName'
aws s3 sync site/ "s3://$bucket/" --delete --only-show-errors --region $Region --profile $AwsProfile
Assert-Ok 'Site upload'

Write-Host '3/3 Clearing the CloudFront cache...'
$distribution = Get-StackOutput 'DistributionId'
aws cloudfront create-invalidation --distribution-id $distribution --paths '/*' --profile $AwsProfile --query 'Invalidation.Id' --output text
Assert-Ok 'Cache invalidation'

Write-Host "Done. Site: $(Get-StackOutput 'SiteUrl')"
