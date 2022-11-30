import React, { useState } from "react";
import ReactDOM from 'react-dom';
// import {Button} from '@material-ui/core';
import '../css/memo.css'
// import {StylesProvider} from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { Fab, Box } from '@mui/material';
import HeaderAlarm from './HeaderAlarm';

const MemoCompo = () => {
const [bookMark, setBookmark] = useState(false);

  return (
    <div>
      <HeaderAlarm></HeaderAlarm>
      {/* 메모 추가 기능 */}
      <a href="/AddMemo">      
      <Fab size="small" color="bebebe" variant="fab" disableElevation ><AddIcon></AddIcon></Fab>
      </a>
      <Memo date="10.13" title="오후 회의 준비"/>
      <Memo date="11.13" title="운동 가기"/>
      
    </div>
  )};



const Memo = ({date, title}) => {
  const [bookMark, setBookmark] = useState(false);
  return(
    <div style={{display:"flex", textDecoration:"none"}}>
      <div>
        {!bookMark ? <span onClick={() => {setBookmark(true)}} className="star_white">⭐</span> :
        <span onClick={() => {setBookmark(false)}} className="star_yellow">⭐</span>}
      </div>
      <div className="memo1">
        <font color="7e7e7e"><h3 style={{ display: 'inline' }}>{date}</h3></font>
        <h1>{title}</h1>
        <font color="7e7e7e"><h4>서류, 자료, 노트북 등 준비 철저히!</h4></font>
      </div>
    </div>
  )
};
export default MemoCompo;
