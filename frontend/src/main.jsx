import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AdmissionOutComeProvider from './contexts/admissionOutcomeContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdmissionOutComeProvider>
    <App />
  </AdmissionOutComeProvider>

  </BrowserRouter>
)
