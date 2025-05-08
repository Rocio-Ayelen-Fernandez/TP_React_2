import { useState } from 'react'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import Favorites from './pages/Favorites/Favorites'
import Error404 from './pages/Error404/Error404'
import { ROUTES } from './const/routes'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


import './App.css'
import Login from './pages/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-indigo-950">

      <BrowserRouter>
          <Routes>
          
          <Route path="/" element={<Navigate to={ROUTES.home} />} />
            <Route element={ <Login/> } path={ROUTES.login} />
            <Route element={ <Home/> } path={ROUTES.home} />
            <Route element={ <Details />} path={ROUTES.details} />
            <Route element={ <Favorites />} path={ROUTES.favorites} /> 
            <Route element={ <Error404/>} path="*" />
          </Routes>

        
        </BrowserRouter>



    </div>
    

    // <Home/>

    
  )
}

export default App
