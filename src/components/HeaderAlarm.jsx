import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";

import greenee from "../img/greenee.png";
import '../css/header.css';


const HeaderAlarm = () => {
  const userName = useSelector(state => (state.userName));
  const [specialEvent, setSpecialEvent] = useState([]);
  const event = useSelector(state => (state.specialEvent));
  const [noticeNum, setNoticeNum] = useState(0);
  const [notiveInfo, setNoticeInfo] = useState([]);
  const [openNotice, setOpenNotice] = useState(false);
  
  const talk = [
    `${userName}님, 오늘 기분은 어떠신가요?`,
    `${userName}님, 집을 잃은 제 심정을 아시나요?`,
    `${userName}님께 즐거운 일만 가득하길..❤️`,
    `배가 고프네요. 지구인은 뭘 먹고 사나요?`,
    `내 이름은 그리니! 탐정이죠.`,
    `오늘도 황동석 부장이 야단쳤나요? \n담궈줄까요?`
  ]
  const talkIdx = Math.floor((Math.random() * 6));
  const grnTalk = talk[talkIdx];

  // 진짜 데이터로 해보기
  useEffect(() => {
    if (specialEvent) {
      const events = specialEvent.filter(data => {
        const dataDate = data.start.split('-').map(data => { return parseInt(data); });
        const [year, month, day] = dataDate;
        const today = new Date().toLocaleString().split(' ').slice(0, 3).map(data => { return parseInt(data); });
        const [tYear, tMonth, tDay] = today;
        return year == tYear && month == tMonth && day == tDay;
      });
      setNoticeInfo(events);
      setNoticeNum(events.length);
    }

  }, [specialEvent]);

  // setTimeout(() => {
  //   if (talk[talkIdx] == grnTalk) {
  //     setGrnTalk('당신의 비서, 그리니입니다.')
  //   } else if (talkIdx <= 3) {
  //     setGrnTalk(talk[talkIdx].replace('userName', userName));
  //   } else {
  //     setGrnTalk(talk[talkIdx]);
  //   }
  // }, 5000) // 10분마다 그리니 대화 바꾸기 600000




  const checkAlarm = () => {

  }

  // 임시 알림 데이터. preAlarm 값 여부로 미리 필터 했다고 가정
  // preAlarm이 있어야 알림을 주는 일정인 것
  // 시작 날짜나 시간이 없는데 preAlarm 값을 넣는 등의 예외는 일단 무시.
  // const notiveInfo = [
  //   {title: '회식', start:'2022-12-03', sTime:'18:30', eTime:'21:00', preAlarm: 60, eLocation:'광주 서구 경열로 33', color:'red'},
  //   {title: '미팅', start:'2022-12-03', sTime:'15:00', eTime:'17:00', preAlarm: 30, eLocation:'광주 동구청', color:'blue'},
  // ].map((data) => {
  //   const [year, month, day] = data.start.split('-');
  //   const [hour, minute] = data.sTime.split(':');

  //   const date = `${year}년 ${month}월 ${day}일`;
  //   const time = `${hour}시 ${minute}분`;

  //   const eventDate = new Date(data.start +' '+ data.sTime);
  //   const ms = data.preAlarm * 60 * 1000;
  //   const alarmTime = new Date(eventDate - ms);

  //   return (
  //     <div onClick={checkAlarm}>
  //       <hr></hr>

  //       <span style={{ color: 'red' }}> ● </span>
  //         {alarmTime.toLocaleString()}


  //        <br></br>
  //       <h5 style={{display:'inline'}}>{data.title}</h5> 
  //       일정이 <strong>{data.preAlarm}분</strong> 후에 시작합니다. <br></br>

  //       시작 시간: {date} {time} <br></br>



  //     </div>
  //   );
  // })

  const deleteNotice = () => {

  }
  return (
    <div>

      {!noticeNum ?
        <div className="header_area">
          <Link to="/ChatPage">
            <img
              src={greenee}
              className={"greenee"}
              style={{ width: "110px", padding: "20px" }}
            />
          </Link>
          <div class="room-list-empty-room">
            <span>{grnTalk}</span>
          </div>
        </div>
        :
        <div className="header_area">
          <img
            onClick={() => { setOpenNotice(true) }}
            src={greenee}
            className={"greenee"}
            style={{ width: "110px", padding: "20px" }}
          />
          <div className="notice" onClick={() => { setOpenNotice(true) }}><span>{noticeNum}</span></div>

          <div class="room-list-empty-room">
            <span>읽지 않은 알림이 {noticeNum}개 있어요!</span>
          </div>
        </div>
      }

      <Dialog onClose={() => { setOpenNotice(false) }} open={openNotice}>
        <h4 style={{ textAlign: 'center' }}>알림</h4>
        {notiveInfo.map((data) => {
          const [year, month, day] = data.start.split('-');
          const [hour, minute] = data.sTime.split(':');

          const date = `${year}년 ${month}월 ${day}일`;
          const time = `${hour}시 ${minute}분`;

          const eventDate = new Date(data.start + ' ' + data.sTime);
          const ms = data.preAlarm * 60 * 1000;
          const alarmTime = new Date(eventDate - ms);

          return (
            <div onClick={checkAlarm}>
              <hr></hr>

              <span style={{ color: 'red' }}> ● </span>
              {alarmTime.toLocaleString()}


              <br></br>
              <h5 style={{ display: 'inline' }}>{data.title}</h5>
              일정이 <strong>{parseInt(data.preAlarm)}분</strong> 후에 시작합니다. <br></br>

              시작 시간: {date} {time} <br></br>
            </div>
          );
        })}
      </Dialog>

    </div>
  );
};

export default HeaderAlarm;