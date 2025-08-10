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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Loginpage /></Layout>} />
        <Route path="/create-account" element={<Layout><CreateAccount /></Layout>} />
        <Route path="/my-account" element={<Layout><MyAccount /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/agent" element={<Layout><Agent /></Layout>} />
        <Route path="/agent-details" element={<Layout><AgentDetails /></Layout>} />
        <Route path="/low-stock" element={<Layout><LowStock /></Layout>} />
        <Route path="/add-request" element={<Layout><AddRequest /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
