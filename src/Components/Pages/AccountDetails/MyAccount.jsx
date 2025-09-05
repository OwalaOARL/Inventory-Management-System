import React, { useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';


const MyAccount = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const user = {
    name: 'Ann Alex',
    email: 'annalex123@gmail.com',
    company: 'CBL',
    location: 'Ratnapura',
  };

  const toggleLogoutModal = () => setLogoutModal(!logoutModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const confirmLogout = () => {
    setLogoutModal(false);
    console.log('User logged out'); // Replace with real logout logic
  };

  const confirmDelete = () => {
    setDeleteModal(false);
    console.log('Account deleted'); // Replace with real delete logic
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      

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
              <Button color="danger" onClick={toggleDeleteModal}>
                Delete Account
              </Button>
              <Button
  onClick={toggleLogoutModal}
  style={{ backgroundColor: "rgb(89, 89, 242)", borderColor: "rgb(89, 89, 242)" }}
  className="text-white hover:opacity-90 transition"
>
  Log out
</Button>

            </div>
          </CardBody>
        </Card>
      </Container>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={logoutModal} toggle={toggleLogoutModal} centered>
        <ModalHeader toggle={toggleLogoutModal} style={{ backgroundColor: '#ffffff' }}>
          Confirm Logout
        </ModalHeader>
        <ModalBody style={{ backgroundColor: '#ffffff' }}>
          Are you sure you want to log out?
        </ModalBody>
        <ModalFooter style={{ backgroundColor: '#ffffff' }}>
          <Button color="secondary" onClick={toggleLogoutModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={confirmLogout}>
            Yes, Log Out
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Account Confirmation Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal} centered>
        <ModalHeader toggle={toggleDeleteModal} style={{ backgroundColor: '#ffffff' }}>
          Confirm Delete
        </ModalHeader>
        <ModalBody style={{ backgroundColor: '#ffffff' }}>
          This action is irreversible. Are you sure you want to delete your account?
        </ModalBody>
        <ModalFooter style={{ backgroundColor: '#ffffff' }}>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
          <Button color="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MyAccount;
