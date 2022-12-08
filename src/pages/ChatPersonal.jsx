import React from "react";
import ChatbotSteps from '../components/chatbot/infobot/ChatbotSteps';
import '../components/chatbot/talkbot/TalkChat.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import TalkChat from '../components/chatbot/talkbot/TalkChat'
import Header from '../components/chatbot/talkbot/Header';
import Main from '../components/chatbot/talkbot/Main';
import Footer from '../components/chatbot/talkbot/Footer';
import { useState } from 'react';

function ChatPersonal() {

  const [message, setMessage] = useState([{ msg: "안녕하세요. AI 비서 그리니입니다.", from: false }])

  const getMessage = (msg, from) => {
    setMessage((current) => [...current, ({ msg: msg, from: from })])
  }

  return (
    <>      
      <ChatbotSteps style={{height:'1000px'}}></ChatbotSteps>
    </>
  );
};

export default ChatPersonal;
