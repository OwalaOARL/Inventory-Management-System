// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import ApiService from '../../../services/apiService';

const Dashboard = () => {
  const { user, logout, isOwner, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [agentsLoading, setAgentsLoading] = useState(false);

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

  // Load users if user is admin or owner
  useEffect(() => {
    if (isAdmin()) {
      loadUsers();
      loadAgents();
    }
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await ApiService.getAllUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load agents with enhanced information
  const loadAgents = async () => {
    setAgentsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/agents`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setAgents(data.data);
      }
    } catch (error) {
      console.error('Failed to load agents:', error);
    } finally {
      setAgentsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  // Get dashboard statistics
  const getStats = () => {
    const totalUsers = users.length;
    const activeAgents = agents.filter(agent => agent.STATUS === 'ACTIVE').length;
    const inactiveAgents = agents.filter(agent => agent.STATUS === 'INACTIVE').length;
    const companies = [...new Set(agents.map(agent => agent.COMPANY_NAME).filter(Boolean))].length;
    
    return { totalUsers, activeAgents, inactiveAgents, companies };
  };

  const stats = getStats();

  return (
    <div style={{ 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
      }}>
        <div>
          <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>
            IMS Dashboard
          </h1>
          <p style={{ margin: '0', color: '#666' }}>
            Welcome back, {user?.username}!
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            padding: '8px 16px',
            backgroundColor: getRoleColor(user?.roleName),
            color: 'white',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {user?.roleName}
          </div>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      {isAdmin() && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #bbdefb'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#1976d2', fontSize: '28px' }}>
              {stats.totalUsers}
            </h3>
            <p style={{ margin: 0, color: '#1976d2', fontWeight: '500' }}>Total Users</p>
          </div>
          
          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #c8e6c9'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#388e3c', fontSize: '28px' }}>
              {stats.activeAgents}
            </h3>
            <p style={{ margin: 0, color: '#388e3c', fontWeight: '500' }}>Active Agents</p>
          </div>
          
          <div style={{
            backgroundColor: '#fce4ec',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #f8bbd9'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#c2185b', fontSize: '28px' }}>
              {stats.inactiveAgents}
            </h3>
            <p style={{ margin: 0, color: '#c2185b', fontWeight: '500' }}>Inactive Agents</p>
          </div>
          
          <div style={{
            backgroundColor: '#fff3e0',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #ffcc02'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#f57c00', fontSize: '28px' }}>
              {stats.companies}
            </h3>
            <p style={{ margin: 0, color: '#f57c00', fontWeight: '500' }}>Companies</p>
          </div>
        </div>
      )}

      {/* User Info Card */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: '0', color: '#333' }}>Your Profile</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <strong>User ID:</strong> {user?.userId}
          </div>
          <div>
            <strong>Email:</strong> {user?.email}
          </div>
          <div>
            <strong>Username:</strong> {user?.username}
          </div>
          <div>
            <strong>Role:</strong> {user?.roleName}
          </div>
        </div>
      </div>

      {/* Role-based Content */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: '0', color: '#333' }}>Available Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          
          {/* Agent actions */}
          <div style={{ padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>Agent Actions</h4>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>View inventory</li>
              <li>Process orders</li>
              <li>Update item status</li>
              <li>Manage deliveries</li>
            </ul>
          </div>

          {/* Admin actions (if admin or owner) */}
          {isAdmin() && (
            <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>Admin Actions</h4>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                <li>Manage agents</li>
                <li>View agent companies</li>
                <li>Generate reports</li>
                <li>System configuration</li>
              </ul>
            </div>
          )}

          {/* Owner actions (if owner) */}
          {isOwner() && (
            <div style={{ padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#0c5460' }}>Owner Actions</h4>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                <li>Full system access</li>
                <li>Manage all users</li>
                <li>System maintenance</li>
                <li>Company oversight</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Recent Agents Section (Admin/Owner only) */}
      {isAdmin() && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: '0', color: '#333' }}>Recent Agents</h3>
            <button 
              onClick={loadAgents}
              disabled={agentsLoading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: agentsLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {agentsLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          {agents.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Company</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Contact</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.slice(0, 5).map(agent => (
                    <tr key={agent.USER_ID}>
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: '500' }}>
                        {agent.FULL_NAME || agent.USERNAME}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{agent.EMAIL}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {agent.COMPANY_NAME || '-'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        {agent.CONTACT_NUMBER || '-'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        <span style={{
                          padding: '4px 8px',
                          backgroundColor: agent.STATUS === 'ACTIVE' ? '#28a745' : '#dc3545',
                          color: 'white',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {agent.STATUS}
                        </span>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontSize: '12px' }}>
                        {new Date(agent.CREATED_DATE).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No agents found.</p>
          )}
          
          {agents.length > 5 && (
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Showing 5 of {agents.length} agents. Visit Agent Management for full list.
              </p>
            </div>
          )}
        </div>
      )}

      {/* System Users List (Admin/Owner only) */}
      {isAdmin() && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: '0', color: '#333' }}>All System Users</h3>
            <button 
              onClick={loadUsers}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          {users.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Username</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Role</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.userId}>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.userId}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.username}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        <span style={{
                          padding: '4px 8px',
                          backgroundColor: getRoleColor(user.roleName),
                          color: 'white',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {user.roleName}
                        </span>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Helper function to get role color
const getRoleColor = (role) => {
  switch (role) {
    case 'OWNER': return '#dc3545';
    case 'ADMIN': return '#ffc107';
    case 'AGENT': return '#28a745';
    default: return '#6c757d';
  }
};

export default Dashboard;