# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "Set-Location backend; npm run dev"

# Start Web Frontend
Start-Process powershell -ArgumentList "-NoExit", "Set-Location frontend/web; npm start"

# Start Mobile Frontend
Start-Process powershell -ArgumentList "-NoExit", "Set-Location frontend/mobile; npm start" 