import React, { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    try {
      // Implement your login logic here (e.g., sending a request to a server)
      // For demonstration purposes, let's check hardcoded values with case-insensitive email matching.
      if (email.toLowerCase() === 'user@example.com' && password === '1Password') {
        login();
        navigate('/');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <h1>Login Page</h1>
        <div className='field-container'>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="login-label">Email:</label>
              <input
                className="login-input"
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="login-label">Password:</label>
              {showPassword ? (
                <div className='Password-field'>
                  <input
                    className="login-input"
                    type="text"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                  />
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="toggle-password-icon"
                    onClick={toggleShowPassword}
                  />
                </div>
              ) : (
                <div className='Password-field'>
                  <input
                    className="login-input"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    className="toggle-password-icon"
                    onClick={toggleShowPassword}
                  />
                </div>
              )}
            </div>
            <button type="submit">Login</button>
            {error && <div className="error">
              <p> {error}</p>
            </div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
