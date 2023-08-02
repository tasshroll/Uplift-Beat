import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        const response = await createUser(userFormData);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const { token, user } = await response.json();
        console.log(user);
        Auth.login(token);

        setUserFormData({
          username: '',
          email: '',
          password: '',
        });

        setValidated(false);
        setShowAlert(false);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        {/* rest of your form components */}
      </Form>
    </>
  );
};

export default SignupForm;
