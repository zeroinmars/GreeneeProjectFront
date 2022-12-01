import React from "react";
import "./TalkChat.css";
/* import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai"; */
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "1212",
});
const openai = new OpenAIApi(configuration);

function TalkChat() {
  function abc() {
    /* 인풋 */
    let template = `
        <div className='line'>
            <span className='chat-box min'>${
              document.querySelector("#input").value
            }</span>
        </div>`;

    document
      .querySelector(".chat-content")
      .insertAdjacentHTML("beforeend", template);

    /* 아웃풋 */
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: document.querySelector("#input").value,
        //prompt: document.querySelector("#input").value, //유저인풋
        temperature: 0.5,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((result) => {
        console.log(result.data.choices[0].text);
        let template = `
          <div className='line'>
          <span className='chat-box'>${result.data.choices[0].text}</span>
          </div>`;
        document
          .querySelector(".chat-content")
          .insertAdjacentHTML("beforeend", template);
      });
  }

  /* 출력 */
  return (
    <>
      <div className="chat-content">
        <div className="line">
          <span className="chat-box">안녕1</span>
        </div>
        <div className="line">
          <span className="chat-box mine">안녕2</span>
        </div>
      </div>
      <input className="chat-box" id="input"></input>
      <button id="send" onClick={abc}>
        전송
      </button>
    </>
  );
}
export default TalkChat;
