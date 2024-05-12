import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const handleClick = () => {
    setExtended((prev) => !prev);
  };

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      {/* topbar */}
      <div className="top">
        <img
          src={assets.menu_icon}
          alt=""
          className="menu"
          onClick={handleClick}
        />
        <div className="new-chat" onClick={() => newChat()}>
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((prompt, index) => {
              return (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => loadPrompt(prompt)}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{prompt.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* bottom */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
