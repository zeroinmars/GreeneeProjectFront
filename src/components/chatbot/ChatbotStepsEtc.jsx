import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import ChatbotReview from "./ChatbotReview";
import { ThemeProvider } from "styled-components";
/* 랜덤 아바타 펑션용 임포트 */
import greenihead2 from "../../img/greenihead.png";
import greenihead from "../../img/greenee.png";
import iconStar from "../../img/iconStar.png";
import iconUnder from "../../img/iconUnder.png";
/* 봇아바타랜덤돌리기 */
/* Math.random() 함수는 0 ~ 1 사이의 숫자를 반환합니다. 그리고 0과 배열의 마지막
인덱스 사이의 값을 구하기 위해서는 Math.random() 함수와 배열의 length를 곱합니다.
마지막으로 Math.random() 함수의 반환 값 * 배열의 length는 정수 또는 실수이므로 
Math.floor() 함수를 호출하여 정수로 반올림합니다. */
let botAvatarRandom;
let randomfirst;
let randomSecond;
let randomThird;
const avatarArray = [greenihead, greenihead2, iconStar, iconUnder];
/* first랑 second에는 뒤에 공백하나 */
const firstArray = [
  "오늘 기분이 어때요? ",
  "만나서 반가워요. 이름이 뭐에요? ",
  "하잇! 아무말이나 해봐요~~ ",
];
const secondArray = [
  "",
  "",
  "",
  "",
  "네~ ",
  "답변 감사해요!! ",
  "ㅎ ",
  "고마워요 ",
  "ㅋㅋ ",
];
const thirdArray = [
  "",
  "",
  "",
  "당신이 궁금해요!",
  "제발 알려주세요ㅜㅜ",
  "ㅇㅅㅇ",
  "ㅇㅅㅇ",
  "이 물음에 대답을 하지 않으면...",
  "사랑해요^^",
  "ㅋㅋㅋㅋ",
  "^ㅡ^",
  "^^",
  "궁금!",
  "ㅇㅅㅇ",
  "^^*",
  "안 알려주면 가만 안 있을 거예요~",
];
function randomF() {
  botAvatarRandom = avatarArray[Math.floor(Math.random() * avatarArray.length)];
  randomfirst = firstArray[Math.floor(Math.random() * firstArray.length)];
  return randomfirst;
}
function randomS() {
  randomSecond = secondArray[Math.floor(Math.random() * secondArray.length)];
  return randomSecond;
}
function randomT() {
  randomThird = thirdArray[Math.floor(Math.random() * thirdArray.length)];
  return randomThird;
}
/* 변수 */
/* 봇딜레이 1000 마다 1초 .밀리세컨 */
let botDelay = 2000;
/* 유저 인풋 창 전송버튼 */
const submitButtonStyle = {};
/* 유저 인풋 창 */
const inputStyle = {};
/* 유저 인풋창 전체 */
const footerStyle = {
  background: "#efefef",
};
/* 유저 인풋 창 플레이스홀더 */
const placeholder =
  "자신의 정보를 입력해주세요!"; /* height 고정을 풀어주는 옵션 (플로팅 중 아닐 때) */ /* 옵션주는 버블창 */ /* 이렇게하면 채팅방 폭 MAX로 자동 (플로팅 아닐 때)*/ /* const height = {}; */
