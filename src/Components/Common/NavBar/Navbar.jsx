import React, { useState } from "react";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import Chat from "../../Pages/Chat/Chat"; 
import "./Navbar.css";
import { FaRegCommentDots } from "react-icons/fa"; // ✅ React-icons chat icon

const Navbar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleMyAccount = () => console.log("Navigate to My Account");
  const handleSettings = () => console.log("Navigate to Settings");
  const handleAgents = () => console.log("Navigate to Agents");
  const handleLogout = () => console.log("Logging out...");

  return (
    <>
      <nav className="navbar">
        <span className="navbar-title">Inventory Management System</span>

        <div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* White Chat Icon */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#fff", // ✅ White color
              fontSize: "22px",
            }}
            title="Open Chat"
          >
            <FaRegCommentDots />
          </button>

          <ProfileDropdown
            onMyAccount={handleMyAccount}
            onSettings={handleSettings}
            onAgents={handleAgents}
            onLogout={handleLogout}
            username="My Profile"
          />
        </div>
      </nav>

      {isChatOpen && <Chat onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default Navbar;
