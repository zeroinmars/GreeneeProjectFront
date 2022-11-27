import React from "react";
import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai";
import "./TalkChat.css";

function TalkChat() {
  function abc() {
    document.querySelector("#send").addEventListener("click", function() {
      let template = `
          <div class='line'>
              <span class='chat-box mine'>${
                document.querySelector("#input").value
              }</span>
          </div>`;
      document
        .querySelector(".chat-content")
        .insertAdjacentHTML("beforeend", template);

      const configuration = new Configuration({
        apiKey: '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',
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
          console.log(result.data.choices[0].text);
          let template = `
            <div class='line'>
                <span class='chat-box'>${result.data.choices[0].text}</span>
            </div>`;
          document
            .querySelector(".chat-content")
            .insertAdjacentHTML("beforeend", template);
        });
    });
  }

  return (
    <>
      <body>
        <div class="chat-content">
          <div class="line">
            <span class="chat-box">안녕1</span>
          </div>
          <div class="line">
            <span class="chat-box mine">안녕2</span>
          </div>
        </div>
        <input class="chat-box" id="input"></input>
        <button id="send" onClick={abc}>
          전송
        </button>
      </body>
    </>
  );
}
export default TalkChat;