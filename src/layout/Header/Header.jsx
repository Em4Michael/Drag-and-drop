import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Menu from '../../Assests/images/Menu alt 4.png';
import Logout from '../../Assests/images/Menu alt 4.png';
import Tv from '../../Assests/images/tv.png';
import { useAuth } from '../../lib/AuthContext';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoggedIn, logout } = useAuth(); // Access isLoggedIn and logout from AuthContext
  const [images, setImages] = useState([]); // State to hold images from local storage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavDark, setIsNavDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredImages = images.filter((image) =>
  image.nameTag.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};
  useEffect(() => {
    // Load images from local storage on component mount
    try {
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
      setImages(savedImages);
    } catch (err) {
      console.error('Error loading images:', err);
    }
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    logout(); // Call logout to update the authentication status
    // Refresh the page after logout
    window.location.reload();
  };

  return (
    <>
      <nav className={`nav ${isNavDark ? 'dark' : ''}`}>
        <div className='Header-container'>
          <div className="Left-side">
            <Link to='/'> <div className='logo-container-Home'> <img src={Tv} alt="Logo" className="tv-logo-Home" /> <span className="logo-name-Home">Imager </span> </div> </Link>
          </div>
          <div className="Middle-side">
            <input
              type="text"
              placeholder="Search Image by Name"
              value={searchQuery}
              className="input"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="inputModal">
                {filteredImages.map((image, index) => (
            <div
              className="image-gallery-item"
            >
              <img src={image.imageUrl} alt={`Image ${index}`} />
              <div className="name-tag">{image.nameTag}</div>

            </div>

          ))}
              </div>
            )}
          </div>
          <div className="Right-side">
            {isLoggedIn ? ( // Display "Logout" when authenticated
              <div className="SignIn" onClick={handleLogout}>Logout</div>
            ) : (
              <Link to='/login'> <div className="SignIn">Login</div> </Link>
            )}
            <Link to='/Login'> <div className="Menu"><img src={Menu} alt="Menu" className="MenuIcon" /></div> </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
