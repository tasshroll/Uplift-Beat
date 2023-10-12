// Purpose: Provide a form for users to log in to their account
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userFormInfo, setUserFormInfo] = useState({ email: '', password: '' });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormInfo({ ...userFormInfo, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            try {
                const { data } = await login({
                    variables: {
                        ...userFormInfo,
                    }
                });
                if (error) {
                    throw new Error('there was an error logging you in');
                }
                Auth.login(data.login.token);
            } catch (err) {
                console.error(err);
                setShowAlert(true);
            }

            setUserFormInfo({
                username: '',
                email: '',
                password: '',
            });
        };
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='flex-column'>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your login credentials!
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

export default LoginForm;
