import React, { useState } from 'react';

import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    location: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    console.log('Updated details:', formData);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log('Password change:', formData);
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#292F63',
    backgroundColor: 'transparent', // <== this removes any white
  };

  const inputStyle = {
    border: '1px solid #999',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#292F63',
    backgroundColor: 'white', // optional soft background for inputs
  };


  return (
    <div style={{ backgroundColor: 'White', minHeight: '100vh' }}>
      
      <Container className="mt-5 d-flex justify-content-center">
        <Card
          className="shadow"
          style={{
            backgroundColor: '#D2EFF7',
            width: '80%',
            maxWidth: '850px',
            padding: '30px',
            border: 'none',
            fontFamily: 'Segoe UI, sans-serif',
            color: '#292F63',
          }}
        >
          <CardBody>
            <h2 className="text-center mb-5" style={{ fontWeight: 'bold' }}>
              Settings
            </h2>

            <Form onSubmit={handleUpdateDetails}>
              <Row className="mb-4 align-items-center">
                <Col md={3}>
                  <Label for="name" style={labelStyle}>
                    Name
                  </Label>
                </Col>
                <Col md={9}>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </Col>
              </Row>

              <Row className="mb-4 align-items-center">
                <Col md={3}>
                  <Label for="company" style={labelStyle}>
                    Company
                  </Label>
                </Col>
                <Col md={9}>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </Col>
              </Row>

              <Row className="mb-4 align-items-center">
                <Col md={3}>
                  <Label for="location" style={labelStyle}>
                    Location
                  </Label>
                </Col>
                <Col md={9}>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </Col>
              </Row>

              <div className="text-center mb-5">
                <Button
  type="submit"
  style={{ backgroundColor: "rgb(89, 89, 242)", borderColor: "rgb(89, 89, 242)" }}
  className="text-white hover:opacity-90 transition"
>
  Update Details
</Button>

              </div>
            </Form>

            <hr />

            <Form onSubmit={handleChangePassword}>
              <h5 className="mb-4" style={{ fontWeight: 'bold' }}>
                Change password
              </h5>

              <FormGroup className="mb-4">
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Current password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </FormGroup>

              <FormGroup className="mb-5">
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </FormGroup>

              <div className="text-center">
                <Button
  type="submit"
  style={{ backgroundColor: "rgb(89, 89, 242)", borderColor: "rgb(89, 89, 242)" }}
  className="text-white hover:opacity-90 transition"
>
  Change password
</Button>

              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Settings;
