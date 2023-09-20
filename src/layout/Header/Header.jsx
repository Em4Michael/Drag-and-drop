import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Menu from '../../Assests/images/Menu alt 4.png';
import ImagesApi from '../../services/ImagesApi';
import Tv from '../../Assests/images/tv.png';
import { useAuth } from '../../lib/AuthContext';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { all, top10, loading, error } = ImagesApi(searchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavDark, setIsNavDark] = useState(false);

  const { isLoggedIn, logout } = useAuth(); // Access isLoggedIn and logout from AuthContext

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
              placeholder="What do you want to watch?"
              value={searchTerm}
              className="input"
            />
            {loading && <p>Loading...</p>} {/* Show loading message */}
            {error && <p>Error: {error.message}</p>} {/* Show error message */}
            {searchTerm && (
              <div className="inputModal">
                {all.map((movie) => (
                  <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <li>
                      <>
                        <img
                          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
                          alt="movie-poster"
                          className="Image-display-search"
                        />
                        <div className='movie-name-search'>{movie.title}</div>
                        <div className='movie-release-date'>{movie.release_date}</div>
                      </>
                    </li>
                  </Link>
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
            <Link to='#'> <div className="Menu"><img src={Menu} alt="Menu" className="MenuIcon" /></div> </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
