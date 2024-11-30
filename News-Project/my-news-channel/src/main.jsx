import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Data from './Components/Data'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Data/>
    </BrowserRouter>
    
  </React.StrictMode>,
)

