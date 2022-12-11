import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import '../css/header.css';

function Timeline() {
  // const [events,setevents] = useState(useSelector(state => (state.dailyEvent)));
  
  // 임시 데이터
  const events = [
    {start:'2022-12-11 07:30', title:'기상', color:'#477e85'},
    {start:'2022-12-11 09:00', title:'출근', color:'#ffc847'},
    {start:'2022-12-11 12:30', title:'점심 식사', color:'#e6c2ce'},
    {start:'2022-12-11 18:00', title:'퇴근', color:'#ffc847'},

    {start:'2022-12-12 07:30', title:'기상', color:'#477e85'},
    {start:'2022-12-12 09:00', title:'출근', color:'#ffc847'},
    {start:'2022-12-12 12:30', title:'점심 식사', color:'#e6c2ce'},
    {start:'2022-12-12 18:00', title:'퇴근', color:'#ffc847'},

    {start:'2022-12-13 07:30', title:'기상', color:'#477e85'},
    {start:'2022-12-13 09:00', title:'출근', color:'#ffc847'},
    {start:'2022-12-13 12:30', title:'점심 식사', color:'#e6c2ce'},
    {start:'2022-12-13 18:00', title:'퇴근', color:'#ffc847'},

    {start:'2022-12-14 07:30', title:'기상', color:'#477e85'},
    {start:'2022-12-14 09:00', title:'출근', color:'#ffc847'},
    {start:'2022-12-14 12:30', title:'점심 식사', color:'#e6c2ce'},
    {start:'2022-12-14 18:00', title:'퇴근', color:'#ffc847'},
    {start:'2022-12-14 18:50', end:'2022-12-14 21:00', title:'회식', color:'#ffc847'},
    // {start:'2022-12-05 08:30', end: '2022-12-05 09:00', title:'출근', color:'#ffc847'},
    // {start:'2022-12-05 12:30', end: '2022-12-05 14:00', title:'점심식사', color:'#e6c2ce'},
    // {start:'2022-12-05 18:00', end: '2022-12-05 18:30', title:'퇴근', color:'#ffc847'},    
    // {start:'2022-12-08 19:00', title:'저녁 식사', color:'#e6c2ce'},
    // {start:'2022-12-08 20:00', title:'운동', color:'#477e85'},
    // {start:'2022-12-08 23:30', title:'취침', color:'#477e85'},

    // {start:'2022-12-05 19:00', end: '2022-12-05 20:00', title:'저녁식사', color:'#e6c2ce'},
  ].sort((a, b) => {
    if (parseInt(a.start.split(' ')[1]) > parseInt(b.start.split(' ')[1])) return 1;
    if (parseInt(a.start.split(' ')[1]) < parseInt(b.start.split(' ')[1])) return -1;
    return 0;
  });

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
        height={'85vh'}

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





