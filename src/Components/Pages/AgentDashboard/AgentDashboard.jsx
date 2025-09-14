import React, { useState, useEffect } from 'react';
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Badge,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Row,
  Col
} from 'reactstrap';
import { FaClipboardList, FaCheckCircle, FaTimesCircle, FaClock, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import DataTable from '../../Common/DataTable/DataTable';

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [orders, setOrders] = useState({
    pending: [],
    completed: [],
    rejected: []
  });
  const [loading, setLoading] = useState({
    pending: false,
    completed: false,
    rejected: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

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

  // Load orders by status
  const loadOrdersByStatus = async (status) => {
    setLoading(prev => ({ ...prev, [status.toLowerCase()]: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/orders/status/${status}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setOrders(prev => ({
          ...prev,
          [status.toLowerCase()]: data.data
        }));
      } else {
        setError(`Failed to load ${status.toLowerCase()} orders`);
      }
    } catch (error) {
      setError(`Network error while loading ${status.toLowerCase()} orders`);
    } finally {
      setLoading(prev => ({ ...prev, [status.toLowerCase()]: false }));
    }
  };

  // Refresh all orders
  const refreshAllOrders = () => {
    loadOrdersByStatus('PENDING');
    loadOrdersByStatus('COMPLETED');
    loadOrdersByStatus('REJECTED');
  };

  // Load all orders on component mount
  useEffect(() => {
    refreshAllOrders();
  }, []);

  // Handle tab change
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Handle order view
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  // Handle order status update
  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    setActionLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Order #${orderId} has been ${newStatus.toLowerCase()} successfully!`);
        setShowOrderModal(false);
        setSelectedOrder(null);
        refreshAllOrders(); // Refresh all orders to reflect changes
      } else {
        setError(data.message || `Failed to ${newStatus.toLowerCase()} order`);
      }
    } catch (error) {
      setError(`Network error while updating order status`);
    } finally {
      setActionLoading(false);
    }
  };

  // Define table columns for agent view
  const getAgentTableColumns = () => [
    {
      title: 'Order ID',
      key: 'ORDER_ID',
      width: '80px',
      align: 'center',
      render: (value) => `#${value}`
    },
    {
      title: 'Product Details',
      key: 'PRODUCT_NAME',
      width: '250px',
      render: (value, row) => (
        <div>
          <div style={{ fontWeight: '600', color: '#292F63' }}>{value}</div>
          <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '2px' }}>
            Category: {row.PRODUCT_CATEGORY}
          </div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            Company: {row.PRODUCT_COMPANY}
          </div>
        </div>
      )
    },
    {
      title: 'Quantity',
      key: 'QUANTITY',
      width: '80px',
      align: 'center',
      render: (value) => (
        <Badge color="primary" pill style={{ fontSize: '12px' }}>{value}</Badge>
      )
    },
    {
      title: 'Unit Price',
      key: 'UNIT_PRICE',
      width: '100px',
      align: 'right',
      render: (value) => {
        const price = parseFloat(value) || 0;
        return `$${price.toFixed(2)}`;
      }
    },
    {
      title: 'Total Value',
      key: 'total_value',
      width: '110px',
      align: 'right',
      render: (value, row) => {
        const total = (parseFloat(row.UNIT_PRICE) || 0) * (parseInt(row.QUANTITY) || 0);
        return (
          <strong style={{ color: '#28a745', fontSize: '13px' }}>
            ${total.toFixed(2)}
          </strong>
        );
      }
    },
    {
      title: 'Required Date',
      key: 'REQUIRED_DATE',
      width: '120px',
      render: (value) => value ? (
        <div style={{ fontSize: '12px' }}>
          {new Date(value).toLocaleDateString('en-US', {
            year: '2-digit',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      ) : '-'
    },
    {
      title: 'Requested By',
      key: 'COMPANY_NAME',
      width: '150px',
      render: (value) => (
        <div style={{ fontSize: '12px', color: '#292F63', fontWeight: '500' }}>
          {value}
        </div>
      )
    },
    {
      title: 'Order Date',
      key: 'CREATED_DATE',
      width: '120px',
      render: (value) => (
        <div style={{ fontSize: '12px' }}>
          {new Date(value).toLocaleDateString('en-US', {
            year: '2-digit',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      )
    }
  ];

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

  // Get tab info
  const getTabInfo = (tabName) => {
    switch (tabName) {
      case 'pending':
        return { icon: FaClock, color: '#ffc107', label: 'Pending Orders' };
      case 'completed':
        return { icon: FaCheckCircle, color: '#28a745', label: 'Completed Orders' };
      case 'rejected':
        return { icon: FaTimesCircle, color: '#dc3545', label: 'Rejected Orders' };
      default:
        return { icon: FaClipboardList, color: '#6c757d', label: 'Orders' };
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <Container fluid>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaClipboardList size={24} style={{ color: '#292F63', marginRight: '10px' }} />
              <div>
                <h2 style={{ margin: 0, color: '#292F63', fontWeight: 'bold' }}>
                  Agent Dashboard
                </h2>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
                  View and manage order requests assigned to you
                </p>
              </div>
            </div>
            <Button
              color="primary"
              onClick={refreshAllOrders}
              style={{ fontWeight: '500' }}
            >
              Refresh Orders
            </Button>
          </div>
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

        {/* Tabs Navigation */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <Nav tabs style={{ borderBottom: 'none', margin: 0 }}>
            {['pending', 'completed', 'rejected'].map((tab) => {
              const tabInfo = getTabInfo(tab);
              const IconComponent = tabInfo.icon;
              const isActive = activeTab === tab;
              const orderCount = orders[tab].length;

              return (
                <NavItem key={tab}>
                  <NavLink
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      borderBottom: isActive ? `3px solid ${tabInfo.color}` : '3px solid transparent',
                      backgroundColor: isActive ? '#f8f9fa' : 'transparent',
                      color: isActive ? tabInfo.color : '#6c757d',
                      fontWeight: isActive ? '600' : '400',
                      padding: '15px 20px',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => toggleTab(tab)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IconComponent size={16} />
                      <span>{tabInfo.label}</span>
                      <Badge 
                        color={isActive ? 'primary' : 'secondary'} 
                        pill
                        style={{ 
                          backgroundColor: isActive ? tabInfo.color : '#6c757d',
                          fontSize: '11px'
                        }}
                      >
                        {orderCount}
                      </Badge>
                    </div>
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>

          {/* Tab Content */}
          <TabContent activeTab={activeTab}>
            {['pending', 'completed', 'rejected'].map((tab) => (
              <TabPane tabId={tab} key={tab}>
                <div style={{ padding: '20px' }}>
                  <DataTable
                    data={orders[tab]}
                    columns={getAgentTableColumns()}
                    loading={loading[tab]}
                    searchPlaceholder={`Search ${tab} orders...`}
                    onView={handleViewOrder}
                    emptyMessage={`No ${tab} orders found`}
                    tableHeight="500px"
                  />
                </div>
              </TabPane>
            ))}
          </TabContent>
        </div>

        {/* Order Summary Cards */}
        <div style={{
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {['pending', 'completed', 'rejected'].map((status) => {
            const tabInfo = getTabInfo(status);
            const IconComponent = tabInfo.icon;
            const count = orders[status].length;
            const totalValue = orders[status].reduce((sum, order) => {
              return sum + ((parseFloat(order.UNIT_PRICE) || 0) * (parseInt(order.QUANTITY) || 0));
            }, 0);

            return (
              <div
                key={status}
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  border: `2px solid ${tabInfo.color}20`
                }}
              >
                <IconComponent 
                  size={32} 
                  style={{ color: tabInfo.color, marginBottom: '10px' }} 
                />
                <h3 style={{ 
                  margin: '0 0 5px 0', 
                  color: tabInfo.color, 
                  fontSize: '28px' 
                }}>
                  {count}
                </h3>
                <p style={{ 
                  margin: '0 0 10px 0', 
                  color: '#6c757d', 
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}>
                  {tabInfo.label}
                </p>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#28a745', 
                  fontWeight: 'bold'
                }}>
                  Total: ${totalValue.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Details Modal */}
        <Modal 
          isOpen={showOrderModal} 
          toggle={() => setShowOrderModal(false)}
          size="lg"
        >
          <ModalHeader toggle={() => setShowOrderModal(false)}>
            Order Details - #{selectedOrder?.ORDER_ID}
          </ModalHeader>
          <ModalBody>
            {selectedOrder && (
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: '#292F63' }}>Product Information:</strong>
                        <div style={{ marginTop: '5px' }}>
                          <div><strong>Name:</strong> {selectedOrder.PRODUCT_NAME}</div>
                          <div><strong>Category:</strong> {selectedOrder.PRODUCT_CATEGORY}</div>
                          <div><strong>Company:</strong> {selectedOrder.PRODUCT_COMPANY}</div>
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: '#292F63' }}>Order Details:</strong>
                        <div style={{ marginTop: '5px' }}>
                          <div><strong>Quantity:</strong> {selectedOrder.QUANTITY}</div>
                          <div><strong>Unit Price:</strong> {parseFloat(selectedOrder.UNIT_PRICE || 0).toFixed(2)}</div>
                          <div><strong>Total Value:</strong> {((parseFloat(selectedOrder.UNIT_PRICE) || 0) * (parseInt(selectedOrder.QUANTITY) || 0)).toFixed(2)}</div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: '#292F63' }}>Request Information:</strong>
                        <div style={{ marginTop: '5px' }}>
                          <div><strong>Requested By:</strong> {selectedOrder.COMPANY_NAME}</div>
                          <div><strong>Required Date:</strong> {selectedOrder.REQUIRED_DATE ? new Date(selectedOrder.REQUIRED_DATE).toLocaleDateString() : 'N/A'}</div>
                          <div><strong>Status:</strong> 
                            <Badge 
                              color={selectedOrder.STATUS === 'PENDING' ? 'warning' : selectedOrder.STATUS === 'COMPLETED' ? 'success' : 'danger'}
                              style={{ marginLeft: '5px' }}
                            >
                              {selectedOrder.STATUS}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: '#292F63' }}>Dates:</strong>
                        <div style={{ marginTop: '5px' }}>
                          <div><strong>Created:</strong> {new Date(selectedOrder.CREATED_DATE).toLocaleString()}</div>
                          {selectedOrder.UPDATED_DATE && (
                            <div><strong>Updated:</strong> {new Date(selectedOrder.UPDATED_DATE).toLocaleString()}</div>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col>
                      <div style={{ marginTop: '15px' }}>
                        <strong style={{ color: '#292F63' }}>Description:</strong>
                        <div style={{ 
                          marginTop: '5px', 
                          padding: '10px', 
                          backgroundColor: '#f8f9fa', 
                          borderRadius: '5px' 
                        }}>
                          {selectedOrder.DESCRIPTION}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            )}
          </ModalBody>
          <ModalFooter>
            {selectedOrder?.STATUS === 'PENDING' && (
              <>
                <Button
                  color="success"
                  onClick={() => handleOrderStatusUpdate(selectedOrder.ORDER_ID, 'COMPLETED')}
                  disabled={actionLoading}
                >
                  {actionLoading ? <Spinner size="sm" /> : <FaCheck />} Complete Order
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleOrderStatusUpdate(selectedOrder.ORDER_ID, 'REJECTED')}
                  disabled={actionLoading}
                >
                  {actionLoading ? <Spinner size="sm" /> : <FaTimes />} Reject Order
                </Button>
              </>
            )}
            <Button color="secondary" onClick={() => setShowOrderModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default AgentDashboard;