import React, {useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { FormControl, TextField, Button, borders } from '@mui/material';
import axios from 'axios';

/* import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom'; */
import greenee from '../../img/greenee.png'
import backback from '../../img/backback.png'
import "../../css/SignupComplete.css";
function SignupCompleted(){

const navigate = useNavigate();
 
const onClick = () => {
  navigate("/");
};
  return (
    <>
      <div className='completedpage'>
        <div className='title'>
          <h1>  회원가입 </h1>
        </div>
        <div className='divLogin' style={{ width: "90%", height: '100%', padding: "20px", backgroundColor: '#D7EDBC', scrollbarWidth: 'none' }}>
          
          <h60 className='greeneecomplete2'> 환영합니다!<br />이제 그리니가<br />일상에 행복을 <br/>드릴게요♡</h60>
          <img src={greenee} className='greeneecomplete1' />
          <FormControl fullWidth>
            <Button variant="contained" onClick={onClick} className='complete_btn'>일정 관리하기</Button>
          </FormControl>
        </div>
      </div>
    </>
  )
}

export default SignupCompleted;
