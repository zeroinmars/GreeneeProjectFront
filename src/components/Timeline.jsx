import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FullCalendar from '@fullcalendar/react' // must go before plugins
// import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


function Timeline() {
  const dailyEvent = useSelector(state => (state.dailyEvent));
  useEffect(() => {
    setEvents(dailyEvent);
  })

  const check = () => {

    console.log(JSON.parse(dailyEvent[9].checkWeeks))
  }
  const [events, setEvents] = useState([]);
  // 임시 데이터
  const data = [
    { start: '2022-11-30 09:30', end: '2022-11-30 10:40', title: 'dsa', },
    { start: '2022-11-30 09:50', end: '2022-11-30 09:55', title: 'dsa' },
    { start: '2022-12-01 09:30', end: '2022-12-01 10:40', title: 'dsa' },
    { start: '2022-12-01 09:30', end: '2022-12-01 10:40', title: 'dsa' },
    { start: '2022-12-01 09:30', end: '2022-12-01 10:40', title: 'dsa' },
    { start: '2022-12-01 09:30', end: '2022-12-01 10:40', title: 'dsa' },

  ]
  return (
    <>
      <button onClick={check}>check</button>
      <FullCalendar
        plugins={[listPlugin]}
        initialView='listDay'
        titleFormat={
          function (date) {
            let year = date.date.year - 2000;
            let month = date.date.month + 1;
            let day = date.date.day;
            return `${year}. ${month < 10 ? '0' + month : month}. ${day < 10 ? '0' + day : day}.`
          }}
        events={data}
        eventBorderColor='white'
        locale='ko'
        height={'700px'}
        
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false
        }}

        eventTextColor={'black'}

        headerToolbar={{
          // 날짜, today, prev, next 순서
          start: "prev",
          center: "title",
          end: "next today", //today는 확인 후 지우기
        }}
      />
    </>
  );
}
export default Timeline;





