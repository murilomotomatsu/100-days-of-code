import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import Videos from './assets/pages/Videos'
import './index.css'
import AboutPage from './assets/pages/About-me'
import Chat from './assets/pages/Chat'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/100-days-of-code' >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/videos' element={<Videos/>} />
        <Route path='/about-me' element={<AboutPage/>} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>    
    </BrowserRouter>
  </StrictMode>,
)
