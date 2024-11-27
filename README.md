# Huzla - Service Marketplace App

## Project Overview
Huzla is a modern, cross-platform service marketplace that connects service providers with customers. The platform enables users to buy and sell various services including:
- Professional Services (Plumbing, Electrical, Mechanical)
- Personal Care (Hair Styling, Beauty Services)
- Home Services (Cleaning, Gardening)
- Skilled Trade Services
- And more...

## Quick Start Guide

1. **Clone and Setup**
```bash
# Clone the repository
git clone [your-repo-url]
cd huzla

# Install backend dependencies
cd backend
npm install
npm run build

# Install web frontend dependencies
cd ../frontend/web
npx create-react-app . --template typescript
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-router-dom @reduxjs/toolkit react-redux

# Install mobile frontend dependencies
cd ../mobile
npx create-expo-app . --template blank-typescript
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context axios @reduxjs/toolkit react-redux
```

2. **Start Development Servers**

Open three separate terminal windows and run:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Web Frontend
cd frontend/web
npm start

# Terminal 3 - Mobile Frontend
cd frontend/mobile
npm start
```

3. **Access the Applications**
- Backend API: http://localhost:5000
- Web Frontend: http://localhost:3000
- Mobile Frontend: Will open in Expo client

## Development Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Main development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Urgent fixes for production

### Contributing Guidelines

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:
```bash
git add .
git commit -m "feat: add your feature description"
```

3. Push your changes and create a pull request:
```bash
git push origin feature/your-feature-name
```

## Available Scripts

### Backend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run test`: Run tests
- `npm run lint`: Lint code
- `npm run format`: Format code

### Mobile App
- `npm start`: Start Expo development server
- `npm run android`: Start Android app
- `npm run ios`: Start iOS app
- `npm run web`: Start web version
- `npm run test`: Run tests

## License
[Add your license information here]

## Contact
[Add contact information]