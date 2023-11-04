import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
// State for login and signup forms
const [isLogin, setIsLogin] = useState(true);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const [email, setEmail] = useState('');

// Handle change in forms fields
const handleUsernameChange = (event) => {
  setUsername(event.target.value);
};

const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};

const handleEmailChange = (event) => {
  setEmail(event.target.value);
};

const handleSubmit = async (event) => {
  event.preventDefault();
 
  const endpoint = isLogin ? 'http://localhost:8000/token/login/' : 'http://localhost:8000/users/';
  const data = isLogin ? {email:username, password } : { username, password, re_password:password, email };
 
  try {
    const response = await axios.post(endpoint, data);
    const token = response.data;
 
    localStorage.setItem('authToken', token);
 
    // Include the JWT in the Authorization header for subsequent requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
 
    console.log('Success:', token);
    navigate('/profile');
  } catch (error) {
    console.error('Error during form submission', error);
  }
 };

const toggleLoginSignup = () => {
  setIsLogin(!isLogin);
};

return (
    <div>
      <h1>Coding Quizzes</h1>
      {isLogin ? (//Login Form
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={handleUsernameChange}/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}/>
        <button type="submit">Login</button>
        <button type="button" onClick={toggleLoginSignup}>Need an Account? Sign Up</button>
      </form>
) : (
  //Signup Form
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={handleUsernameChange}/>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={handleEmailChange}/>
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={handlePasswordChange}/>
    <button type="submit">Sign Up</button>
    <button type="button" onClick={toggleLoginSignup}>Already have an account? Login</button>
  </form>
      )}
    </div>
  );
};

export default HomePage