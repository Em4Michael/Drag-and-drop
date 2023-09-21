import React from 'react'
import Home from './Views/Home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login/Login';
import { AuthProvider } from './lib/AuthContext'
import ImageDisplay from './Views/ImageDisplay/ImageDisplay';

function App() {
  return (
    <AuthProvider>
    <Router>

      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} /> 
          <Route path="/images/:imageId" element={<ImageDisplay />} />
        </Routes>
      </>
    </Router>
    </AuthProvider>
  )
}

export default App
