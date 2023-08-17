
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './signup';
import LoginForm from './login';

import Auth from '../utils/auth';
const styles = {
  navLink: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinkWrapper: {
    marginRight: '50px',
  },
}

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  return (
    <>
      <Navbar bg='light' variant='light' expand='lg'>
        <Container fluid>
          {/* Brand */}
          <Navbar.Brand style={styles.navLink} as={Link} to='/'>
            Motivational News
          </Navbar.Brand>
          {/* Hamburger Menu Icon */}
          <Navbar.Toggle aria-controls='navbar' />

          {/* Navbar Content */}
          <Navbar.Collapse id='navbar' className='justify-content-end'>
            <Nav>
              {Auth.loggedIn() && location.pathname === '/saved' && (
                <Nav.Link style={styles.navLink} as={Link} to='/'>
                  Articles
                </Nav.Link>
              )}
              {Auth.loggedIn() ? (
                <>
                  <div>
                    <Nav.Link style={styles.navLink} as={Link} to='/saved'>
                      See Your Saved Articles
                    </Nav.Link>
                  </div>
                  <div style={styles.navLinkWrapper}>
                    {/* This will create space */}
                  </div>
                  <div>
                    <Nav.Link style={styles.navLink} onClick={Auth.logout}>Logout</Nav.Link>
                  </div>
                </>
              ) : (
                <Nav.Link
                  style={styles.navLink}
                  onClick={() => setShowModal(true)}
                >
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
      >
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
