import React, { useState } from 'react';
import './Loginpage.css';
import { Container, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import homeImage from "../../../Assets/home.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State management
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Redirect to main dashboard page
        navigate("/dashboard/dashboard");
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left side */}
      <div className="login-left">
        <img
          src={homeImage}
          className="homeImage"
          alt="Home"
        />
      </div>

      {/* Right side */}
      <div className="login-right">
        <Container className="h-100 d-flex justify-content-center align-items-center">
          <Card className="shadow w-100">
            <CardBody className="d-flex justify-content-center align-items-center" style={{ minHeight: "100%" }}>
              <div className="login-form-container w-100" style={{ maxWidth: "400px" }}>
                
                <h1>Welcome Back</h1>
                <h2>Login</h2>

                {/* Error message */}
                {error && (
                  <div className="alert alert-danger" role="alert" style={{
                    color: '#dc3545', 
                    backgroundColor: '#f8d7da', 
                    border: '1px solid #f5c6cb',
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />

                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />

                  <button type="button" className="google-button" disabled={loading}>
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google Logo"
                    />
                    Continue with Google
                  </button>

                  <button 
                    type="submit" 
                    className="login-button"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Log in'}
                  </button>
                </form>

                <p className="signup-link">
                  Don't have an account?{" "}
                  <a onClick={() => navigate("/create-account")} href="#!">
                    Create an account
                  </a>
                </p>

                {/* Test credentials info for development */}
                <div style={{ 
                  marginTop: '20px', 
                  padding: '15px', 
                  backgroundColor: '#e7f3ff', 
                  borderRadius: '5px',
                  fontSize: '12px',
                  color: '#0066cc'
                }}>
                  <strong>Test Credentials:</strong><br/>
                  Owner: owner@ims.com / password123<br/>
                  Admin: admin@ims.com / password123<br/>
                  Agent: agent@ims.com / password123
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;