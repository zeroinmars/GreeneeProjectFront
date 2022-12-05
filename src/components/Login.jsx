import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormControl, TextField, Button } from '@mui/material';
import SnackBar from './FreqCompo/Snackbar';
import Progress from './FreqCompo/Progress'
/* import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom'; */
import greenee from '../img/greenee.png';
import '../css/Login.css';
import axios from 'axios';

const Login = () => {
  const nav = useNavigate();
  const emailRef = useRef(); //사용자가 적은 email input 태그에 할당된 Ref  
  const pwRef = useRef(); //사용자가 적은 pw input 태그에 할당된 Ref
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();    // 랜더링시 email input에 알아서 포커스 되는 구문
  }, []);

  const checkLogin = () => {  // 사용자가 작성한 email, password를 DB에서 확인하는 구문
    const url = "/lifeConcierge/api/login";
    dispatch({ type: "PROGRESS", progress: { progressToggle: true } });
    axios.post(url, { email: emailRef.current.value, pw: pwRef.current.value })
      .then((res) => {
        if (res.data != "NoneId") {
          dispatch({ type: "ISLOGGEDIN", isLoggedin: true });
          // Login 컴포넌트에 바로 알람을 출력하면 로그인이 성공이 되면 MyProfile 페이지에서 Login 컴포넌트를 MyProfile 컴포넌트로 전환해버리기 때문에 Login 컴포넌트에 알람을 출력해도 알람이 뜨지 않는다.
          // 그래서 cofirm이라는 변수만 한개 설정한 뒤 MyProfile
          dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
          dispatch({ type: "SESSION", session: res.data.rows[0] });
          nav('/');
        } else {
          dispatch({ type: "SNACKBAR/ON", snackbar: { snackbarToggle: true, explain: "아이디가 없습니다. 적절한 아이디를 다시 작성해주세요.", severity: "error" } });
          dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
        }
      })
      .catch(() => {
        dispatch({ type: "SNACKBAR/ON", snackbar: { snackbarToggle: true, explain: "로그인에 실패 했습니다.", severity: "error" } });
        dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
      });
    emailRef.current.value = "";
    pwRef.current.value = "";
  }

  return (
    <>
      
      {/* <div style={{ backgrounImage : "url(" + greenihead + ")" }}> 
      <img src='../img/greenihead.png' className='greenihead'></img>   
      <div style={{backgrounImage : "url(" + greenihead + ")"  }}>*/}
      <div style={{ padding: "20px", backgroundColor: '#D7EDBC' }}>
        {/* <div className='divLogin' style={{    width:"80%", border:"1px solid black", padding:"20px"}}>  */}
        <div className='divLogin' style={{marginTop:'40px'}}>
        <img src={greenee} className={'greenee'} style={{ width: "60%", padding: "20px" }} />
        <h60 className='greeniWelcome'> 안녕, 당신의 일정을 그리는 그리니예요.</h60>
        <FormControl fullWidth>
          <TextField variant="standard" inputRef={emailRef} label='이메일' name='email' onChange={(e) => { emailRef.current.value = e.target.value }} /><br></br>
          <TextField variant="standard" inputRef={pwRef} label='비밀번호' name='pw' type="password" onChange={(e) => { pwRef.current.value = e.target.value; }} /><br></br>
          <Button variant="contained" onClick={checkLogin} className='login_btn'>로그인</Button>
          <Button variant="contained" onClick={() => { nav("/signup") }} className='signup_btn' >회원가입</Button>
        </FormControl>
        <SnackBar />
        <Progress />
        </div>
      </div>
    </>
  )
}

export default Login;
