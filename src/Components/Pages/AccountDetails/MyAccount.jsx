import React from 'react';
import { Container, Card, CardBody, Row, Col, Button } from 'reactstrap';
import Navbar from '../../Common/NavBar/Navbar';

const MyAccount = () => {
  // Example user data (replace with dynamic data later)
  const user = {
    name: 'Ann Alex',
    email: 'annalex123@gmail.com',
    company: 'CBL',
    location: 'Ratnapura',
  };

  const handleDelete = () => {
    // Delete logic here
    alert('Delete Account clicked');
  };

  const handleLogout = () => {
    // Logout logic here
    alert('Logged out');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Navbar />

      <Container className="mt-5 d-flex justify-content-center">
        <Card
          className="shadow"
          style={{
            backgroundColor: '#D2EFF7',
            width: '80%',
            maxWidth: '800px',
            padding: '30px',
            borderRadius: '10px',
            color: '#292F63',
          }}
        >
          <CardBody>
            <h2 className="text-center mb-5">My Account</h2>
            <hr className="mb-5" />

            <Row className="mb-4">
              <Col md={4}><strong>Name:</strong></Col>
              <Col md={8}>{user.name}</Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}><strong>Email:</strong></Col>
              <Col md={8}>{user.email}</Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}><strong>Company:</strong></Col>
              <Col md={8}>{user.company}</Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}><strong>Location:</strong></Col>
              <Col md={8}>{user.location}</Col>
            </Row>

            <div className="d-flex justify-content-center gap-4 mt-4">
              <Button color="primary" onClick={handleDelete}>
                Delete Account
              </Button>
              <Button color="primary" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default MyAccount;
