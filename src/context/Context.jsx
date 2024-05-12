import { createContext, useState } from "react";
import runChat from "../config/gemini";

//create a context, provider and consumer
export const Context = createContext();

//create a provider
const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const typingEffect = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, index * 75);
  };

  const newChat = (prompt) => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let updatedResponse = newResponse.split("*").join("<br/>");
    const newResponseArray = updatedResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      typingEffect(i, newResponseArray[i] + " ");
    }
    // setResultData(newResponseArray);
    setLoading(false);
    setInput("");
  };

  const value = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
