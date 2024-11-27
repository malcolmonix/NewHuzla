# Create directories
New-Item -ItemType Directory -Force -Path "frontend/web/src/components", "frontend/web/src/pages", "frontend/web/src/store/slices"

# Create files
$files = @{
    "frontend/web/src/index.tsx" = @"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { store } from './store';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
"@

    "frontend/web/src/App.tsx" = @"
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component='main' sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/services' element={<Services />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
"@

    "frontend/web/src/store/index.ts" = @"
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
"@

    "frontend/web/src/theme.ts" = @"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
"@
}

# Create each file
foreach ($file in $files.Keys) {
    New-Item -ItemType File -Force -Path $file
    Set-Content -Path $file -Value $files[$file]
}

# Install dependencies
Set-Location frontend/web
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @reduxjs/toolkit react-redux react-router-dom axios 