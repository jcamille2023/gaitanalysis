import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import RCV from './pages/RCV.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rcv" element={<RCV />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
