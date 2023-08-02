import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const SignupForm = () => {
  const [userFormInfo, setUserFormInfo] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormInfo({ ...userFormInfo, [name]: value });
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
        const response = await createUser(userFormInfo);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const { token, user } = await response.json();
        console.log(user);
        Auth.login(token);

        setUserFormInfo({
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
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup credentials!
        </Alert>

        <Form.Group>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
                type='text'
                placeholder='Your email'
                name='email'
                onChange={handleInputChange}
                value={userFormInfo.email}
                required
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='Your password'
                name='password'
                onChange={handleInputChange}
                value={userFormInfo.password}
                required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
            disabled={!(userFormInfo.email && userFormInfo.password)}
            type='submit'
            variant='success'>
            Submit
        </Button>

      </Form>
    </>
);
};

export default SignupForm;
