// src/services/apiService.jsx
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  
  // Get auth headers with token
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Login user
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (data.success) {
      // Store token and user data
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  }

  // Get current user profile
  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    return await response.json();
  }

  // Verify token
  async verifyToken() {
    const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });

    return await response.json();
  }

  // Logout user
  async logout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } finally {
      // Clear local storage regardless of response
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Get all users (admin only)
  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    return await response.json();
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Get current user from localStorage
  getCurrentUser() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  // Get user role
  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.roleName : null;
  }

  // Check if user has specific role
  hasRole(role) {
    return this.getUserRole() === role;
  }

  // Check if user is owner
  isOwner() {
    return this.hasRole('OWNER');
  }

  // Check if user is admin or owner
  isAdmin() {
    const role = this.getUserRole();
    return role === 'ADMIN' || role === 'OWNER';
  }

  // Check if user is agent, admin, or owner
  isAgent() {
    const role = this.getUserRole();
    return role === 'AGENT' || role === 'ADMIN' || role === 'OWNER';
  }
}

export default new ApiService();