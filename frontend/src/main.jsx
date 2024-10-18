import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AdmissionOutComeProvider from './contexts/admissionOutcomeContextProvider.jsx'
import { UserProvider } from './contexts/UserContetext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdmissionOutComeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    
  </AdmissionOutComeProvider>

  </BrowserRouter>
)
