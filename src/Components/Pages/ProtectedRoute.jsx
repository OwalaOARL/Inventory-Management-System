// src/Components/Pages/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if requiredRole is specified
  if (requiredRole) {
    const userRole = user?.roleName;
    
    // Define role hierarchy (higher roles can access lower role features)
    const roleHierarchy = {
      'OWNER': 3,   // Highest level - can access everything
      'ADMIN': 2,   // Medium level - can access ADMIN and AGENT features  
      'AGENT': 1    // Basic level - can only access AGENT features
    };

    const requiredLevel = roleHierarchy[requiredRole] || 0;
    const userLevel = roleHierarchy[userRole] || 0;
    
    // Check if user has sufficient role level
    if (userLevel < requiredLevel) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          fontFamily: 'Arial, sans-serif',
          color: '#dc3545',
          textAlign: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Access Denied</h2>
            <p style={{ marginBottom: '10px', fontSize: '16px' }}>
              You don't have permission to access this page.
            </p>
            <div style={{ 
              backgroundColor: '#f8d7da', 
              padding: '15px', 
              borderRadius: '5px',
              margin: '20px 0'
            }}>
              <p style={{ margin: '5px 0' }}>
                <strong>Required role:</strong> {requiredRole}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Your role:</strong> {userRole}
              </p>
            </div>
            <button 
              onClick={() => window.history.back()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;