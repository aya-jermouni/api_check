// src/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setListOfUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = async (userId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setSelectedUserId(userId);
      setSelectedUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div>
      <h1>List of Users</h1>
      <ul>
        {listOfUsers.map(user => (
          <li key={user.id} onClick={() => handleUserClick(user.id)} className={selectedUserId === user.id ? 'selected' : ''}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUserInfo && (
        <div>
          <h2>User Information</h2>
          <p><strong>Name:</strong> {selectedUserInfo.name}</p>
          <p><strong>Email:</strong> {selectedUserInfo.email}</p>
          <p><strong>Phone:</strong> {selectedUserInfo.phone}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default UserList;
