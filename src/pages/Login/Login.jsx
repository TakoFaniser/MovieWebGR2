import React, { useState, useEffect } from 'react';
import './login.scss';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success | error

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);

    // Tự động ẩn sau 3s
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
      }
      const emailExists = users.find(user => user.email === formData.email);
      if (emailExists) {
        showMessage('Email already exists!', 'error');
        return;
      }
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      showMessage('Sign up successful! Please login.', 'success');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setIsSignup(false);
    } else {
      const userExists = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );
      if (userExists) {
        localStorage.setItem('currentUser', JSON.stringify(userExists));
        showMessage(`Welcome back, ${userExists.fullName}!`, 'success');
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setTimeout (() => {
          window.location.href = '/'; // Redirect to home page after login
        },2000);
      } else {
        showMessage('Invalid email or password!', 'error');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{isSignup ? 'Sign Up' : 'Login'}</h2>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {isSignup && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <button className="login-button" type="submit">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p onClick={() => setIsSignup((prev) => !prev)} className="toggle-link">
          {isSignup
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
