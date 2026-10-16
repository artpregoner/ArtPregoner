import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Maintenance from './Maintenance.jsx'
import { MAINTENANCE_MODE } from './config.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {MAINTENANCE_MODE ? <Maintenance /> : <App />}
  </StrictMode>,
)
