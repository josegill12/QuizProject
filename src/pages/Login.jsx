import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Get the values from your form inputs
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      // Send a POST request to your login API endpoint
      const response = await axios.post('https://localhost:8000/api/login', {
        username, // or email
        password,
      });

      // If login is successful, redirect to the profile page.
     
    } catch (error) {
      // Handle errors here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.message || 'Login failed!');
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        alert('No response from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        alert('Login request failed.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;