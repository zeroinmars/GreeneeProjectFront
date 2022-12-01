import React from "react";
import greenee from "../img/greenee.png";
import { Link } from "react-router-dom";
import '../css/test.css'
import { useSelector } from "react-redux";


const HeaderAlarm = () => {
  const userName = useSelector(state => (state.userName));
  const style = {
    backgroundColor: '#D7EDBC',
    display: 'flex'
  }
  return (
    <div style={style}>
      <Link to="/ChatPage">
        <img
          src={greenee}
          className={"greenee"}
          style={{ width: "110px", padding: "20px" }}
        />
      </Link>
      <div class="room-list-empty-room">
        {userName}님, 반가워요
      </div>
    </div>
  );
};

export default HeaderAlarm;