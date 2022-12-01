import FullCalendar from "@fullcalendar/react"; // must go before plugins
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material"; //mui의 Dialog

import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import axios from 'axios';

import greenee_surprise from '../img/greenee_surprise.png';

/* import { List, ListItem, ListItemText, Divider } from "@mui/material";
import interactionPlugin from "@fullcalendar/interaction";
import { NextPlan, Preview } from "@mui/icons-material"; */

const Calendar = () => {
  
  // 한 유저의 특별일정 전부
  const events = useSelector(state => (state.specialEvent));
  // const [events, setEvents] = useState(tempEvents);
  
  const nav = useNavigate();
  const dispatch = useDispatch();

  // 날짜별 일정 리스트 모달
  const [openList, setOpenList] = useState(false); //보관할 초기값
  // 일정 리스트 내 날짜 보여줄 상태값
  const [eventDate, setEventDate] = useState('');
  // 날짜별 일정 리스트 상세 내용 담을 리스트
  const [eventInfo, setEventInfo] = useState([]);
  
  // 일정 상세 모달
  const [openEvent, setOpenEvent] = useState(false);
  // 하나의 일정 상세를 보여줄 객체
  const [showEvent, setShowEvent] = useState({});

  // 일정 수정 모달
  const [openUpdate, setOpenUpdate] = useState(false);

  // 일정 삭제 모달
  const [openDelete, setOpenDelete] = useState(false);
  // 일장 아이디
  const [eventId, setEventId] = useState(0);

  useEffect(() => {
    const st = setTimeout(() => {
      const tds = document.querySelectorAll("#root > div > div:nth-child(1) > div > div > div.fc-view-harness.fc-view-harness-active > div > table > tbody > tr > td > div > div > div > table > tbody > tr > td")
      for (let el of tds) {
        el.addEventListener('click', () => {
          setEventDate(el.attributes[2].value);
          handleClick();
        });
      }
    }, 300);
  });


  const handleClick = () => {
    const clickedEvent = events.filter(data => {
      return data.start == eventDate;
    }).sort((a, b) => {
      if (a.sTime > b.sTime) return 1;
      if (a.sTime < b.sTime) return -1;
      return 0;
    });
    setOpenList(true);
    setEventInfo(clickedEvent);
  };

  const viewEvent = (e) => {
    const tempEvent = eventInfo[e.target.value];
    const sDate = tempEvent.start.slice(5);
    const eDate = tempEvent.end.slice(5);

    setShowEvent({ ...eventInfo[e.target.value], sDate, eDate });
    setOpenEvent(true);
    setEventId(tempEvent.event_id);
  };

  const deleteEvent = () => {
    const url = 'http://localhost:5000/lifeConcierge/api/deleteSpecialEvent'

    axios.post(url, { eventId })
        .then((res) => {
          if (res.data.affectedRows) {
            dispatch({ type: "ISEVENTADDED", isEventAdded: true });
            dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
            
            window.location.reload(); // 새로고침..
            // setOpenDelete(false);
            // setOpenEvent(false);
            // setOpenList(false);
            
          } else {
            dispatch({ type: "SNACKBAR/ON", snackbar: { snackbarToggle: true, explain: "일정 삭제 실패", severity: "error" } });
            dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
          }
        })
        .catch((err) => { console.log("에러 발생") });
  };

  return (
    <div>
      <FullCalendar //속성값들
        //  locale='ko' //한글 설정
        height={"700px"}
        titleformat={{
          day: "narrow",
        }}
        events={events}
        plugins={[dayGridPlugin]}
        //**이벤트별로 색 다르게 해야됨
        weekends={true}
        eventDisplay="list-item" //이벤트 모양? list-item, none
        eventColor="red"
        eventClick={handleClick}

        initialView="dayGridMonth"
        droppable={true}
        buttonIcons={
          {
            //버튼 아이콘?
          }
        }
        buttonText={{
          //버튼 안에 들어가는 텍스트
          today: "today",
          month: "month",
          week: "week",
          day: "day",
          list: "list",
        }}
        headerToolbar={{
          // 날짜, today, prev, next 순서
          start: "prev",
          center: "title",
          end: "next today", //today는 확인 후 지우기
        }}
        titleFormat={function (date) {
          if (date.date.month < 9) {
            return `${date.date.year}.${"0" + (date.date.month + 1)}`;
          }
          return `${date.date.year}년 ${date.date.month + 1}월`;
        }}
        dayNamesShort={["일", "월", "화", "수", "목", "금", "토"]}

      //  weekends={false} //주말 생성
      />

      <Dialog onClose={() => {setOpenList(false);}} open={openList}>
        {/* onClick={} 안에 함수이름 넣어야함 */}
        <tr>
          <td>
            <DialogTitle style={{ textAlign: 'center' }}>{eventDate}</DialogTitle>
          </td>
          <td>
            <Button onClick={() => { nav('/addEvent') }}>+</Button>
          </td>
        </tr>

        {eventInfo.map((data, idx) => {
          return <div style={{ width: '330px', padding: "0 10px" }}>
            <hr></hr>
            <span>{data.sTime}</span>
            <DialogTitle style={{textAlign: 'left'}}><span style={{ color: data.color }}>●</span> {data.title}</DialogTitle>
            <DialogContent>{data.content}</DialogContent>
            {/* <DialogActions> */}
            <Button onClick={viewEvent} value={idx}>일정 보기</Button>
            {/* </DialogActions> */}
          </div>
        })}
      </Dialog>

      <Dialog onClose={() => { setOpenEvent(false) }} open={openEvent}>
        <div style={{ width: '350px' }}>
          <DialogTitle style={{ textAlign: 'center', backgroundColor: showEvent.color }}>{showEvent.title}</DialogTitle>
          <table style={{ minWidth: "-webkit-fill-available", padding: '0 10px' }}>
            <tr>
              <td>
                <h4>장소</h4>
              </td>
              <td colSpan={3}>
                <p>{showEvent.eLocation ? showEvent.eLocation : '-'}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>내용</h4>
              </td>
              <td colSpan={3}>
                <p>{showEvent.content ? showEvent.content : '-'}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>시작일</h4>
              </td>
              <td>
                <p>{showEvent.sDate}</p>
              </td>
              <td>
                <h4>시간</h4>
              </td>
              <td>
                <p>{showEvent.sTime}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>종료일</h4>
              </td>
              <td>
                <p>{showEvent.eDate}</p>
              </td>
              <td>
                <h4>시간</h4>
              </td>
              <td>
                <p>{showEvent.eTime}</p>
              </td>
            </tr>
          </table>
          {/* <Button onClick={() => { setOpenUpdate(true) }}>수정</Button> */}
          <Link 
            to='/updateEvent'
            state= {{
              ...showEvent,
              start: showEvent.start + ' ' + showEvent.sTime,
              end: showEvent.end + ' ' + showEvent.eTime,
              preAlarm: parseInt(showEvent.preAlarm)
            }}
          >
            <Button>수정</Button>
          </Link>
         
          
          <Button onClick={() => { setOpenDelete(true) }}>삭제</Button>
        </div>
      </Dialog>

      <Dialog onClose={() => { setOpenDelete(false) }} open={openDelete}>
        <img src={greenee_surprise}></img>
        정말 일정을 삭제하시게요?!
        <Button onClick={deleteEvent}>응</Button>
        <Button onClick={() => { setOpenDelete(false) }}>아니야</Button>
      </Dialog>

      <Dialog onClose={() => { setOpenUpdate(false) }} open={openUpdate}>
        <div>
          dsad
        </div>
      </Dialog>

    </div>
  );
};

export default Calendar;
