import React from 'react'
import Home from './Views/Home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login/Login';
import { AuthProvider } from './lib/AuthContext'

function App() {
  return (
    <AuthProvider>
    <Router>

      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} /> 
        </Routes>
      </>
    </Router>
    </AuthProvider>
  )
}

export default App
