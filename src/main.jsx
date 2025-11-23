import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './styles/Utils.css'
import './styles/Global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)
