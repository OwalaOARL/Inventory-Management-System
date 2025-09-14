import React, { useState, useEffect } from 'react';
import {
  Container,
  Input,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Alert,
  Badge,
  Spinner,
  Row,
  Col
} from 'reactstrap';
import { FaUserCircle, FaSearch, FaPlus, FaEdit, FaTrash, FaKey, FaBuilding, FaPhone, FaUser, FaMapMarkerAlt } from 'react-icons/fa';

const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    fullName: '',
    contactNumber: '',
    companyName: '',
    companyAddress: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Load agents from backend
  const loadAgents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/agents`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setAgents(data.data);
      } else {
        setError('Failed to load agents');
      }
    } catch (error) {
      setError('Network error while loading agents');
    } finally {
      setLoading(false);
    }
  };

  // Load agents on component mount
  useEffect(() => {
    loadAgents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create new agent
  const handleCreateAgent = async () => {
    setError('');
    setSuccess('');

    // Validation
    if (!formData.email || !formData.username || !formData.password || !formData.fullName) {
      setError('Email, username, password, and full name are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Contact number validation (if provided)
    if (formData.contactNumber && !/^[\+]?[\d\s\-\(\)]{10,15}$/.test(formData.contactNumber)) {
      setError('Please enter a valid contact number');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/agents`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Agent created successfully!');
        setFormData({ 
          email: '', 
          username: '', 
          password: '', 
          fullName: '', 
          contactNumber: '', 
          companyName: '',
          companyAddress: ''
        });
        setShowAddModal(false);
        loadAgents(); // Refresh the list
      } else {
        setError(data.message || 'Failed to create agent');
      }
    } catch (error) {
      setError('Network error while creating agent');
    }
  };

  // Update agent status
  const handleStatusChange = async (agentId, action) => {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}/${action}`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Agent ${action}d successfully!`);
        loadAgents(); // Refresh the list
      } else {
        setError(data.message || `Failed to ${action} agent`);
      }
    } catch (error) {
      setError(`Network error while ${action}ing agent`);
    }
  };

  // Reset password
  const handleResetPassword = async (agentId) => {
    const newPassword = prompt('Enter new password (minimum 6 characters):');
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}/password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ newPassword })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Password updated successfully!');
      } else {
        setError(data.message || 'Failed to update password');
      }
    } catch (error) {
      setError('Network error while updating password');
    }
  };

  // Filter agents based on search term
  const filteredAgents = agents.filter((agent) =>
    agent.EMAIL?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.USERNAME?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.FULL_NAME?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.COMPANY_NAME?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.COMPANY_ADDRESS?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.CONTACT_NUMBER?.includes(searchTerm)
  );

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#292F63' }}>
      <Container className="mt-5">
        
        {/* Header with Add Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 style={{ color: '#292F63', fontWeight: 'bold', marginBottom: '5px' }}>
              Agent Management
            </h2>
            <p style={{ color: '#6c757d', marginBottom: 0, fontSize: '14px' }}>
              Manage agent accounts with complete business information
            </p>
          </div>
          <Button 
            color="primary" 
            onClick={() => setShowAddModal(true)}
            style={{ backgroundColor: '#292F63', borderColor: '#292F63' }}
          >
            <FaPlus className="me-2" />
            Add New Agent
          </Button>
        </div>

        {/* Messages */}
        {error && (
          <Alert color="danger" className="mb-3">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="success" className="mb-3">
            {success}
          </Alert>
        )}

        {/* Search Bar */}
        <div
          className="d-flex align-items-center mb-4"
          style={{
            border: '2px solid #292F63',
            borderRadius: '50px',
            padding: '8px 20px',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          <FaSearch style={{ color: '#292F63', fontSize: '20px', marginRight: '10px' }} />
          <Input
            type="text"
            placeholder="Search by Name, Email, Company, Address, or Contact"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              color: '#292F63',
            }}
          />
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center my-4">
            <Spinner color="primary" />
            <p className="mt-2">Loading agents...</p>
          </div>
        )}

        {/* Agent Table */}
        {!loading && (
          <div style={{ overflowX: 'auto' }}>
            <Table bordered hover responsive style={{ color: '#292F63', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th style={{ width: '50px', textAlign: 'center' }}><FaUserCircle /></th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Contact</th>
                  <th>Company</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th style={{ width: '150px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      <div style={{ color: '#6c757d' }}>
                        <FaUserCircle size={48} className="mb-3" />
                        <p>No agents found</p>
                        {searchTerm && <p>Try adjusting your search terms</p>}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAgents.map((agent) => (
                    <tr key={agent.USER_ID}>
                      <td style={{ textAlign: 'center' }}>
                        <FaUserCircle size={24} color="#292F63" />
                      </td>
                      <td style={{ fontWeight: '500' }}>
                        {agent.FULL_NAME || '-'}
                      </td>
                      <td>{agent.EMAIL}</td>
                      <td>{agent.USERNAME}</td>
                      <td>
                        {agent.CONTACT_NUMBER ? (
                          <span>
                            <FaPhone size={12} className="me-1" />
                            {agent.CONTACT_NUMBER}
                          </span>
                        ) : '-'}
                      </td>
                      <td>
                        {agent.COMPANY_NAME ? (
                          <span>
                            <FaBuilding size={12} className="me-1" />
                            {agent.COMPANY_NAME}
                          </span>
                        ) : '-'}
                      </td>
                      <td style={{ maxWidth: '200px' }}>
                        {agent.COMPANY_ADDRESS ? (
                          <span>
                            <FaMapMarkerAlt size={12} className="me-1" />
                            <span title={agent.COMPANY_ADDRESS} style={{ cursor: 'help' }}>
                              {agent.COMPANY_ADDRESS.length > 30 
                                ? agent.COMPANY_ADDRESS.substring(0, 30) + '...' 
                                : agent.COMPANY_ADDRESS}
                            </span>
                          </span>
                        ) : '-'}
                      </td>
                      <td>
                        <Badge 
                          color={agent.STATUS === 'ACTIVE' ? 'success' : 'danger'}
                          pill
                        >
                          {agent.STATUS}
                        </Badge>
                      </td>
                      <td style={{ fontSize: '12px' }}>
                        {new Date(agent.CREATED_DATE).toLocaleDateString('en-US', {
                          year: '2-digit',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="d-flex justify-content-center gap-1">
                          {agent.STATUS === 'ACTIVE' ? (
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => handleStatusChange(agent.USER_ID, 'deactivate')}
                              title="Deactivate Agent"
                            >
                              <FaTrash />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              color="success"
                              onClick={() => handleStatusChange(agent.USER_ID, 'activate')}
                              title="Activate Agent"
                            >
                              <FaEdit />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() => handleResetPassword(agent.USER_ID)}
                            title="Reset Password"
                          >
                            <FaKey />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        )}

        {/* Add Agent Modal */}
        <Modal isOpen={showAddModal} toggle={() => setShowAddModal(!showAddModal)} size="lg">
          <ModalHeader toggle={() => setShowAddModal(!showAddModal)}>
            <FaUser className="me-2" />
            Add New Agent
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="fullName">
                    <FaUser className="me-1" />
                    Full Name *
                  </Label>
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email Address *</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="john.doe@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="username">Username *</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="john_doe"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Password *</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="contactNumber">
                    <FaPhone className="me-1" />
                    Contact Number
                  </Label>
                  <Input
                    type="text"
                    name="contactNumber"
                    id="contactNumber"
                    placeholder="+1 234 567 8900"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="companyName">
                    <FaBuilding className="me-1" />
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="ABC Corporation"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="companyAddress">
                    <FaMapMarkerAlt className="me-1" />
                    Company Address
                  </Label>
                  <Input
                    type="textarea"
                    name="companyAddress"
                    id="companyAddress"
                    placeholder="123 Business Street, City, State, ZIP Code"
                    rows="3"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '10px' }}>
              * Required fields
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              onClick={handleCreateAgent}
              style={{ backgroundColor: '#292F63', borderColor: '#292F63' }}
            >
              Create Agent
            </Button>
            <Button color="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

      </Container>
    </div>
  );
};

export default Agent;