import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";

import greenee from "../img/greenee.png";
import '../css/header.css';


const HeaderAlarm = () => {
  const reduxEvent = useSelector(state => (state.specialEvent));
  const userName = useSelector((state) => state.userName);
  const [specialEvent, setSpecialEvent] = useState([]);
  const [noticeNum, setNoticeNum] = useState(0);

  useEffect(() => {
    // console.log(noticeNum)
    // console.log(reduxEvent)
    // if (reduxEvent && reduxEvent != '없는 계정') {
    //   setSpecialEvent(reduxEvent);
    //   setNoticeNum(reduxEvent.length);
    // }
  })
  
  const showNoticeInfo = (e) => {
    const notice = specialEvent[e.target.id];
    const sDate = notice.start.slice(5);
    const eDate = notice.end.slice(5);
    
    
    const tempInfo = (
      <div style={{ width: '350px', paddingBottom: '25px' }}>
        <DialogTitle style={{ textAlign: 'center', backgroundColor: notice.color }}>{notice.title}</DialogTitle>
        <table className='calendar_table' >
          <tr>
            <td id='row_title'><span>장소</span></td>
            <td colSpan={3}><p>{notice.eLocation ? notice.eLocation : '-'}</p></td>
          </tr>
          <tr>
            <td id='row_title'><span>출발지</span></td>
            <td colSpan={3}><p>{notice.sLocation ? notice.sLocation : '-'}</p></td>
          </tr>
          <tr>
            <td id='row_title'><span>내용</span></td>
            <td colSpan={3}><p>{notice.content ? notice.content : '-'}</p></td>
          </tr>
          <tr>
            <td id='row_title'><span>시작일</span></td> <td><p>{sDate}</p></td>
            <td id='row_title' style={{ paddingLeft: '15px' }}><span>시간</span></td> <td><p>{notice.sTime}</p></td>
          </tr>
          <tr>
            <td id='row_title'><span>종료일</span></td> <td><p>{eDate}</p></td>
            <td id='row_title'><span>시간</span></td> <td><p>{notice.eTime}</p></td>
          </tr>
          <tr>
            <td id='row_title'><span>이동 시간</span></td>
            <td><p>{notice.moveTime ? notice.moveTime : '-'}</p></td>
          </tr>
        </table>
      </div>
    );
    setNoticeInfo(tempInfo);
    setOpenNoticeInfo(true);
  }

  // 임시 알림 데이터. preAlarm 값 여부로 미리 필터 했다고 가정
  // preAlarm이 있어야 알림을 주는 일정인 것
  // 시작 날짜나 시간이 없는데 preAlarm 값을 넣는 등의 예외는 일단 무시.
  const events = [
    {
      title: "회식",
      start: "2022-12-08",
      end: "2022-12-08",
      sTime: "18:30",
      eTime: "19:30",
      preAlarm: 60,
      sLocation: "광주 동구 서남로 1",
      content: "회식하기 시러",
      moveTime: "23분",
      eLocation: "광주 서구 경열로 33",
      color: "#ffc847",
    },
    {
      title: '헬스', start: '2022-12-08', end: '2022-12-08',
      sTime: '20:00', eTime: '21:00',
      preAlarm: 30, sLocation: '광주 서구 경열로 33', content: '회식 후 헬스!', moveTime: '5분', eLocation: '광주 서구 죽봉대로 37', color: 'rgb(71, 126, 133)'
    },
  ];

  const [noticeInfo, setNoticeInfo] = useState("");
  const [openNoticeList, setOpenNoticeList] = useState(false);
  const [openNoticeInfo, setOpenNoticeInfo] = useState(false);

  const talk = [
    `${userName}님, 오늘 기분은 어떠신가요?`,
    `${userName}님, 건강이 최우선이라고 하더군요!`,
    `${userName}님께 즐거운 일만 가득하길..`,
    `배가 고프네요. 지구인은 뭘 먹고 사나요?`,
<<<<<<< HEAD
    `내 이름은 그리니! 탐정이죠.`,
    `오늘은 어떤 일이 일어날까요?`
  ]
  const talkIdx = Math.floor((Math.random() * 6));
=======
    `오늘은 어떤 일이 일어날까요?`,
  ];
  const talkIdx = Math.floor(Math.random() * 6);
>>>>>>> 7c87b06287c1cd61b19a4ff431acd053e3c1a479
  const grnTalk = talk[talkIdx];

  // 진짜 데이터로 해보기
  // useEffect(() => {
  //   if (specialEvent) {
  //     const events = specialEvent.filter(data => {
  //       const dataDate = data.start.split('-').map(data => { return parseInt(data); });
  //       const [year, month, day] = dataDate;
  //       const today = new Date().toLocaleString().split(' ').slice(0, 3).map(data => { return parseInt(data); });
  //       const [tYear, tMonth, tDay] = today;
  //       return year == tYear && month == tMonth && day == tDay;
  //     });
  //     setNoticeInfo(events);
  //     setNoticeNum(events.length);
  //   }

  // }, [specialEvent]);

  // setTimeout(() => {
  //   if (talk[talkIdx] == grnTalk) {
  //     setGrnTalk('당신의 비서, 그리니입니다.')
  //   } else if (talkIdx <= 3) {
  //     setGrnTalk(talk[talkIdx].replace('userName', userName));
  //   } else {
  //     setGrnTalk(talk[talkIdx]);
  //   }
  // }, 5000) // 10분마다 그리니 대화 바꾸기 600000



  const deleteNotice = () => {

  }

  return (
    <div>

      {!noticeNum ?
        <div className="header_area">
          <Link to="/Chatpage">
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
            onClick={() => { setOpenNoticeList(true) }}
            src={greenee}
            className={"greenee"}
            style={{ width: "110px", padding: "20px" }}
          />
          <div className="notice" onClick={() => { setOpenNoticeList(true) }}><span>{noticeNum}</span></div>

          <div class="room-list-empty-room">
            <span>읽지 않은 알림이 {noticeNum}개 있어요!</span>
          </div>
        </div>
      }

      <Dialog
        onClose={() => {
          setOpenNoticeList(false);
        }}
        open={openNoticeList}
      >
        <div className="modal_pad">
          <h4 className="alarm_list_title">알림</h4>
          {typeof specialEvent == 'object' && specialEvent.length  ? specialEvent.map((data, idx) => {
            const [year, month, day] = data.start.split("-");
            const [hour, minute] = data.sTime.split(":");

            const date = `${year}년 ${month}월 ${day}일`;
            const time = `${hour}시 ${minute}분`;

            const eventDate = new Date(data.start + " " + data.sTime);
            const ms = data.preAlarm * 60 * 1000;
            const alarmTime = new Date(eventDate - ms);

            return (
              <div>
                <hr></hr>
                <div>
                  <span style={{ color: data.color }}> ● </span>
                  {alarmTime.toLocaleString()}
                </div>
                <br></br>
                <div>
                  <h4 className="alarm_title">{data.title} </h4>
                  <h5 style={{ display: 'inline' }}>일정이 <strong>{parseInt(data.preAlarm)}분</strong> 후에 시작합니다.</h5>
                </div>
                <br></br>
                <div>
                  시작 시간: {date} {time}
                </div>
                <button className="event_list_btn" id={idx} onClick={showNoticeInfo}>  자세히 보기 </button>
              </div>
            );
          }) : "none"}
        </div>
      </Dialog>

      <Dialog onClose={() => { setOpenNoticeInfo(false) }} open={openNoticeInfo}>
        {noticeInfo}
      </Dialog>
    </div>
  );
};

export default HeaderAlarm;