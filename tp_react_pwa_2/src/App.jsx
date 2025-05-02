import { useState } from 'react'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import Favorites from './pages/Favorites/Favorites'
import { ROUTES } from './const/routes'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <BrowserRouter>
    
      <Routes>
      
      <Route path="/" element={<Navigate to={ROUTES.home} />} />
        <Route element={ <Home />} path={ROUTES.home} />
        <Route element={ <Details />} path={ROUTES.details} />
        <Route element={ <Favorites />} path={ROUTES.favorites} /> 
      
      </Routes>

    
    </BrowserRouter>


    // <Home/>

    
  )
}

export default App
