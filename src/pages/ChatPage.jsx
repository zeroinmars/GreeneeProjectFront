import React from "react";
 /*  import AddEvent from "../components/AddEvent"; */
import TalkChat from '../components/chatbot/TalkChat'
import ChatbotSteps from '../components/chatbot/ChatbotSteps'  
import Talkbot from '../components/chatbot/Talkbot'  
function ChatPage() {
  
  return (
    <>
  <TalkChat /> 
  <ChatbotSteps></ChatbotSteps>   
  <Talkbot></Talkbot>
    </>
  );
};

export default ChatPage;
