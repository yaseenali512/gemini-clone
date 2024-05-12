import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    onSent();
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      {/* main container */}
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Yaseen</span>
              </p>
              <p>How Can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Breifly Summarize</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card">
                <p>Brainstorm team bonding</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className="card">
                <p>Imrove the readibiliy of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* Search Box */}
        <div className="main-bottom">
          <div className="search-box">
            <form onSubmit={handleOnsubmit}>
              <input
                type="text"
                placeholder="Enter a prompt here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="" onClick={() => onSent()} />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people , so
            double check!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
