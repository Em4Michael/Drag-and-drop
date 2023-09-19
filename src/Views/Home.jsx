import React from 'react'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'
import ImageCard from '../components/ImageCard/ImageCard'
import './Home.css'
function Home() {
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
