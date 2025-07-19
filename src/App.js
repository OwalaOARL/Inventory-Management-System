import React from "react";
import Navbar from "./Components/Common/NavBar/Navbar";
import Loginpage from "./Components/Pages/Login/Loginpage";
import CreateAccount from "./Components/Pages/Login/CreateAccount";
import MyAccount from "./Components/Pages/AccountDetails/MyAccount";
import Settings from "./Components/Pages/AccountDetails/Settings";
import Agent from "./Components/Pages/AccountDetails/Agent";
import AgentDetails from "./Components/Pages/AccountDetails/AgentDetails";


const App = () => {
  return (
    <div>
      
      <AgentDetails />
    </div>
  );
};

export default App;
