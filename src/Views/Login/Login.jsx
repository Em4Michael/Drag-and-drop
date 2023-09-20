import React, { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="login-label">Email/Username:</label>
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
            <input
              className="login-input"
              type="text"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          ) : (
            <input
              className="login-input"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          )}
          <button
            type="button"
            className="show-password-button"
            onClick={toggleShowPassword}
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
        </div>
        <button type="submit">Login</button>
        {error && <div className="error-container">
          <p> {error}</p>
        </div>}
      </form>
    </div>
  );
}

export default LoginPage;
