import React, {useState, useEffect}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const authToken = localStorage.getItem('authToken');
  let authHeader = {
    headers: {
      'Authorization': `Token ${authToken}`,
    }
  };
  console.log('authToken:', authToken)
  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/users/', authHeader);
        console.log('response', response.data);
        setUser(response.data);
        setEmail(response.data.email);
        setLoading(false);
      } catch (error) {
        // handle error here, e.g., setting an error message in state
        console.error('There was an error fetching the user data:', error);
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

const handleEmailChange = (event) => {
  setEmail(event.target.value);
};




const handleLogout = () => {
  localStorage.removeItem('authToken');
  axios.defaults.headers.common['Authorization'] = null;
 navigate('/');


};


const handleUpdateUser = async (event) => {
  event.preventDefault(); // Prevent default form submission
  console.log('authHeader', authHeader)
  try {
    const response = await axios.put('http://localhost:8000/users/', {
      email: email,
    }, authHeader);
    setUser(response.data);
    alert('User updated successfully!');
  } catch (error) {
    console.error('There was an error updating the user data:', error);
  }
};

const handleDeleteUser = async () => {
  try {
    await axios.delete('http://localhost:8000/users/', authHeader);
    setUser(null);
  } catch (error) {
    console.error('There was an error deleting the user:', error);
  }
};

if (loading) {
  return <p></p>;
}

return (
      <div>
        <h1>User Profile</h1>
        <form onSubmit={handleUpdateUser}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <button type="submit">Save Changes</button>
        </form>
        <button onClick={handleLogout}>Log Out</button>
        <button onClick={handleDeleteUser}>Delete Account</button>
      </div>
      )};

export default UserProfile;

