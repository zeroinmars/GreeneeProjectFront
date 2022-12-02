import React, { useState } from "react";
import HeaderAlarm from './HeaderAlarm';
import '../css/memo.css'
// import {Button} from '@material-ui/core';
// import {StylesProvider} from "@material-ui/core";
import ReactDOM from 'react-dom';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

const MemoCompo = () => {
  const [bookMark, setBookmark] = useState(false);
  const nav = useNavigate();
  return (
    <div style={{ height: '100vh' }}>
      <HeaderAlarm></HeaderAlarm>

      <div>

        <button className="memo_won" onClick={() => {nav('/AddMemo')}}>
        <span>+</span>
          </button>

      </div>

      <Memo date="10.13" title="오후 회의 준비" text="회의자료 이것저것 요것조것 챙겨서 준비할것" />
      <Memo date="11.13" title="운동 가기" text="오전 필라테스 가볍게 하러 가기" />
      <Memo date="11.25" title="롯데월드 예정" text="길동이 둘리 또치 만나서 롯데월드가기" />

    </div>

  )
};



const Memo = ({ date, title, text }) => {
  const [bookMark, setBookmark] = useState(false);

  return (
    <div style={{ display: "flex", textDecoration: "none" }}>
      <div>
        {!bookMark ? <span onClick={() => { setBookmark(true) }} className="star_white">⭐</span> :
          <span onClick={() => { setBookmark(false) }} className="star_yellow">⭐</span>}
      </div>

      <div className="memo1">
        <font color="7e7e7e"><h3 style={{ display: 'inline' }}>{date}</h3></font>
        <h1>{title}</h1>
        <font color="7e7e7e"><h4>{text}</h4></font>
      </div>
    </div>
  )
};
export default MemoCompo;
