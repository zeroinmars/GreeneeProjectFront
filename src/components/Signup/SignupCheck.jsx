import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, TextField, Button, borders } from '@mui/material';
import axios from 'axios';

/* import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom'; */
import greenee from '../../img/greenee.png'
import backback from '../Mypage/Mypageimg/backback.png'
import "../../css/SignupCheck.css";
function SignupCompleted() {

  const navigate = useNavigate();

  const next = () => {
    navigate("/ChatPersonal");
  };

  const skip = () => {
    navigate("/");
  };

const goback = () => {
  window.history.back();
}

  return (
    <>
      <div className='completedpage'>
        <div className='title'>
          <button className='back_btn1'><a href="/Signup"><img src={backback} className='back_btn' /></a></button><h1>
            회원가입
          </h1>
        </div>
        <div className='divLogin' style={{ width: "90%", height: '100%', padding: "20px", backgroundColor: '#D7EDBC', scrollbarWidth: 'none' }}>
          <img src={greenee} className='greeneecomplete1' />
          <h60 className='greeneecomplete2'> 정보를 받았어요<br/>이제 성향을 알려주세요</h60>
          <FormControl fullWidth>
            <Button variant="contained" onClick={next} className='complete_btn1'>입력하러가기</Button>
            <div className='space'></div>
            <Button variant="contained" onClick={skip} className='nexttime_btn2'>다음에하기</Button>
          </FormControl>
        </div>
      </div>
    </>
  )
}

export default SignupCompleted;

{/* <div className='page'>
<Button className='edit_back' onClick={goback}><img src={backback} className='back_btn' /></Button>
<div className='h_line'>닉네임 변경</div>
<TextField className="edit_field" color="success" type="text" placeholder="닉네임">  
</TextField>
<Button  className='edit_btn' variant='contained'  color="success">변경하기</Button> */}
