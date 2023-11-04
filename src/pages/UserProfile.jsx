import React, {useState, useEffect}from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  const authHeader = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/users', authHeader);
        setUser(response.data);
        setEmail(response.data.email);
      } catch (error) {
        // handle error here, e.g., setting an error message in state
        console.error('There was an error fetching the user data:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

const handleEmailChange = (event) => {
  setEmail(event.target.value);
};

const handleUpdateUser = async (event) => {
  event.preventDefault(); // Prevent default form submission
  try {
    const response = await axios.put('http://localhost:8000/users', {
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
    await axios.delete('http://localhost:8000/users', authHeader);
    setUser(null);
  } catch (error) {
    console.error('There was an error deleting the user:', error);
  }
};

if (loading) {
  return <p>Loading...</p>;
}

return (
  <div>
    {user ? (
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
        <img src={user.avatar} alt="Avatar" />
        <button onClick={handleDeleteUser}>Delete Account</button>
      </div>
    ) : (
      <p>No user data found.</p>
    )}
  </div>
);
};

export default UserProfile;

