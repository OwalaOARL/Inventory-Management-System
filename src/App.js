import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Common/Layout/Layout";

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

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route -> LoginPage */}
        <Route path="/" element={<Loginpage />} />

        {/* Routes without layout */}
        <Route path="/login" element={<Loginpage />} />
        <Route path="/create-account" element={<CreateAccount />} />

        {/* Routes with sidebar layout */}
        <Route path="/dashboard" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="settings" element={<Settings />} />
          <Route path="agent" element={<Agent />} />
          <Route path="agent-details" element={<AgentDetails />} />
          <Route path="low-stock" element={<LowStock />} />
          <Route path="add-request" element={<AddRequest />} />
          <Route path="pending-deliveries" element={<PendingDeliveries />} />
          <Route path="completed-deliveries" element={<CompletedDeliveries />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
