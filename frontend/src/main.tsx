import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx';

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Mono , serif",
    allVariants: { color: "aliceblue" },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
     <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
      </AuthProvider>
  </StrictMode>,
)
