import React from 'react'
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer'
import ImageCard from '../../components/ImageCard/ImageCard'
import './Home.css'
import { useNavigate } from 'react-router-dom';
function Home() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clear authentication state)
    // After logout, navigate back to the login page
    navigate('/login');
  };


  return (
    <div>
      <Header />
      
      <main>

        <div className='cards-holder'>
          <ImageCard />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