/* const width = {}; */ const bubbleOptionStyle = {
  background: "#f39c12",
};
/* 플로팅(채팅창 아이콘) */
const floatingStyle = {
  /* border: "5px solid", */
  /* borderColor:'#7e7e7e', */
  /* Top: '100px', */
  background: "#2ecc71",
  /* marginRight: '230px',  */
  /* marginBottop: "200px", */
  bottom: "815px",
  padding: "0px",
  zIndex: "999999999999999999999999",
};
/* 테마 1, 2  */
const lightTheme = {
  /*   background: "#fff", */
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
  headerBgColor: "#2ecc71",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#2ecc71",
  botFontColor: "#fff",
  userBubbleColor: "#f39c12",
  userFontColor: "#fff",
};
/* 대본 */
const steps = [
  {
    id: "0",
    message: randomF(),
    trigger: "user",
  },
  {
    id: "user",
    user: true,
    trigger: "1",
  },
  {
    id: "1",
    message: randomS() + "교통수단은 무엇인가요?",
    trigger: "transport",
  },
  {
    id: "transport",
    options: [
      { value: "대중교통", label: "대중교통", trigger: "2" },
      { value: "자가용", label: "자가용", trigger: "2" },
      { value: "기타", label: "기타", trigger: "input-transport" },
    ],
  },
  {
    id: "input-transport",
    message: "교통수단을 작성해주세요.",
    trigger: "etctransport",
  },
  {
    id: "etctransport",
    user: true,
    trigger: "2",
  },
  {
    id: "2",
    message: randomS() + "직업도 알려주세요. " + randomT(),
    trigger: "job",
  },
  {
    id: "job",
    options: [
      { value: "사무", label: "사무", trigger: "3" },
      { value: "음식", label: "음식", trigger: "3" },
      { value: "보안", label: "보안", trigger: "3" },
      { value: "보건 ", label: "보건", trigger: "3" },
      { value: "관리", label: "관리", trigger: "3" },
      { value: "농업", label: "농업", trigger: "3" },
      { value: "노무", label: "노무", trigger: "3" },
      { value: "운전", label: "운전", trigger: "3" },
      { value: "영업", label: "영업", trigger: "3" },
      { value: "기타", label: "기타", trigger: "input-job" },
    ],
  },
  {
    id: "input-job",
    message: "직업을 작성해주세요.",
    trigger: "etcjob",
  },
  {
    id: "etcjob",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: randomS() + "취미가 무엇인가요? " + randomT(),
    trigger: "hobby",
  },
  {
    id: "hobby",
    options: [
      { value: "운동", label: "운동", trigger: "4" },
      { value: "게임", label: "게임", trigger: "4" },
      { value: "그림", label: "그림", trigger: "4" },
      { value: "음악 ", label: "음악", trigger: "4" },
      { value: "영화", label: "영화", trigger: "4" },
      { value: "기타", label: "기타", trigger: "input-hobby" },
    ],
  },
  {
    id: "input-hobby",
    message: "취미를 작성해주세요.",
    trigger: "etchobby",
  },
  {
    id: "etchobby",
    user: true,
    trigger: "4",
  },
  {
    id: "4",
    message: randomS() + "좋아하는 음식은 무엇인가요?" + randomT(),
    trigger: "food",
  },
  {
    id: "food",
    options: [
      { value: "한식", label: "한식", trigger: "5" },
      { value: "중식", label: "중식", trigger: "5" },
      { value: "일식", label: "일식", trigger: "5" },
      { value: "양식", label: "양식", trigger: "5" },
      { value: "기타", label: "기타", trigger: "input-food" },
    ],
  },
  {
    id: "input-food",
    message: "좋아하는 음식을 작성해주세요.",
    trigger: "etcfood",
  },
  {
    id: "etcfood",
    user: true,
    trigger: "5",
  },
  {
    id: "5",
    message: randomS() + "좋아하는 음악이 무엇인가요? " + randomT(),
    trigger: "music",
  },
  {
    id: "music",
    options: [
      { value: "클래식", label: "클래식", trigger: "6" },
      { value: "발라드", label: "발라드", trigger: "6" },
      { value: "힙합", label: "힙합", trigger: "6" },
      { value: "락", label: "락", trigger: "6" },
      { value: "트로트", label: "트로트", trigger: "6" },
      { value: "댄스", label: "댄스", trigger: "6" },
      { value: "기타", label: "기타", trigger: "input-music" },
    ],
  },
  {
    id: "input-music",
    message: "좋아하는 음악을 작성해주세요.",
    trigger: "etcmusic",
  },
  {
    id: "etcmusic",
    user: true,
    trigger: "6",
  },
  {
    id: "6",
    message: "제대로 입력하셨습니까?",
    trigger: "review",
  },
  {
    id: "review",
    component: <ChatbotReview />,
    asMessage: true,
    /* trigger: "update", */
    end: true,
  },
  {
    id: "update",
    options: [
      { value: "no", label: "아니, 잘못 입력했어", trigger: "update-yes" },
      /* { value: 'yes', label: '네', trigger: 'end-message' }, */
    ],
  },
  {
    id: "update-yes",
    message: "어느 정보를 수정하시겠어요?",
    trigger: "update-fields",
  },
  {
    id: "update-fields",
    options: [
      { value: "교통수단", label: "교통수단", trigger: "update-transport" },
      { value: "직업", label: "직업", trigger: "update-job" },
      { value: "취미", label: "취미", trigger: "update-hobby" },
      { value: "좋아하는음악", label: "좋아하는음식", trigger: "update-food" },
      { value: "좋아하는음악", label: "좋아하는음악", trigger: "update-music" },
    ],
  },
  {
    id: "update-transport",
    update: "transport",
    trigger: "6",
  },
  {
    id: "update-job",
    update: "job",
    trigger: "6",
  },
  {
    id: "update-hobby",
    update: "hobby",
    trigger: "6",
  },
  {
    id: "update-food",
    update: "food",
    trigger: "6",
  },
  {
    id: "update-music",
    update: "music",
    trigger: "6",
  },
  /*   {
    id: "end-message",
    message: "정보를 수정했습니다.",
    end: true,
  }, */
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
];
/* export */
class ChatbotSteps extends Component {
  render() {
    return (
      <>
        <ThemeProvider theme={lightTheme}>
          {/* <ThemeProvider theme={darkTheme}> */}
          <div
            style={{
              marginRight: "-1px",
              marginTop: "-7.73px",
              /* borderBottom: "65px solid", */
              borderColor: "#fff",
              /* alignItems: "baseline", */
              /* display:'inline', */
            }}
          >
            <ChatBot
              headerTitle="Greenee.AI" //채팅창 타이틀
              steps={steps} //인풋아웃풋대본
              botAvatar={botAvatarRandom}
              className="greeniChatbot" //클래스네임(CSS를위한)(채팅창외부)
              hideUserAvatar="true"
              submitButtonStyle={
                submitButtonStyle
              } /* 채팅방 폭 MAX로 하는 옵션 */
              /*      width={width} */ placeholder={placeholder}
              inputStyle={inputStyle}
              footerStyle={footerStyle}
              botDelay={botDelay}
              bubbleOptionStyle={bubbleOptionStyle}
              /* height={height} */
              floating="true" /* 채팅창 버튼으로 자동 플로팅 */
              floatingStyle={floatingStyle}
              /* floatingIcon={greenihead}     */
            />
          </div>
        </ThemeProvider>
      </>
    );
  }
}
export default ChatbotSteps;
