import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Badge,
  Spinner,
  Alert
} from 'reactstrap';
import { FaPaperPlane, FaUser, FaCrown, FaUserTie } from 'react-icons/fa';

const OrderChat = ({ orderId, currentUser, onStatusUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

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

  // Load messages for the order
  const loadMessages = async () => {
    if (!orderId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/chat/orders/${orderId}/messages`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.data);
      } else {
        setError('Failed to load messages');
      }
    } catch (error) {
      setError('Network error while loading messages');
    } finally {
      setLoading(false);
    }
  };

  // Send a message
  const sendMessage = async (messageText, messageType = 'GENERAL') => {
    if (!messageText.trim()) return;
    
    setSending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/chat/orders/${orderId}/messages`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          messageText: messageText.trim(),
          messageType
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, data.data]);
        setNewMessage('');
        setError('');
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (error) {
      setError('Network error while sending message');
    } finally {
      setSending(false);
    }
  };

  // Handle message submit
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
    }
  };

  // Update order status with reason message
  const handleStatusUpdateWithMessage = async (status, message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/orders/${orderId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          status,
          message
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Reload messages to show the new status update message
        await loadMessages();
        // Notify parent component about status update
        if (onStatusUpdate) {
          onStatusUpdate(status);
        }
      } else {
        setError(data.message || 'Failed to update status');
      }
    } catch (error) {
      setError('Network error while updating status');
    }
  };

  // Load messages when component mounts or orderId changes
  useEffect(() => {
    if (orderId) {
      loadMessages();
    }
  }, [orderId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case 'OWNER': return <FaCrown size={14} color="#dc3545" />;
      case 'ADMIN': return <FaUserTie size={14} color="#ffc107" />;
      case 'AGENT': return <FaUser size={14} color="#28a745" />;
      default: return <FaUser size={14} color="#6c757d" />;
    }
  };

  // Get message type badge
  const getMessageTypeBadge = (messageType) => {
    switch (messageType) {
      case 'COMPLETION_REASON':
        return <Badge color="success" pill>Completion Reason</Badge>;
      case 'REJECTION_REASON':
        return <Badge color="danger" pill>Rejection Reason</Badge>;
      case 'STATUS_UPDATE':
        return <Badge color="info" pill>Status Update</Badge>;
      default:
        return null;
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader 
        style={{ 
          backgroundColor: '#f8f9fa', 
          borderBottom: '2px solid #dee2e6',
          padding: '10px 15px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h6 style={{ margin: 0, fontWeight: '600' }}>Order Discussion</h6>
          <Button 
            size="sm" 
            color="link" 
            onClick={loadMessages}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : 'Refresh'}
          </Button>
        </div>
      </CardHeader>

      <CardBody style={{ 
        flex: 1, 
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Error Alert */}
        {error && (
          <Alert color="danger" style={{ margin: '10px', padding: '8px' }}>
            {error}
          </Alert>
        )}

        {/* Messages Container */}
        <div style={{ 
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          backgroundColor: '#fafafa'
        }}>
          {loading && messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spinner color="primary" />
              <p style={{ marginTop: '10px', color: '#6c757d' }}>Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#6c757d' }}>
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isCurrentUser = message.SENDER_ID === currentUser?.userId;
              return (
                <div
                  key={message.MESSAGE_ID}
                  style={{
                    marginBottom: '15px',
                    display: 'flex',
                    flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                    alignItems: 'flex-start'
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isCurrentUser ? '#007bff' : '#28a745',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: isCurrentUser ? '0 0 0 8px' : '0 8px 0 0',
                    flexShrink: 0
                  }}>
                    {getRoleIcon(message.SENDER_ROLE)}
                  </div>

                  {/* Message Bubble */}
                  <div style={{
                    maxWidth: '70%',
                    backgroundColor: isCurrentUser ? '#007bff' : 'white',
                    color: isCurrentUser ? 'white' : '#333',
                    padding: '8px 12px',
                    borderRadius: '18px',
                    border: isCurrentUser ? 'none' : '1px solid #dee2e6',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    {/* Sender Info */}
                    <div style={{
                      fontSize: '11px',
                      opacity: 0.8,
                      marginBottom: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: '600' }}>
                        {isCurrentUser ? 'You' : message.SENDER_NAME}
                      </span>
                      <span>{formatTimestamp(message.CREATED_DATE)}</span>
                    </div>

                    {/* Message Type Badge */}
                    {message.MESSAGE_TYPE !== 'GENERAL' && (
                      <div style={{ marginBottom: '8px' }}>
                        {getMessageTypeBadge(message.MESSAGE_TYPE)}
                      </div>
                    )}

                    {/* Message Text */}
                    <div style={{ 
                      fontSize: '14px',
                      lineHeight: '1.4',
                      wordWrap: 'break-word'
                    }}>
                      {message.MESSAGE_TEXT}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div style={{ 
          borderTop: '1px solid #dee2e6',
          padding: '10px',
          backgroundColor: 'white'
        }}>
          <form onSubmit={handleSubmitMessage} style={{ display: 'flex', gap: '8px' }}>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={sending}
              style={{ 
                borderRadius: '20px',
                border: '2px solid #dee2e6'
              }}
              maxLength={1000}
            />
            <Button
              type="submit"
              color="primary"
              disabled={!newMessage.trim() || sending}
              style={{
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {sending ? <Spinner size="sm" /> : <FaPaperPlane size={16} />}
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderChat;
