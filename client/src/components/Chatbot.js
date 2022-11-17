import React from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
// .py 다루기
//import { spawn } from "child_process";
// 아바타 바꾸기
import greenihead from "../img/greenihead.png";


const botAvatar = greenihead;
//채팅창 css
const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#009688",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#009688",
  botFontColor: "#fff",
  userBubbleColor: "#2196f3",
  userFontColor: "#fff",
};
function abc(nn) {

// const spawn = require("child_process").spawn;
 //const outp = spawn("python", ["talkmodel.py", nn]);
   //  outp.stdout.on("data", (result) => {
    //console.log(result.toString());
//    return result.toString()
  return nn;

}
 
const steps = [
  {
    id: "1",
    message: "상담을 시작합니다",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: ({ previousValue, steps }) => abc("{previousValue}"),
    trigger: "2",
  },
];

function Greeni() {
  return (
    <>
      <h1>greeni page</h1>
​
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="그리니" //채팅창 타이틀
          className="chatbot" //클래스네임(CSS를위한)
          steps={steps} //인풋아웃풋대본
          botAvatar={botAvatar}
        />
        
      </ThemeProvider>
    </>
  );
}
export default Greeni