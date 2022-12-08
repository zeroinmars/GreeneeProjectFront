// import Door from "./pages/Door";
/* import Test from './pages/Test'; */
 
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ChatPersonal from "./pages/ChatPersonal";
import Home from "./pages/Home";
import Memo from "./pages/Memo";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material"; //mui 폰트 변경
import React, { useState, useEffect } from "react";
import Calendar from "./pages/Calendar";
import axios from 'axios'
import MyProfile from "./pages/MyProfile";
import Signup from "./pages/Signup";
import UserInfo from "./pages/UserInfo";
import AddEvent from "./components/AddEvent";
import UpdateEvent from "./components/UpdateEvent";
import AddMemo from "./components/AddMemo";
import SignupCompleted from './components/Signup/SignupCompleted';
import SignupCheck from './components/Signup/SignupCheck';
import Mypage from './components/Mypage/Mypage';
import Patchnote from './components/Mypage/Patchnote';
import EditNick from './components/Mypage/Edit/EditNick';
import EditPw from './components/Mypage/Edit/EditPw';
import EditcAddr from './components/Mypage/Edit/EditcAddr';
import EdithAddr from './components/Mypage/Edit/EdithAddr';
import MemoPage from './pages/MemoPage'
import Edittag from './components/Mypage/Edit/Edittag';
// import ChatbotSteps from "./components/chatbot/ChatbotSteps";
import LabelBottomNavigation from "./components/LabelBottomNavigation";
 
/* css 파일 임포트 */
import "./css/dabin.css";
import "./css/sehyoung.css";
import "./index.css";

/* mui css에 css파일을 오버라이딩 하기 위한*/
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
const cache = createCache({
  key: "css",
  prepend: true,
});
/* mui 폰트 변경 */
const theme = createTheme({
  typography: {
    fontFamily: ["Spoqa Han Sans Neo", "sans-serif"].join(","),
    fontSize: 16,
  },
});
function App() {
  const email = useSelector(state=>(state.session.email));
 
  const dispatch = useDispatch(); // store 공간안에 값을 저장하기 위해 userDispatch함수 호출
  useEffect(() => {
    
    // 화면이 랜더링 될때마다 서버에 사용자 session 정보가 있는지 없는지 검증하는 구문 세션이 있으면 로그인 되어있고 그렇지 않으면 로그인 되어있지 않다.
    axios
      .get("/lifeConcierge/api/session") // 랜더링 될때마다 get 방식으로 서버에 요청
      .then((res) => {
        dispatch({ type: "SESSION", session: res.data });
      }) // 클라이언트에서 요청 후 redux를 이용해 서버에서 응답한 결과값을 전역공간에 저장.
      .catch(() => {
        console.log("세션 호출 에러");
      });
    
    axios.post("/lifeConcierge/api/showDailyEvent", {email})
    .then((res)=>{
      dispatch({type:"DAILYEVENT", dailyEvent: res.data});
    });

    axios.post("/lifeConcierge/api/showSpecialEvent", {email})
    .then((res) => {
      dispatch({type:"SPECIALEVENT", specialEvent: res.data});
    });
    
    axios.post('/lifeConcierge/api/loginUserInfo', {email})
    .then((res) => {
      dispatch({type:"USERNAME", userName: res.data.name});
    });
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {" "}
        {/* theme 무조건 가장 외곽에 */}
        <CacheProvider value={cache}>
          {" "}
          {/* 므이 css */}
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/myProfile" element={<MyProfile />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/userInfo" element={<UserInfo />} />
              <Route path="/addEvent" element={<AddEvent />} />
              {/* <Route path="/Memo" element={<Memo />} /> */}
              
              <Route path="/Memo" element={<MemoPage />} />
              <Route path="/addMemo" element={<AddMemo />} />
              <Route path="/SignupCompleted" element={<SignupCompleted />} />
              <Route path="/SignupCheck" element={<SignupCheck />} />
              <Route path="/Mypage" element={<Mypage />} />
              <Route path="/Patchnote" element={<Patchnote />} />
              <Route path="/updateEvent" element={<UpdateEvent />} />
              <Route path="/ChatPage" element={<ChatPage />} />
              <Route path="/ChatPersonal" element={<ChatPersonal />} />
              <Route path="/EditNick" element={<EditNick />} />
              <Route path="/EditPw" element={<EditPw />} />
              <Route path="/EditcAddr" element={<EditcAddr />} />
              <Route path="/EdithAddr" element={<EdithAddr />} />
              <Route path="/Edittag" element={<Edittag />} />
              {/* <Route path="/" element={<Door />} /> */}
              {/*  <Route path="/test" element={<Test/>}/> */}
            </Routes>
           {/* <LabelBottomNavigation></LabelBottomNavigation> */}  
              {/* <ChatbotSteps></ChatbotSteps> */}  
          </BrowserRouter>
        </CacheProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;
