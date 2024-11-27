# Create directories
New-Item -ItemType Directory -Path "frontend\web", "frontend\mobile", "shared", "config" -Force

# Setup Backend
Set-Location backend
npm install
npm run build

# Setup Web Frontend
Set-Location ..\frontend\web
npx create-react-app . --template typescript
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-router-dom @reduxjs/toolkit react-redux

# Setup Mobile Frontend
Set-Location ..\mobile
npx create-expo-app . --template blank-typescript
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context axios @reduxjs/toolkit react-redux

# Return to root
Set-Location ..\.. 