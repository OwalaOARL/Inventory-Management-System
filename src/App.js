import React from "react";
import Navbar from "./Components/Navbar.js";
import LoginPage from "./Components/LoginPage.js";
import LoginPopup from "./Components/LoginPopup.js";



const App = () => {
  return (
    <div>
      <Navbar />
      <LoginPage />
      <LoginPopup/>
     
    </div>
  );
};

export default App;