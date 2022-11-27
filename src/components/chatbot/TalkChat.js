import React from "react";
import "./TalkChat.css";
import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai";

function TalkChat() {
  function abc() {
    document.querySelector("#send").addEventListener("click", function() {
      let template = `
          <div className='line'>
              <span className='chat-box mine'>${
                document.querySelector("#input").value
              }</span>
          </div>`;
      document
        .querySelector(".chat-content")
        .insertAdjacentHTML("beforeend", template);

      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);

      openai
        .createCompletion({
          model: "text-ada-001",
          prompt: document.querySelector("#input").value, //유저인풋
          temperature: 0.7,
          max_tokens: 15,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        })
        .then((result) => {
          //아웃풋
          //console.log(result.data.choices[0].text);
          let template = `
            <div className='line'>
                <span className='chat-box'>${result.data.choices[0].text}</span>
            </div>`;
          document
            .querySelector(".chat-content")
            .insertAdjacentHTML("beforeend", template);
        });
    });
  }

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
