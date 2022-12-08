import React, { useState } from "react";
import '../css/memo.css'
import { TextField } from '@mui/material';
import backback from "../img/backback2.png";
import trash from "../img/trash.png";
// import Button from "@mui/material/Button";
// import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import LabelBottomNavigation from "./LabelBottomNavigation";
import HeaderAlarm from "./HeaderAlarm";

// title, date, checkSpecial, content, 
const AddMemo = () => {
  const [memo, setMemo] = useState({
    
  });
  const [bookMark, setBookmark] = useState(false);
  const [title, setTitle] = useState("");
  const nav = useNavigate();

  const Testexplan = (event) => {
    nav('/Test_Explanation')
  }
  
  const testPage = (event) => {
    nav('/memo')
  }

  const handleTitle = () => {
    setTitle(title);
  }
  const handleMemo = (e) => [
    setMemo({...memo, content: e.target.name})
  ]
  return (
    <div style={{height:'100vh'}}>
      <HeaderAlarm></HeaderAlarm>
      <button onClick={testPage} className="home1_form">저장</button>
      <div className="top">
        <button className="button">
          <img onClick={testPage} className="arrow" src={backback}></img>
        </button>

        <img onClick={testPage} className="trash" src={trash}></img>

      </div>



      <div className="memo2">
        {!bookMark ? <span onClick={() => { setBookmark(true) }} className="star_white">⭐</span> :
          <span onClick={() => { setBookmark(false) }} className="star_yellow" star_yellow>⭐</span>}

        <font color="7e7e7e"><h3 style={{ display: 'inline' }}>10.20</h3>
        </font>

        <div className="home2_form">
          <input className="home_btn"/>
        </div>

        <div className="memo_text">
          {/* <font color="7e7e7e"></font> */}
          <TextField color="success" size="small" placeholder="메모" name="content" multiline rows={3} variant="outlined" onChange={handleMemo} />
          
        </div>

      </div>

      
      
      <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  )
}
export default AddMemo
