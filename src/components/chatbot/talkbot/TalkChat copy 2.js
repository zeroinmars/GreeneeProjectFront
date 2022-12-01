import React from "react"; 
/* bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from 'react-bootstrap'
/* img */
import sendImage from '../../../img/send-icon.png'
/* header */
import {Navbar} from 'react-bootstrap'



/* import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai"; */
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "1212",
});
const openai = new OpenAIApi(configuration);

function TalkChat() {


 /*  const [message, setMessage] = useState([{msg:"hi", from:false}])
  const getMessage = (msg, from) =>{
    setMessage((current) => [...current,({msg:msg, from:from})])
  } */






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
      <div className="App">
    </div>

  
    
    </>
  );
}
export default TalkChat;
