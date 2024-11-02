import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPanel = () => {
  const [services, setServices] = useState({});
  const [message, setMessage] = useState('');
  const [extraEmail, setExtraEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    // Fetch user services from the backend
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/subscriptions', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { username: 'testuser' } // Replace with dynamic username
        });
        setServices(response.data);
      } catch (error) {
        setMessage('Failed to fetch services');
      }
    };
    fetchServices();
  }, []);

  const handleServiceToggle = async (service) => {
    try {
      const updatedServices = { ...services, [service]: services[service] ? 0 : 1 };
      await axios.post('http://localhost:3000/api/auth/cancel-subscription', {
        username: 'testuser', // Replace with dynamic username
        service
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setServices(updatedServices);
      setMessage('Service updated successfully');
    } catch (error) {
      setMessage('Failed to update service');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/change-password', {
        username: 'testuser', // Replace with dynamic username
        oldPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Password updated successfully');
    } catch (error) {
      setMessage('Failed to update password');
    }
  };

  const handleAddEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/add-email', {
        username: 'testuser', // Replace with dynamic username
        email: extraEmail
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Extra email added successfully');
    } catch (error) {
      setMessage('Failed to add extra email');
    }
  };

  return (
    <div>
      <h2>User Panel</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Old Password:</label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button type="submit">Change Password</button>
      </form>
      <form onSubmit={handleAddEmail}>
        <div>
          <label>Extra Email:</label>
          <input type="email" value={extraEmail} onChange={(e) => setExtraEmail(e.target.value)} />
        </div>
        <button type="submit">Add Email</button>
      </form>
      <h3>Subscriptions</h3>
      {Object.keys(services).map((service) => (
        <div key={service}>
          <label>{service}</label>
          <input
            type="checkbox"
            checked={services[service]}
            onChange={() => handleServiceToggle(service)}
          />
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserPanel;