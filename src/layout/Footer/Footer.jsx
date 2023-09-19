import React from 'react'
import fb from '../../Assests/images/fb.png'
import ig from '../../Assests/images/ig.png'
import tw from '../../Assests/images/tw (1).png'
import yt from '../../Assests/images/yt.png'
import "./Footer.css"

function footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer> 
      <div className='icons'>
        <img src={fb} alt="fb" className="fb" />
        <img src={ig} alt="ig" className="ig" />
        <img src={tw} alt="tw" className="tw" />
        <img src={yt} alt="yt" className="yt" />
      </div>
      <div className='botton-nav'>
        <div className='first-botton-nav'>
          <p>Conditions of Use</p>
        </div>
        <div className='second-botton-nav'>
          <p>Privacy & Policy</p>
        </div>
        <div className='third-botton-nav'>
          <p>Press Room</p>
        </div>
      </div>

      <p class="copyright">&copy; {currentYear} MovieBox by Em4Michael</p>
    </footer>
  )
}

export default footer