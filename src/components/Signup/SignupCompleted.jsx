import React, {useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { FormControl, TextField, Button, borders } from '@mui/material';
import axios from 'axios';

/* import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom'; */
import greenee from '../../img/greeneehappy.png'
import backback from '../../img/backback.png'
import "../../css/SignupComplete.css";
function SignupCompleted(){

const navigate = useNavigate();
 
const onClick = () => {
  navigate("/");
};

const goback = () => {
  window.history.back();
};

  return (
    <>
      <div className='completedpage'>
      <div>
        <Button className='back_btn1' onClick={goback}><img src={backback} /></Button>
          <div className='s_h_line'>회원가입</div>
        </div>
        <div className='divLogin' style={{ width: "90%", height: '100%', padding: "20px", backgroundColor: '#D7EDBC', scrollbarWidth: 'none' }}>
          
          <p className='compelte_ment'> 감사합니다! <br></br> 성향 등록이 완료됐어요</p>
          <img src={greenee} className='greeneecomplete_c2' />
          <FormControl fullWidth>
            <Button variant="contained" onClick={onClick} className='complete_btn'>일정관리 시작하기</Button>
          </FormControl>
        </div>
      </div>
    </>
  )
}

export default SignupCompleted;
