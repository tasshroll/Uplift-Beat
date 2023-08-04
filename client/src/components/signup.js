import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client'; // ADDED
import { ADD_USER } from '../utils/mutations'; // ADDED
import Auth from '../utils/auth';

const SignupForm = () => {
  const [userFormInfo, setUserFormInfo] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // hook that takes a GraphQL mutation and returns a function "addUser" function and object "data" that contains the data returned from the mutation
  const [addUser, { error, data }] = useMutation(ADD_USER);

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

        // addUser sends the mutation to the GraphQL server and it returns a object with a token and user property
        const { data } = await addUser({
          variables: { ...userFormInfo },
        }); // ADDED
        //  console.log("new user is ", data.addUser);

        Auth.login(data.addUser.token); // ADDED

      } catch (err) {
        console.error(err);
        // setShowAlert(true);
      }

      setUserFormInfo({
        username: '',
        email: '',
        password: '',
      });
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
