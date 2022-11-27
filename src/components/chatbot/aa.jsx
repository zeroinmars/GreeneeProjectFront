import React from "react";
import ChatBot from "react-simple-chatbot";
import props from 'prop-types';
/* 랜덤 아바타 펑션용 임포트 */
import greenihead2 from "../../img/greenihead.png"; 
import greenihead from "../../img/greenee.png";
import iconStar from "../../img/iconStar.png";
import iconUnder from "../../img/iconUnder.png";
/* 봇아바타랜덤돌리기 */
let botAvatarRandom;
let avatarArray = [greenihead,greenihead2,iconStar,iconUnder]
function randomF(){
   
    return avatarArray[Math.floor(Math.random() * avatarArray.length)]
  }


function Sendemail() {

  console.log("test")
}
function CustomChatbot(props) {
  const config = {
    
    width: "300px",
    height: "400px",
    floating: true,
    botAvatar: randomF(),
    steps: [
        {
           id: "Greet",
           message: randomF(),
           trigger: "Ask Name",
        },
        {
           id: "Ask Name",
           message: randomF(),
           trigger: "Waiting user input for name"
        },
        {
           id: "Waiting user input for name",
           user: true,
           trigger: "ask questions"
        },
        {
           id: "ask questions",
           message: randomF(),
           trigger: "informations"
        },
        {
           id: "informations",
           options: [
      
                      { 
                        value: "Who founded Babycare",
                        label: "Who founded Babycare",
                        trigger: "Who founded"
                      },
                      {
                        value: "Contact",
                        label: "Contact",
                        trigger: "Contact"
                      }
                      
                    ]
        },
        {
           id: "Who founded",
           message: "ERWAN",
           trigger: "informations"
        },
      
      
      
      
        {
           id: "Contact",
           message: "Ok, first, enter your adress-mail",
           trigger: "Ask email"
        },
        {
           id: "Ask email",
           user: true,
           trigger: "get-email"
        },
      
        {
          id: "get-email",
          message: "ok, {previousValue} !! Type your value now, please be fair",
          trigger: "your question"
        },
      
        // {
        //   id: "your question",
        //   message: "Ok. Now, enter your message to the staff. Please be fair !!",
        //   trigger: "your message"
        // },
        {
          id: "your question",
          user: true,
          trigger: "send mail"
        },
      
        
        {
          id: "send mail",
          message: "ok,  there is your message : {previousValue} !! The support team will answer you as possible",
          
          trigger: "thelast"
        },
      
        
        {
          id: "thelast",
          component: (
            <div> {Sendemail()} </div>
          ),
        
          end: true
        },
      
      
        
      ]
  };

  return <ChatBot   {...config} />;
 }
export default CustomChatbot;
 