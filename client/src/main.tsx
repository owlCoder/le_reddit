import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // dodaj ovde auth context vrv
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Global API endpoint
export const API_ENDPOINT: string = "http://localhost/api/"