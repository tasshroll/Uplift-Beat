import React, { useState } from 'react';

const loginForm = () => {
    const loginInfo = useState({ username: '', password: '' });
    const validated = useState(false);
    const loginAlert = useState(false);
};

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...loginInfo, [name]: value });
};

const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
        const response = await loginUser(loginInfo);
  
        if (!response.ok) {
          throw new Error('there was an error logging you in');
        }
  
        const { token, user } = await response.json();
        console.log(user);
        Auth.login(token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }

    setUserFormData({
      username: '',
      password: '',
    });
};