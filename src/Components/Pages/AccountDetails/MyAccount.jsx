import React from 'react';
import Navbar from '../../Common/NavBar/Navbar';


import { Container, Card, CardBody } from 'reactstrap';

const MyAccount = () => {
  return (
    <div>
      <Navbar />

      <Container className="mt-5">
  <Card
    className="shadow"
    style={{ backgroundColor: '#dcf1f2' }}
  >
    <CardBody>
      <h2>My Account</h2>
      <hr />
      <p><strong>Name:</strong> John Doe</p>
      <p><strong>Email:</strong> johndoe@example.com</p>
      <p><strong>Company:</strong> ABC Corp</p>
      <p><strong>Location:</strong> New York</p>
    </CardBody>
  </Card>
</Container>

    </div>
  );
};

export default MyAccount;
