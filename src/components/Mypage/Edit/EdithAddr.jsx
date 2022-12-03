import { useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Edit from "../../../css/Edit.css";
import backback from "../Mypageimg/backback.png"
import LabelBottomNavigation from "../../LabelBottomNavigation";

function EdithAddr() {

  const goback = () => {
    window.history.back();
  }

  return(
    <div className='page'>
    <Button className='edit_back' onClick={goback}><img src={backback} className='back_btn' /></Button>
    <div className='h_line'>주소 변경</div>
    <TextField className="edit_field" color="success" type="text" placeholder="자택주소">  
    </TextField>
    <Button  className='edit_btn' variant='contained'  color="success">변경하기</Button>
    <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  );
};

export default EdithAddr;