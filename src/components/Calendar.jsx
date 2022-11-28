import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material"; //mui의 Dialog
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
/* import { List, ListItem, ListItemText, Divider } from "@mui/material";
import interactionPlugin from "@fullcalendar/interaction";
import { NextPlan, Preview } from "@mui/icons-material"; */

const Calendar = () => {
  const events = useSelector(state => (state.specialEvent));

  const nav = useNavigate();
  const [open, setOpen] = useState(false); //보관할 초기값
  const [eventInfo, setEventInfo] = useState([]);
  const [eventDate, setEventDate] = useState('');

  const handleClick = () => {
    const clickedEvent = events.filter(data => { 
      return data.start == eventDate 
    }).sort((a, b) => {
      if (a.sTime > b.sTime) return 1;
      if (a.sTime < b.sTime) return -1;
      return 0;
    })
    setOpen(true);
    setEventInfo(clickedEvent);
    // console.log(clickedEvent);
  };

  // 
  useEffect(() => {

    const st = setTimeout(() => {
      const tds = document.querySelectorAll("#root > div > div:nth-child(1) > div > div > div.fc-view-harness.fc-view-harness-active > div > table > tbody > tr > td > div > div > div > table > tbody > tr > td")
      for (let el of tds) {
        el.addEventListener('click', () => {
          setEventDate(el.attributes[2].value);
          handleClick();
        })
      }
    }, 300)
  })

  const handleClose = () => {
    setOpen(false);
  };

  const viewEvent = () => {
  };

  const eventFunction = () => {
    console.log('성공?');
  }

  // DB 연결 전 임시로 데이터 만들어 봄
  // const events = [
  //   { title: "", start: "2022-11-28", end:'2022-11-30',color: 'red' },
  //   { title: "event 2", date: "2022-11-22" },
  //   {
  //     title: "회식", date: "2022-11-19",
  //     color: 'pink', content: "개싫은 부장님이랑 밥먹기;;",
  //     sTime: '19:00'
  //   },
  //   {
  //     title: "회의", date: "2022-11-19",
  //     color: 'yellow', content: "넘 귀찮음",
  //     sTime: '16:00', eTime: '17:30'
  //   },
  //   {
  //     title: "등산하기", date: "2022-11-19",
  //     color: 'rgb(71, 126, 133)',
  //     content: "자고싶은데 부장님이 가자 함",
  //     sTime: '09:00'
  //   }
  // ]


  return (
    <div>
      <button onClick={() => { console.log(events) }}>이벤트 정보 확인</button>
      <button onClick={() => { console.log(events[16].date) }}>이벤트 정보 확인</button>
      <FullCalendar //속성값들
        //  locale='ko' //한글 설정
        height={"700px"}
        titleformat={{
          day: "narrow",
        }}
        events={events}
        //**이벤트별로 색 다르게 해야됨
        weekends={true}
        eventDisplay="list-item" //이벤트 모양? list-item, none
        eventColor="red"
        eventClick={handleClick}

        plugins={[dayGridPlugin]}
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
      <Dialog onClose={handleClose} open={open}>
        {/* onClick={} 안에 함수이름 넣어야함 */}
        <tr>
          <td>
            <h3>{eventDate}</h3>
          </td>
          <td>
            <Button onClick={() => { nav('/addEvent') }}>+</Button>
          </td>
        </tr>

        {eventInfo.map((data) => {
          const color = data.tag.slice(-9,-2);
          // const color = data.color
          return <div style={{ width: '330px', padding: "0 10px" }}>
            <hr></hr>
            <span>{data.sTime}</span>
            <DialogTitle><span style={{ color: color }}>●</span> {data.title}</DialogTitle>
            <DialogContent>{data.content}</DialogContent>
            {/* <DialogActions> */}
            <Button onClick={viewEvent}>일정 보기</Button>
            {/* </DialogActions> */}
          </div>
        })}
      </Dialog>
    </div>
  );
};

export default Calendar;
