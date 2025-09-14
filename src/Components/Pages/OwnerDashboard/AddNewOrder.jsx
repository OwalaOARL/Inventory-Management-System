import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Badge,
  Spinner
} from 'reactstrap';
import { FaPlus, FaTrash, FaCalendarAlt, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import DataTable from '../../Common/DataTable/DataTable';

const AddNewOrder = ({ onClose }) => {
  // Form state
  const [formData, setFormData] = useState({
    category: '',
    company: '',
    productId: '',
    quantity: '',
    requiredDate: '',
    agentId: '',
    description: ''
  });

  // Dropdown data
  const [dropdownData, setDropdownData] = useState({
    categories: [],
    companies: [],
    products: [],
    agents: []
  });

  // Product details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Order list
  const [orderList, setOrderList] = useState([]);

  // UI state
  const [loading, setLoading] = useState({
    categories: false,
    companies: false,
    products: false,
    agents: false,
    submitting: false
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

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
    loadAgents();
  }, []);

  // Load categories
  const loadCategories = async () => {
    setLoading(prev => ({ ...prev, categories: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/orders/dropdown/categories`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setDropdownData(prev => ({ ...prev, categories: data.data }));
      } else {
        setError('Failed to load categories: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  };

  // Load companies by category
  const loadCompanies = async (category) => {
    setLoading(prev => ({ ...prev, companies: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/orders/dropdown/companies/${encodeURIComponent(category)}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setDropdownData(prev => ({ ...prev, companies: data.data, products: [] }));
        setFormData(prev => ({ ...prev, company: '', productId: '', quantity: '' }));
        setSelectedProduct(null);
        setTotalPrice(0);
      } else {
        setError('Failed to load companies: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading companies:', error);
      setError('Failed to load companies');
    } finally {
      setLoading(prev => ({ ...prev, companies: false }));
    }
  };

  // Load products by category and company
  const loadProducts = async (category, company) => {
    setLoading(prev => ({ ...prev, products: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/orders/dropdown/products/${encodeURIComponent(category)}/${encodeURIComponent(company)}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setDropdownData(prev => ({ ...prev, products: data.data }));
        setFormData(prev => ({ ...prev, productId: '', quantity: '' }));
        setSelectedProduct(null);
        setTotalPrice(0);
      } else {
        setError('Failed to load products: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products');
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  };

  // Load agents
  const loadAgents = async () => {
    setLoading(prev => ({ ...prev, agents: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/orders/dropdown/agents`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setDropdownData(prev => ({ ...prev, agents: data.data }));
      } else {
        setError('Failed to load agents: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading agents:', error);
      setError('Failed to load agents');
    } finally {
      setLoading(prev => ({ ...prev, agents: false }));
    }
  };

  // Load product details
  const loadProductDetails = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/product/${productId}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setSelectedProduct(data.data);
        calculateTotalPrice(data.data, formData.quantity);
      } else {
        setError('Failed to load product details: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading product details:', error);
      setError('Failed to load product details');
    }
  };

  // Calculate total price
  const calculateTotalPrice = (product, quantity) => {
    if (product && quantity > 0) {
      const price = parseFloat(product.UNIT_PRICE) || 0;
      const qty = parseInt(quantity) || 0;
      setTotalPrice(price * qty);
    } else {
      setTotalPrice(0);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Form field changed: ${name} = ${value}`); // Debug log
    
    setFormData(prev => ({ ...prev, [name]: value }));

    // Handle cascading dropdowns
    if (name === 'category' && value) {
      loadCompanies(value);
    } else if (name === 'company' && value && formData.category) {
      loadProducts(formData.category, value);
    } else if (name === 'productId' && value) {
      loadProductDetails(value);
    } else if (name === 'quantity' && selectedProduct) {
      const qty = parseInt(value) || 0;
      if (qty > selectedProduct.STOCK_QUANTITY) {
        setError(`Quantity cannot exceed available stock (${selectedProduct.STOCK_QUANTITY})`);
      } else {
        setError('');
        calculateTotalPrice(selectedProduct, qty);
      }
    }
  };

  // Add order to list
  const addOrderToList = () => {
    console.log('Add to list clicked'); // Debug log
    console.log('Current form data:', formData); // Debug log
    console.log('Selected product:', selectedProduct); // Debug log
    
    // Clear previous messages
    setError('');
    setSuccess('');

    // Validation with detailed error messages
    const missingFields = [];
    if (!formData.category) missingFields.push('Category');
    if (!formData.company) missingFields.push('Company');
    if (!formData.productId) missingFields.push('Product');
    if (!formData.quantity) missingFields.push('Quantity');
    if (!formData.requiredDate) missingFields.push('Required Date');
    if (!formData.description.trim()) missingFields.push('Description');

    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      setError('Please enter a valid quantity greater than 0');
      return;
    }

    if (selectedProduct && quantity > selectedProduct.STOCK_QUANTITY) {
      setError(`Quantity (${quantity}) cannot exceed available stock (${selectedProduct.STOCK_QUANTITY})`);
      return;
    }

    if (!selectedProduct) {
      setError('Product details not loaded. Please select a product again.');
      return;
    }

    try {
      // Create order object
      const newOrder = {
        id: Date.now(), // Temporary ID for UI
        category: formData.category,
        company: formData.company,
        productId: formData.productId,
        productName: selectedProduct.PRODUCT_NAME || 'Unknown Product',
        quantity: quantity,
        unitPrice: parseFloat(selectedProduct.UNIT_PRICE) || 0,
        totalPrice: totalPrice,
        requiredDate: formData.requiredDate,
        agentId: formData.agentId || null,
        agentName: formData.agentId ? 
          (dropdownData.agents.find(a => a.USER_ID == formData.agentId)?.FULL_NAME || 'Unassigned') : 
          'Unassigned',
        description: formData.description.trim(),
        stockAvailable: selectedProduct.STOCK_QUANTITY || 0
      };

      console.log('Creating new order:', newOrder); // Debug log

      // Add to order list
      setOrderList(prev => {
        const newList = [...prev, newOrder];
        console.log('Updated order list:', newList); // Debug log
        return newList;
      });
      
      // Reset form fields for next entry (keep category and company for convenience)
      setFormData(prev => ({
        ...prev,
        productId: '',
        quantity: '',
        requiredDate: '',
        description: ''
      }));
      
      setSelectedProduct(null);
      setTotalPrice(0);
      setSuccess(`Order for "${newOrder.productName}" added successfully!`);
      
      console.log('Order added successfully'); // Debug log
      
    } catch (error) {
      console.error('Error adding order to list:', error);
      setError('Failed to add order to list. Please try again.');
    }
  };

  // Remove order from list
  const removeOrderFromList = (orderId) => {
    console.log('Removing order with ID:', orderId); // Debug log
    setOrderList(prev => {
      const newList = prev.filter(order => order.id !== orderId);
      console.log('Order list after removal:', newList); // Debug log
      return newList;
    });
    setSuccess('Order removed from list');
  };

  // Submit all orders
  const submitAllOrders = async () => {
    if (orderList.length === 0) {
      setError('Please add at least one order to submit');
      return;
    }

    setLoading(prev => ({ ...prev, submitting: true }));
    
    try {
      const ordersToSubmit = orderList.map(order => ({
        description: order.description,
        productId: order.productId,
        quantity: order.quantity,
        companyName: `${order.company} - ${order.category}`,
        requiredDate: order.requiredDate,
        agentId: order.agentId
      }));

      console.log('Submitting orders:', ordersToSubmit); // Debug log

      const response = await fetch(`${API_BASE_URL}/orders/bulk`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ orders: ordersToSubmit })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Successfully submitted ${orderList.length} orders!`);
        setOrderList([]);
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        setError(data.message || 'Failed to submit orders');
      }
    } catch (error) {
      console.error('Network error while submitting orders:', error);
      setError('Network error while submitting orders');
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  // Table columns for order list
  const orderTableColumns = [
    {
      title: 'Product',
      key: 'productName',
      width: '200px',
      render: (value, row) => (
        <div>
          <div style={{ fontWeight: '500' }}>{value || 'N/A'}</div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            {row.category} - {row.company}
          </div>
        </div>
      )
    },
    {
      title: 'Quantity',
      key: 'quantity',
      width: '80px',
      align: 'center',
      render: (value, row) => (
        <div>
          <Badge color="primary" pill>{value || 0}</Badge>
          <div style={{ fontSize: '10px', color: '#6c757d' }}>
            Stock: {row.stockAvailable || 0}
          </div>
        </div>
      )
    },
    {
      title: 'Unit Price',
      key: 'unitPrice',
      width: '100px',
      align: 'right',
      render: (value) => {
        const price = parseFloat(value) || 0;
        return `$${price.toFixed(2)}`;
      }
    },
    {
      title: 'Total Price',
      key: 'totalPrice',
      width: '100px',
      align: 'right',
      render: (value) => {
        const price = parseFloat(value) || 0;
        return (
          <strong style={{ color: '#28a745' }}>
            ${price.toFixed(2)}
          </strong>
        );
      }
    },
    {
      title: 'Required Date',
      key: 'requiredDate',
      width: '120px',
      render: (value) => {
        try {
          return new Date(value).toLocaleDateString();
        } catch (e) {
          return value || 'N/A';
        }
      }
    },
    {
      title: 'Agent',
      key: 'agentName',
      width: '120px',
      render: (value) => value || 'Unassigned'
    },
    {
      title: 'Description',
      key: 'description',
      width: '200px',
      render: (value) => (
        <div title={value || ''} style={{ 
          maxWidth: '200px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {value || 'N/A'}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '80px',
      align: 'center',
      render: (value, row) => (
        <Button
          size="sm"
          color="danger"
          onClick={() => removeOrderFromList(row.id)}
          title="Remove Order"
          style={{ padding: '4px 8px' }}
        >
          <FaTrash size={12} />
        </Button>
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

  // Get today's date for min date validation
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Calculate grand total
  const grandTotal = orderList.reduce((sum, order) => {
    const price = parseFloat(order.totalPrice) || 0;
    return sum + price;
  }, 0);

  // Debug: Log current state
  console.log('Current orderList length:', orderList.length);
  console.log('Current orderList:', orderList);

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
              <FaShoppingCart size={24} style={{ color: '#292F63', marginRight: '10px' }} />
              <div>
                <h2 style={{ margin: 0, color: '#292F63', fontWeight: 'bold' }}>
                  Add New Orders
                </h2>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
                  Create multiple orders with cascading product selection
                </p>
              </div>
            </div>
            <Button color="secondary" onClick={onClose}>
              <FaArrowLeft className="me-2" />
              Back to Orders
            </Button>
          </div>
        </div>

        {/* Messages */}
        {error && <Alert color="danger" className="mb-3">{error}</Alert>}
        {success && <Alert color="success" className="mb-3">{success}</Alert>}

        <Row>
          {/* Order Form */}
          <Col lg={4}>
            <Card className="mb-4">
              <CardHeader style={{ backgroundColor: '#292F63', color: 'white' }}>
                <h5 className="mb-0">Order Details</h5>
              </CardHeader>
              <CardBody>
                {/* Category Selection */}
                <FormGroup>
                  <Label for="category">Product Category *</Label>
                  <Input
                    type="select"
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={loading.categories}
                  >
                    <option value="">Select Category</option>
                    {dropdownData.categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Input>
                  {loading.categories && <Spinner size="sm" className="mt-1" />}
                </FormGroup>

                {/* Company Selection */}
                <FormGroup>
                  <Label for="company">Company *</Label>
                  <Input
                    type="select"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={!formData.category || loading.companies}
                  >
                    <option value="">Select Company</option>
                    {dropdownData.companies.map(company => (
                      <option key={company} value={company}>{company}</option>
                    ))}
                  </Input>
                  {loading.companies && <Spinner size="sm" className="mt-1" />}
                </FormGroup>

                {/* Product Selection */}
                <FormGroup>
                  <Label for="productId">Product Item *</Label>
                  <Input
                    type="select"
                    name="productId"
                    id="productId"
                    value={formData.productId}
                    onChange={handleInputChange}
                    disabled={!formData.company || loading.products}
                  >
                    <option value="">Select Product</option>
                    {dropdownData.products.map(product => (
                      <option key={product.PRODUCT_ID} value={product.PRODUCT_ID}>
                        {product.PRODUCT_NAME} (Stock: {product.STOCK_QUANTITY})
                      </option>
                    ))}
                  </Input>
                  {loading.products && <Spinner size="sm" className="mt-1" />}
                </FormGroup>

                {/* Product Details Display */}
                {selectedProduct && (
                  <div style={{
                    backgroundColor: '#e7f3ff',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    fontSize: '12px'
                  }}>
                    <div><strong>Price:</strong> {parseFloat(selectedProduct.UNIT_PRICE || 0).toFixed(2)}</div>
                    <div><strong>Available Stock:</strong> {selectedProduct.STOCK_QUANTITY}</div>
                    <div><strong>Description:</strong> {selectedProduct.PRODUCT_DESCRIPTION}</div>
                  </div>
                )}

                {/* Quantity Input */}
                <FormGroup>
                  <Label for="quantity">Quantity *</Label>
                  <Input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    disabled={!selectedProduct}
                    min="1"
                    max={selectedProduct?.STOCK_QUANTITY || 999}
                    placeholder="Enter quantity"
                  />
                  {selectedProduct && (
                    <small className="text-muted">
                      Max available: {selectedProduct.STOCK_QUANTITY}
                    </small>
                  )}
                </FormGroup>

                {/* Total Price Display */}
                {totalPrice > 0 && (
                  <div style={{
                    backgroundColor: '#d4edda',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    textAlign: 'center'
                  }}>
                    <strong style={{ color: '#155724', fontSize: '16px' }}>
                      Total: {totalPrice.toFixed(2)}
                    </strong>
                  </div>
                )}

                {/* Required Date */}
                <FormGroup>
                  <Label for="requiredDate">
                    <FaCalendarAlt className="me-1" />
                    Required Date *
                  </Label>
                  <Input
                    type="date"
                    name="requiredDate"
                    id="requiredDate"
                    value={formData.requiredDate}
                    onChange={handleInputChange}
                    min={getTodayDate()}
                  />
                </FormGroup>

                {/* Agent Selection */}
                <FormGroup>
                  <Label for="agentId">Assign Agent (Optional)</Label>
                  <Input
                    type="select"
                    name="agentId"
                    id="agentId"
                    value={formData.agentId}
                    onChange={handleInputChange}
                    disabled={loading.agents}
                  >
                    <option value="">Unassigned</option>
                    {dropdownData.agents.map(agent => (
                      <option key={agent.USER_ID} value={agent.USER_ID}>
                        {agent.FULL_NAME} ({agent.EMAIL})
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                {/* Description */}
                <FormGroup>
                  <Label for="description">Description *</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter order description or purpose"
                  />
                </FormGroup>

                {/* Add to List Button */}
                <Button
                  color="primary"
                  onClick={addOrderToList}
                  style={{ width: '100%' }}
                >
                  <FaPlus className="me-2" />
                  Add to Order List
                </Button>
              </CardBody>
            </Card>
          </Col>

          {/* Order List */}
          <Col lg={8}>
            <Card>
              <CardHeader style={{ backgroundColor: '#f8f9fa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h5 className="mb-0">Order List ({orderList.length})</h5>
                  {grandTotal > 0 && (
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
                      Grand Total: {grandTotal.toFixed(2)}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardBody style={{ padding: '0' }}>
                <DataTable
                  data={orderList}
                  columns={orderTableColumns}
                  searchable={false}
                  emptyMessage="No orders added yet. Use the form to add orders."
                  tableHeight="400px"
                />
              </CardBody>
            </Card>

            {/* Submit Button */}
            {orderList.length > 0 && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button
                  color="success"
                  size="lg"
                  onClick={submitAllOrders}
                  disabled={loading.submitting}
                  style={{ minWidth: '200px' }}
                >
                  {loading.submitting ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="me-2" />
                      Submit All Orders ({orderList.length})
                    </>
                  )}
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddNewOrder;