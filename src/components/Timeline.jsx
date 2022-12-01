import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import '../css/test.css';

function Timeline() {
  // const [events,setevents] = useState(useSelector(state => (state.dailyEvent)));
  
  // 임시 데이터
  const events = [
    // { start: '2021-01-01 00:00', end: '2032-01-10 00:00', color: '#efefef', title: '' },
    { start: '2022-11-30 09:30', end: '2022-12-01 17:04', title: 'dsa', display:'none'},
    { start: '2022-11-30 09:50', end: '2022-11-30 09:55', title: 'a' },
    { start: '2022-12-01 09:30', end: '2022-12-01 10:40', title: 'dsa' },
    { start: '2022-12-01 09:30', end: '2022-12-01 10:40', title: 'dsa' },
    { start: '2022-12-01 09:30', end: '2022-12-31 10:40', title: '일정' },
    { start: '2022-12-01', end: '2022-12-10', title: 'dasdsda', weekday: '목요일' },
  ]

  return (
    <>
      <FullCalendar
        // plugins={[timeGridPlugin]}
        // initialView='timeGridDay'
        // allDaySlot={false}
        plugins={[listPlugin]}
        initialView='listDay'

        eventClassNames='test'
        // dayCellClassNames={'test'}
        // viewClassNames='test'  // 일정이 있는 전체적인 화면
        dayHeaderClassNames={'test'}  // 요일이 써져있는 부분
        weekNumberClassNames='test'
        titleFormat={
          function (date) {
            const year = date.date.year - 2000;
            const month = date.date.month + 1;
            const day = date.date.day;
            return `${year}. ${month < 10 ? '0' + month : month}. ${day < 10 ? '0' + day : day}.`
          }}
        locale='ko'
        timeZone='local'
        height={'700px'}

        headerToolbar={{
          // 날짜, today, prev, next 순서
          start: "prev",
          center: "title",
          end: "next today", //today는 확인 후 지우기
        }}

        eventTimeFormat={{
          hour: 'numeric',
          minute: 'numeric',
          meridiem: false,
          hour12: false
        }}
        // noEventsContent={{}}

        listDayFormat={{
          weekday: 'long'
        }}
        // events={tempEvents}
        events={events}
        eventTextColor='black'
        
      // hiddenDays={[1, 2, 3, 4]}
      />
    </>
  );
}
export default Timeline;





