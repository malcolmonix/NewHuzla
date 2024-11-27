# Stop any running Node.js processes
Stop-Process -Name "node" -ErrorAction SilentlyContinue

# Create necessary directories
New-Item -ItemType Directory -Force -Path "frontend\web\src", "frontend\web\public", "frontend\mobile", "shared", "config"

# Setup Backend
Write-Host "Setting up backend..." -ForegroundColor Green
Set-Location backend
npm install
npm run build

# Setup Web Frontend
Write-Host "Setting up web frontend..." -ForegroundColor Green
Set-Location ..\frontend\web
npm install

# Setup Mobile Frontend
Write-Host "Setting up mobile frontend..." -ForegroundColor Green
Set-Location ..\mobile
npx create-expo-app . --template blank-typescript
npm install

# Return to root
Set-Location ..\..

# Start all services
Write-Host "Starting all services..." -ForegroundColor Green

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location backend; npm run dev"

# Start Web Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location frontend/web; npm start"

# Start Mobile Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location frontend/mobile; npm start" 