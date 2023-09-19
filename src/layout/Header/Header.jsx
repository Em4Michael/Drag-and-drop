import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Menu from '../../Assests/images/Menu alt 4.png';
import ImagesApi from '../../services/ImagesApi';
import Tv from '../../Assests/images/tv.png';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { all, top10, loading, error } = ImagesApi(searchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavDark, setIsNavDark] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsNavDark(true);
      } else {
        setIsNavDark(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [all, searchTerm]);



  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    // Check if the input field is empty and reset the search term
    if (inputValue.trim() === '') {
      setSearchTerm('');
      setIsModalOpen(false);
    }
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
              onChange={handleInputChange}
              className="input"
            />
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
            <Link to='#'> <div className="SignIn" > Login </div> </Link>
            <Link to='#'> <div className="Menu" ><img src={Menu} alt="Menu" className="MenuIcon" /></div> </Link>
          </div>
        </div>
      </nav>

    </>
  );
}

export default Header;
