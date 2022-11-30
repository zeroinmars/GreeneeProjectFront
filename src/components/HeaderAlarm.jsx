import React from "react";
import greenee from "../img/greenee.png";
import { Link } from "react-router-dom";
/* import TalkChat from './chatbot/TalkChat' */
const style={
  backgroundColor:'#D7EDBC'
  }

const HeaderAlarm = () => {
  return (
    <tt className='HeaderAlarm2'>
    <div style={style}>
      <div>
        <div className='HeaderAlarmBC'>
      

                {/* 챗봇 진입 */}
         <Link to="/ChatPage">
         <img
            src={greenee}
            className={"greenee"}
            style={{ width: "70px", padding: "20px"}}
          />
      </Link> 



        </div>
        {/* <div>여기에 실시간 알림?</div> */}
      </div>
    </div>
    </tt>
  );
};

export default HeaderAlarm;