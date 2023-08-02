import React, { useState } from 'react';

const signupForm = () => {
    const signupInfo = useState({ username: '', password: '' });
};

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
};

const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setUserFormData({
      username: '',
      password: '',
    });
};