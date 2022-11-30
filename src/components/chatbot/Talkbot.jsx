/* import */
import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
/* 랜덤 아바타 펑션용 임포트 */
import a1 from "../../img/a1.jpg";
import a2 from "../../img/a2.jpg";
import a3 from "../../img/a3.jpg";
import a4 from "../../img/a4.jpg";
import a5 from "../../img/a5.jpg";
import a6 from "../../img/a6.jpg";
import a7 from "../../img/a7.jpg";
/* talk */
/* import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai"; */
const { Configuration, OpenAIApi }  = require("openai");
const configuration = new Configuration({apiKey: "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",});
const openai = new OpenAIApi(configuration);
/* avatar random */
let avatarArray = [a1,a2,a3,a4,a5,a6,a7]
/* export */
function Talkbot(props) {
    /* style */
  const config = {
    steps: steps, //인풋아웃풋대본
    headerTitle: "Greenee", //채팅창 타이틀
    className: "greeniChatbot", //클래스네임(CSS를위한)(채팅창외부)
    hideUserAvatar: "true",
    placeholder: "  저와 이야기해요.",
    botDelay: 0,
    footerStyle: { background: "#efefef" },
    bubbleOptionStyle: { background: "#f39c12" },
    botAvatar: avatarArray[Math.floor(Math.random() * avatarArray.length)],
    floating: "true" /* 채팅창 버튼으로 자동 플로팅 */,
    floatingStyle: floatingStyle2,
    //floatingIcon={greenihead},
    //submitButtonStyle:{},
    //inputStyle:{},
    //width: {},
    //height: {},
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            marginRight: "-1px",
            marginTop: "-7.73px",
            borderColor: "#fff",
          }}
        >
          <ChatBot {...config} />
        </div>
      </ThemeProvider>
    </>
  );
}
export default Talkbot;
const steps = [
  {
    id: "0",
    message: "안녕하세요.",
    trigger: "1",
  },
  {
    id: "1",
    user: true,
    trigger: "2",
  },
  {
    id: "2",
    message: ({ previousValue, steps }) =>  
        openai.createCompletion({
            model: "text-ada-001",
            prompt: previousValue, //유저인풋
            temperature: 0.7,
            max_tokens: 15,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }).then((result) => {
            console.log(result.data.choices[0].text) //아웃풋
            return result.data.choices[0].text;
        }).then((result)=>{return result}),
    trigger: "1",
  },  
];
const lightTheme = {
  background: "#f0fddd",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#2ecc71",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#2ecc71",
  botFontColor: "#fff",
  userBubbleColor: "#f39c12",
  userFontColor: "#fff",
};
const darkTheme = {
  background: "#f0fddd",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#10361b",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#2ecc71",
  botFontColor: "#fff",
  userBubbleColor: "#f39c12",
  userFontColor: "#fff",
};
/* 플로팅(채팅창 아이콘) 스타일 */
const floatingStyle = {
  background: "#2ecc71",
  marginRight: "300px",
  padding: "0px",
  bottom: "110px",
  /* border: "5px solid", */
  /* borderColor:'#7e7e7e', */
  /* Top: '100px', */
};
/* 플로팅(채팅창 아이콘) 스타일 */
const floatingStyle2 = {
  background: "#10361b",
  marginRight: "300px",
  padding: "0px",
  bottom: "170px",
  /* border: "5px solid", */
  /* borderColor:'#7e7e7e', */
  /* Top: '100px', */
};
