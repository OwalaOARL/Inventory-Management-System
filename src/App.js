import React from "react";
import Navbar from "./Components/Common/NavBar/Navbar";
import Loginpage from "./Components/Pages/Login/Loginpage";
import CreateAccount from "./Components/Pages/Login/CreateAccount";
import MyAccount from "./Components/Pages/AccountDetails/MyAccount";
import Settings from "./Components/Pages/AccountDetails/Settings";
import Agent from "./Components/Pages/AccountDetails/Agent";
import AgentDetails from "./Components/Pages/AccountDetails/AgentDetails";
import Menu from "./Components/Common/Menu/Menu";
import AddRequest from "./Components/Pages/OwnerDashboard/AddRequest";
import LowStock from "./Components/Pages/OwnerDashboard/LowStock";


const App = () => {
  return (
    <div>
     
      <MyAccount/>
   
    </div>
  );
};

export default App;
