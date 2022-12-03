import { useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { InputBase, Box, InputLabel, FormControl, OutlinedInputProps, Button } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Edit from "../../../css/Edit.css";
import backback from "../Mypageimg/backback.png"
import LabelBottomNavigation from "../../LabelBottomNavigation";

function editNick() {

  const goback = () => {
    window.history.back();
  }

  return(
    <div className='page'>
    <Button className='edit_back' onClick={goback}><img src={backback} className='back_btn' /></Button>
    <div className='h_line'>닉네임 변경</div>
    <TextField className="edit_field" color="success" type="text" placeholder="닉네임">  
    </TextField>
    <Button  className='edit_btn' variant='contained'  color="success">변경하기</Button>
    <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  );
};

export default editNick;