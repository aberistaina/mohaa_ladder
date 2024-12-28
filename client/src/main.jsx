import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from "notistack";

const CLIENT_ID = "104320394955-k66ojerlavdmi0tg3u0199nt0cu66qq6.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId= {CLIENT_ID}>
        <SnackbarProvider
            maxSnack={4}
            autoHideDuration={3000}>
                <App />
        </SnackbarProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
