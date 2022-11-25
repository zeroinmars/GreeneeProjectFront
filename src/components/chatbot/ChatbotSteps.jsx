import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot';
import ChatbotReview from './ChatbotReview';
import { ThemeProvider } from "styled-components";
import greenihead from "../../img/greenee.png";
import HeaderAlarm from "../HeaderAlarm";

const botAvatar = greenihead;
// ThemeProvider사용할 때 채팅창 css
const theme = {
    background: "rgb(215, 237, 188)",
    /* background: "rgb(143, 223, 130)", */
    fontFamily: "Helvetica Neue",
    headerBgColor: "#6AA258", /* 채팅창헤더 */
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor:  "#6AA258", /* 챗봇말풍선 메인컬러 */
    botFontColor: "#fff",
    userBubbleColor: "#CEDD38",/* 유저 말풍선 서브컬러*/
    userFontColor: "#fff",
   /*  marginbottom: '1px git', */
}; 
/* rgb(215, 237, 188) */  //메인컬러2

const steps = [
    {
        id: '1',
        message: '교통수단이 무엇인가요?',
        trigger: 'transport',
    },
    {
        id: 'transport',
        options: [
            { value: '대중교통', label: '대중교통', trigger: '2' },
            { value: '자가용', label: '자가용', trigger: '2' },
        ],
    },
    {
        id: '2',
        message: '직업이 무엇인가요?',
        trigger: 'job',
    },
    {
        id: 'job',
        options: [
            { value: '사무', label: '사무', trigger: '3' },
            { value: '음식', label: '음식', trigger: '3' },
            { value: '보안', label: '보안', trigger: '3' },
            { value: '보건 ', label: '보건', trigger: '3' },
            { value: '관리', label: '관리', trigger: '3' },
            { value: '농업', label: '농업', trigger: '3' },
            { value: '노무', label: '노무', trigger: '3' },
            { value: '운전', label: '운전', trigger: '3' },
            { value: '영업', label: '영업', trigger: '3' },
            { value: '기타', label: '기타', trigger: '3' },
        ],
    },
    {
        id: '3',
        message: '취미가 무엇인가요?',
        trigger: 'hobby',
    },
    {
        id: 'hobby',
        options: [
            { value: '운동', label: '운동', trigger: '4' },
            { value: '무술', label: '무술', trigger: '4' },
            { value: '보디빌딩', label: '보디빌딩', trigger: '4' },
            { value: '조깅', label: '조깅', trigger: '4' },
            { value: '게임', label: '게임', trigger: '4' },
            { value: '그림', label: '그림', trigger: '4' },
            { value: '음악 ', label: '음악', trigger: '4' },
            { value: '영화', label: '영화', trigger: '4' },
            { value: '기타', label: '기타', trigger: '4' },
        ],
    },
    {
        id: '4',
        message: '좋아하는 음식이 무엇인가요?',
        trigger: 'food',
    },
    {
        id: 'food',
        options: [
            { value: '한식', label: '한식', trigger: '5' },
            { value: '중식', label: '중식', trigger: '5' },
            { value: '일식', label: '일식', trigger: '5' },
            { value: '양식', label: '양식', trigger: '5' },
            { value: '기타', label: '기타', trigger: '5' },
        ],
    },
    {
        id: '5',
        message: '좋아하는 음악이 무엇인가요?',
        trigger: 'music',
    },
    {
        id: 'music',
        options: [
            { value: '클래식', label: '클래식', trigger: '6' },
            { value: '발라드', label: '발라드', trigger: '6' },
            { value: '힙합', label: '힙합', trigger: '6' },
            { value: '락', label: '락', trigger: '6' },
            { value: '트로트', label: '트로트', trigger: '6' },
            { value: '댄스', label: '댄스', trigger: '6' },
            { value: '기타', label: '기타', trigger: '6' },
        ],
    },
    {
        id: '6',
        message: '성향 정보 리스트',
        trigger: 'review',
    },
    {
        id: 'review',
        component: <ChatbotReview />,
        asMessage: true,
        trigger: 'update',
    },
/*     {
        id: 'review',
        component: <ChatbotReview />,
        asMessage: true,
        trigger: 'update',
    }, */
    {
        id: 'update',
        /* message: '정확히 입력하셨습니까?', */
        trigger: 'update-question',
        options: [
            { value: 'no', label: '아니오', trigger: 'update-yes' },
            /* { value: 'yes', label: '네', trigger: 'end-message' }, */
        ],
    },
 
    {
        id: 'update-yes',
        message: '어느 정보를 수정하시겠습니까?',
        trigger: 'update-fields',
    },
    {
        id: 'update-fields',
        options: [
            { value: '교통수단', label: '교통수단', trigger: 'update-transport' },
            { value: '직업', label: '직업', trigger: 'update-job' },
            { value: '나이', label: '나이', trigger: 'update-hobby' },
            { value: '좋아하는음악', label: '좋아하는음식', trigger: 'update-food' },
            { value: '좋아하는음악', label: '좋아하는음악', trigger: 'update-music' },
        ],
    },
    {
        id: 'update-transport',
        update: 'transport',
        trigger: 'review',
    },
    {
        id: 'update-job',
        update: 'job',
        trigger: 'review',
    },
    {
        id: 'update-hobby',
        update: 'hobby',
        trigger: 'review',
    },
    {
        id: 'update-food',
        update: 'food',
        trigger: 'review',
    },
    {
        id: 'update-music',
        update: 'music',
        trigger: 'review',
    },
    {
        id: 'end-message',
        message: '정보를 수정했습니다.',
        end: true,
    },
/*     {
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
    }, */
]

class ChatbotSteps extends Component {
    render() {
        return (
            <>
     <ThemeProvider theme={theme}>    
             <HeaderAlarm  />
                <ChatBot
                headerTitle="Greenee" //채팅창 타이틀
                steps={steps} //인풋아웃풋대본
                botAvatar={botAvatar}
                className='greeniChatbot'//클래스네임(CSS를위한)(채팅창외부)
                hideUserAvatar='true'

                /* hideHeader='false' */
                />  
             </ThemeProvider>   
        </>
        );
    }
}

export default ChatbotSteps;