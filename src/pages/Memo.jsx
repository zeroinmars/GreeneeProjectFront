import React from "react";
import MemoCompo from "../components/MemoCompo";
/* import MessageIcon from "@mui/icons-material/Message"; */
import { Link } from "react-router-dom";
import greenee2 from "../img/greenee.png";
import ChatbotSteps from '../components/chatbot/ChatbotSteps'
/* const chatbotButtonStyle = {
  marginLeft: "85%",
  inlineSize: "3%",
  position: "fixed",
  bottom: "70px",
  right: "30px",
  zIndex: "20",
}; */

const Memo = () => {
  return (
    <>
      {/* <MemoCompo></MemoCompo> */}
      {/* 챗봇 진입 */}
      {/* <Link style={chatbotButtonStyle} to="/chatbotsteps"> */}
{/*       <Link to="/chatbotsteps">
        <img className='greenee20' src={greenee2}/> 
      </Link> */}
      <ChatbotSteps></ChatbotSteps>
    </>
  );
};

export default Memo;
