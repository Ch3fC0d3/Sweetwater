# Sweetwater Helium - Automated Deployment Script
Write-Host "Building Sweetwater Helium website..." -ForegroundColor Cyan

# Build the project
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`nBuild successful! Deploying to Netlify..." -ForegroundColor Green

# Deploy to Netlify (will create a new site automatically)
netlify deploy --prod --dir=dist --open

Write-Host "`nDeployment complete! Your site is now live." -ForegroundColor Green
