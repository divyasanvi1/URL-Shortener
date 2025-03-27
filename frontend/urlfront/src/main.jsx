import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import storage from "./store/storage.js"
import App from './App.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <Provider store={storage}>
  <StrictMode> 
    <App />
  </StrictMode>,
  </Provider>,
)
