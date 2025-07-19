import React from 'react';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';
import Navbar from '../../Common/NavBar/Navbar';

const AgentDetails = () => {
  // Example agent details (can be dynamic later)
  const agent = {
    name: 'John Alex',
    company: 'Munchee',
    location: 'Colombo',
    contact: '+94 712345678',
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
            <h2 className="text-center mb-5">Agent Details</h2>
            <hr className="mb-5" />

            <Row className="mb-4">
              <Col md={4}><strong>Name:</strong></Col>
              <Col md={8}>{agent.name}</Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}><strong>Company:</strong></Col>
              <Col md={8}>{agent.company}</Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}><strong>Location:</strong></Col>
              <Col md={8}>{agent.location}</Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}><strong>Contact:</strong></Col>
              <Col md={8}>{agent.contact}</Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default AgentDetails;
