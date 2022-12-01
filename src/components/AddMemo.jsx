import React, { useState } from "react";
import '../css/memo.css'
// import { Fab, Box } from '@mui/material';
import backback from "../img/backback2.png";
import trash from "../img/trash.png";
// import Button from "@mui/material/Button";
// import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';


// title, date, checkSpecial, content, 
const AddMemo = () => {
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

  return (
    <div>
      <div className="top">
      <button className="button">
        <img className="arrow" src={backback}></img>
      </button>

        <img onClick={testPage} className="trash" src={trash}></img>

      </div>

      <div className="memo2">
        
          {!bookMark ? <span onClick={() => { setBookmark(true) }} className="star_white">⭐</span> :
          <span onClick={() => { setBookmark(false) }} className="star_yellow" star_yellow>⭐</span>}
          <font color="7e7e7e"><h3 style={{ display: 'inline' }}>10.20</h3>
        </font>

        <div className="home2_form">
          <button className="home_btn">푸라닭 치킨 4종류 먹기</button>
        </div>

        <font color="7e7e7e"><h4>오늘 푸라닭 치킨 먹으러 간다. 블라블라</h4></font>

      </div>

      <div>
      <button className="home1_form">저장</button>
      </div>

    </div>
  )
}
export default AddMemo
