import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./Components/Common/Layout/Layout";
import ProtectedRoute from "./Components/Pages/ProtectedRoute";

import Loginpage from "./Components/Pages/Login/Loginpage";
import CreateAccount from "./Components/Pages/Login/CreateAccount";
import MyAccount from "./Components/Pages/AccountDetails/MyAccount";
import Settings from "./Components/Pages/AccountDetails/Settings";
import Agent from "./Components/Pages/AccountDetails/Agent";
import AgentDetails from "./Components/Pages/AccountDetails/AgentDetails";
import AddRequest from "./Components/Pages/OwnerDashboard/AddRequest";
import LowStock from "./Components/Pages/OwnerDashboard/LowStock";
import PendingDeliveries from "./Components/Pages/AgentDashboard/PendingDeliveries";
import CompletedDeliveries from "./Components/Pages/AgentDashboard/CompletedDeliveries";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import AgentOrders from "./Components/Pages/AgentDashboard/AgentOrders";

// Component to handle public routes (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard/dashboard" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes - redirect to dashboard if already logged in */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Loginpage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Loginpage />
              </PublicRoute>
            }
          />
          <Route
            path="/create-account"
            element={
              <PublicRoute>
                <CreateAccount />
              </PublicRoute>
            }
          />

          {/* Protected routes with sidebar layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard - accessible to all authenticated users */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* Account related pages - accessible to all authenticated users */}
            <Route path="my-account" element={<MyAccount />} />
            <Route path="settings" element={<Settings />} />

            {/* Agent management - accessible to Admin and Owner only */}
            <Route
              path="agent"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <Agent />
                </ProtectedRoute>
              }
            />
            <Route
              path="agent-details"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AgentDetails />
                </ProtectedRoute>
              }
            />

            {/* Owner Dashboard features - accessible to Owner only */}
            <Route
              path="add-request"
              element={
                <ProtectedRoute requiredRole="OWNER">
                  <AddRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="low-stock"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <LowStock />
                </ProtectedRoute>
              }
            />

            {/* Agent Dashboard features - accessible to Agent, Admin, and Owner */}

            <Route
              path="orders"
              element={
                <ProtectedRoute requiredRole="AGENT">
                  <AgentOrders />
                </ProtectedRoute>
              }
            />

            {/* Default dashboard route */}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Catch all route - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
