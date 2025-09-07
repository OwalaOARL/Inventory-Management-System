import React, { useState, useRef } from "react";
import "./Chat.css";
import { FaTimes } from "react-icons/fa";
import Draggable from "react-draggable";

const Chat = ({ onClose }) => {
  const nodeRef = useRef(null); // ✅ for React 18 draggable

  const [messages, setMessages] = useState([
    { sender: "agent", text: "Good morning! I’m checking in to see if you need any deliveries today." },
    { sender: "owner", text: "Good morning! Yes, we need more rice and sugar for the store." },
    { sender: "agent", text: "Got it. How much rice and sugar do you need?" },
    { sender: "owner", text: "We need 50 kg of rice and 20 kg of sugar." },
    { sender: "agent", text: "Perfect. I’ll schedule the delivery for this afternoon." },
    { sender: "owner", text: "Thank you! Also, can you confirm if we still have enough stock of milk and bread?" },
    { sender: "agent", text: "I’ll check our records… You currently have 10 cartons of milk and 30 packs of bread left." },
    { sender: "owner", text: "Alright, that should be enough for now. Thanks for the update!" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "owner", text: input };
    setMessages([...messages, newMessage]);

    // Simulate agent reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: "Thanks for your message! (Demo reply)" },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <Draggable handle=".chat-header" nodeRef={nodeRef}>
      <div className="chat-popup" ref={nodeRef}>
        <div className="chat-header">
          <span>Chat Support</span>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </Draggable>
  );
};

export default Chat;
