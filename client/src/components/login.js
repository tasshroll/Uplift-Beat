import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm = () => {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            try {
                const response = await loginUser(loginInfo);
      
                if (!response.ok) {
                  throw new Error('there was an error logging you in');
                }
      
                const { token, user } = await response.json();
                console.log(user);
                Auth.login(token);

                setLoginInfo({ email: '', password: '' });
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
              Something went wrong with your login credentials!
            </Alert>
            {/* Form elements... */}
            <Button
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
            </Button>
          </Form>
        </>
    );
};

export default LoginForm;
