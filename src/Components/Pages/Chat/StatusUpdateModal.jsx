import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
  Row,
  Col
} from 'reactstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';

const StatusUpdateModal = ({ 
  isOpen, 
  toggle, 
  order, 
  onStatusUpdate,
  currentUser 
}) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [reasonMessage, setReasonMessage] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

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

  // Handle status update with message
  const handleStatusUpdate = async () => {
    if (!selectedStatus) {
      setError('Please select a status');
      return;
    }

    if (!reasonMessage.trim()) {
      setError('Please provide a reason for this status change');
      return;
    }

    if (reasonMessage.trim().length < 10) {
      setError('Reason must be at least 10 characters long');
      return;
    }

    setUpdating(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/chat/orders/${order.ORDER_ID}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          status: selectedStatus,
          message: reasonMessage.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        // Notify parent component
        if (onStatusUpdate) {
          onStatusUpdate();
        }
        
        // Reset form
        setSelectedStatus('');
        setReasonMessage('');
        
        // Close modal
        toggle();
      } else {
        setError(data.message || 'Failed to update order status');
      }
    } catch (error) {
      setError('Network error while updating order status');
    } finally {
      setUpdating(false);
    }
  };

  // Reset form when modal closes
  const handleModalClose = () => {
    setSelectedStatus('');
    setReasonMessage('');
    setError('');
    toggle();
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'REJECTED': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={handleModalClose} size="md">
      <ModalHeader toggle={handleModalClose}>
        Update Order Status - #{order?.ORDER_ID}
      </ModalHeader>
      
      <ModalBody>
        {/* Error Alert */}
        {error && (
          <Alert color="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Row>
          <Col>
            {/* Order Summary */}
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h6 style={{ margin: '0 0 10px 0', color: '#292F63' }}>Order Summary</h6>
              <div><strong>Product:</strong> {order?.PRODUCT_NAME}</div>
              <div><strong>Quantity:</strong> {order?.QUANTITY}</div>
              <div><strong>Company:</strong> {order?.COMPANY_NAME}</div>
              <div><strong>Current Status:</strong> 
                <span style={{
                  marginLeft: '8px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: order?.STATUS === 'PENDING' ? '#ffc107' : '#6c757d',
                  color: 'white',
                  fontSize: '12px'
                }}>
                  {order?.STATUS}
                </span>
              </div>
            </div>

            {/* Status Selection */}
            <FormGroup>
              <Label for="statusSelect">
                <strong>New Status *</strong>
              </Label>
              <Input
                type="select"
                id="statusSelect"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                disabled={updating}
              >
                <option value="">Select new status...</option>
                <option value="COMPLETED">✅ Complete Order</option>
                <option value="REJECTED">❌ Reject Order</option>
              </Input>
            </FormGroup>

            {/* Reason Message */}
            <FormGroup>
              <Label for="reasonMessage">
                <strong>
                  {selectedStatus === 'COMPLETED' ? 'Completion Reason' : 
                   selectedStatus === 'REJECTED' ? 'Rejection Reason' : 'Reason'} *
                </strong>
              </Label>
              <Input
                type="textarea"
                id="reasonMessage"
                rows="4"
                value={reasonMessage}
                onChange={(e) => setReasonMessage(e.target.value)}
                placeholder={
                  selectedStatus === 'COMPLETED' 
                    ? "Explain how the order was completed successfully..." 
                    : selectedStatus === 'REJECTED'
                    ? "Explain why the order couldn't be completed..."
                    : "Provide details about this status change..."
                }
                disabled={updating}
                maxLength={1000}
              />
              <small className="text-muted">
                {reasonMessage.length}/1000 characters (minimum 10 required)
              </small>
            </FormGroup>

            {/* Preview Message */}
            {selectedStatus && reasonMessage.trim().length >= 10 && (
              <div style={{
                backgroundColor: '#e7f3ff',
                border: '1px solid #b8daff',
                borderRadius: '8px',
                padding: '12px',
                marginTop: '15px'
              }}>
                <div style={{ fontSize: '12px', color: '#0066cc', marginBottom: '8px' }}>
                  <strong>Message Preview:</strong>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '8px 12px',
                  borderRadius: '18px',
                  border: '1px solid #dee2e6',
                  fontSize: '14px'
                }}>
                  {reasonMessage.trim()}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </ModalBody>
      
      <ModalFooter>
        {selectedStatus && (
          <Button
            color={getStatusColor(selectedStatus)}
            onClick={handleStatusUpdate}
            disabled={updating || !reasonMessage.trim() || reasonMessage.trim().length < 10}
          >
            {updating ? (
              <>
                <Spinner size="sm" className="me-2" />
                Updating...
              </>
            ) : (
              <>
                {selectedStatus === 'COMPLETED' ? <FaCheck className="me-2" /> : <FaTimes className="me-2" />}
                {selectedStatus === 'COMPLETED' ? 'Complete Order' : 'Reject Order'}
              </>
            )}
          </Button>
        )}
        <Button color="secondary" onClick={handleModalClose} disabled={updating}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default StatusUpdateModal;