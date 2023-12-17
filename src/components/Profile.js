// src/components/Profile.js
// import React, { useState } from 'react';
import React, { useState } from 'react';

const Profile = ({ userData }) => {
  const [name, setName] = useState(userData.profile.name);

  const handleNameChange = async () => {
    try {
      const response = await fetch('http://localhost:5000/update-profile', {
        method: 'POST',
        credentials: 'include', // Include credentials (cookies) in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleNameChange}>Update Name</button>
      </div>
      {/* ... rest of the profile information */}
    </div>
  );
};

export default Profile;
