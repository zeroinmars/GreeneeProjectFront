import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot';
import ChatbotReview from './ChatbotReview';
/* import { ThemeProvider } from "styled-components"; */
import greenihead from "../../img/greenihead.png";
const botAvatar = greenihead;
// ThemeProvider사용할 때 채팅창 css
/* const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#59b4a4;;",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#59b4a4;;",
    botFontColor: "#fff",
    userBubbleColor: "#2196f3",
    userFontColor: "#fff",
    marginbottom: '1px'
}; */
const steps = [
    {
        id: '1',
        message: 'What is your name?',
        trigger: 'name',
    },
    {
        id: 'name',
        user: true,
        trigger: '3',
    },
    {
        id: '3',
        message: 'Hi {previousValue}! What is your gender?',
        trigger: 'gender',
    },
    {
        id: 'gender',
        options: [
            { value: 'male', label: 'Male', trigger: '5' },
            { value: 'female', label: 'Female', trigger: '5' },
        ],
    },
    {
        id: '5',
        message: 'How old are you?',
        trigger: 'age',
    },
    {
        id: 'age',
        user: true,
        trigger: '7',
        validator: (value) => {
            if (isNaN(value)) {
                return 'value must be a number';
            } else if (value < 0) {
                return 'value must be positive';
            } else if (value > 120) {
                return `${value}? Come on!`;
            }

            return true;
        },
    },
    {
        id: '7',
        message: 'Great! Check out your summary',
        trigger: 'review',
    },
    {
        id: 'review',
        component: <ChatbotReview />,
        asMessage: true,
        trigger: 'update',
    },
    {
        id: 'update',
        message: 'Would you like to update some field?',
        trigger: 'update-question',
    },
    {
        id: 'update-question',
        options: [
            { value: 'yes', label: 'Yes', trigger: 'update-yes' },
            { value: 'no', label: 'No', trigger: 'end-message' },
        ],
    },
    {
        id: 'update-yes',
        message: 'What field would you like to update?',
        trigger: 'update-fields',
    },
    {
        id: 'update-fields',
        options: [
            { value: 'name', label: 'Name', trigger: 'update-name' },
            { value: 'gender', label: 'Gender', trigger: 'update-gender' },
            { value: 'age', label: 'Age', trigger: 'update-age' },
        ],
    },
    {
        id: 'update-name',
        update: 'name',
        trigger: '7',
    },
    {
        id: 'update-gender',
        update: 'gender',
        trigger: '7',
    },
    {
        id: 'update-age',
        update: 'age',
        trigger: '7',
    },
    {
        id: 'end-message',
        message: 'Thanks! Your data was submitted successfully!',
        end: true,
    },
]


class ChatbotSteps extends Component {
    render() {
        return (
            <>
            {/* <ThemeProvider theme={theme}> */} 
                <ChatBot
                headerTitle="Greeni" //채팅창 타이틀
                steps={steps} //인풋아웃풋대본
                botAvatar={botAvatar}
                className='greeniChatbot'//클래스네임(CSS를위한)(채팅창외부)
                hideUserAvatar='true'
                /* hideHeader='false' */
                />  
            {/* </ThemeProvider> */}
        </>
        );
    }
}

export default ChatbotSteps;