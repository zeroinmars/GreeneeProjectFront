import FullCalendar from "@fullcalendar/react"; // must go before plugins
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import {
  Rating,
  Table,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";

import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import axios from 'axios';

import greenee_surprise from '../img/greeneetears.png';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../css/calendar.css';


/* import { List, ListItem, ListItemText, Divider } from "@mui/material";
import interactionPlugin from "@fullcalendar/interaction";
import { NextPlan, Preview } from "@mui/icons-material"; */



const Calendar = () => {

  const [themeColor, setThemeColor] = useState('');
  const theme = createTheme({
    palette: {
      secondary: {
        main: (themeColor ? themeColor : '#2ecc71'),
        // main: ('#2ecc71')
      },
    },
  });

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
  // 일정 아이디
  const [eventId, setEventId] = useState(0);

  const [openNoticeList, setOpenNoticeList] = useState(false);
  const [openNoticeInfo, setOpenNoticeInfo] = useState(false);



  const [recommendLists, setRecommendList] = useState([
    // {
    //   title: "한남동 나른한 오후",
    //   image: "https://picsum.photos/200/300​",
    //   tel: "0507-1344-8722",
    //   start: "11:30",
    //   end: "22:00",
    //   location: " 광주 동구 지산동",
    // },
    // {
    //   title: "양만휘해물생합칼국수 본점",
    //   image: "https://picsum.photos/200/300​",
    //   tel: "062-222-7977",
    //   start: "11:00",
    //   end: "23:00",
    //   location: " 광주 동구 지산동",
    // },
    // {
    //   title: "샤오바오 충장로점",
    //   image: "https://picsum.photos/200/300​",
    //   tel: "0507-1453-8123",
    //   start: "11:00",
    //   end: "23:30",
    //   location: " 광주 동구 금남로2가",
    // },
    {
      title: "건반",
      tel: "0507-1344-8722",
      start: "11:30",
      end: "22:00",
      location: "인천광역시",
      info:"반려동물 영양제 정보, 비교"
    },
    {
      title: "생식선생",
      tel: "062-222-7977",
      start: "11:00",
      end: "23:00",
      location: "인천광역시",
      info:"반려동물 자연식, 수제간식물"
    },
    {
      title: "반려소반",
      tel: "0507-1453-8123",
      start: "11:00",
      end: "23:30",
      location: "인천광역시",
      info:"반려동물 간식물"
    },
    {
      title: "펫스니즈",
      tel: "0507-1453-8123",
      start: "11:00",
      end: "23:30",
      location: "인천광역시",
      info:"반려동물 건강검진 키트"
    },
  ]);
  const [openDetail, setOpenDetail] = useState(false);
  const [score, setScore] = useState(0);
  const [openScore, setOpenScore] = useState(false);
  const [openRecommend, setOpenRecommend] = useState(false);


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

    setShowEvent({ ...tempEvent, sDate, eDate });
    setOpenEvent(true);
    setEventId(tempEvent.event_id);
    setThemeColor(tempEvent.color)
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
        style={{ backgroundColor: 'white' }}
        height={"82vh"}
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

      <Dialog onClose={() => { setOpenList(false); }} open={openList}>
        {/* onClick={} 안에 함수이름 넣어야함 */}
        <div className="modal_pad">
          <div className='event_list_title'>
            <DialogTitle style={{ textAlign: 'center' }}>{eventDate}</DialogTitle>

            <Button className='event_add_btn' onClick={() => { nav('/addEvent') }}>일정 추가</Button>
          </div>

          {eventInfo.map((data, idx) => {
            return <div style={{ width: '320px', padding: "0 10px" }}>
              <hr></hr>
              <DialogTitle className="event_info_title">

                <span style={{ color: data.color }}>● </span>
                <span>{data.title} </span>
                <span> {data.sTime}</span>

              </DialogTitle>
              <DialogContent>
                {data.content ? <p>{data.content}</p> : <></>}
              </DialogContent>

              {/* <DialogActions> */}
              <Button className='event_list_btn' onClick={viewEvent} value={idx}>자세히 보기</Button>
              {/* </DialogActions> */}
            </div>
          })}
        </div>
      </Dialog>

      <Dialog onClose={() => { setOpenEvent(false) }} open={openEvent}>
        <div className="show_event_info">
          <DialogTitle className='show_event_title' style={{ backgroundColor: showEvent.color }}>{showEvent.title}</DialogTitle>
          <table className='show_event_table' >
            <tr>
              <td id='row_title'><span>장소</span></td>
              <td colSpan={3}><p>{showEvent.eLocation ? showEvent.eLocation : '-'}</p></td>
            </tr>
            <tr>
              <td id='row_title'><span>출발지</span></td>
              <td colSpan={3}><p>{showEvent.sLocation ? showEvent.sLocation : '-'}</p></td>
            </tr>
            <tr>
              <td id='row_title'><span>내용</span></td>
              <td colSpan={3}><p>{showEvent.content ? showEvent.content : '-'}</p></td>
            </tr>
            <tr>
              <td id='row_title'><span>시작일</span></td> <td><p>{showEvent.sDate}</p></td>
              <td id='row_title' style={{ paddingLeft: '15px' }}><span>시간</span></td> <td><p>{showEvent.sTime}</p></td>
            </tr>
            <tr>
              <td id='row_title'><span>종료일</span></td> <td><p>{showEvent.eDate}</p></td>
              <td id='row_title'><span>시간</span></td> <td><p>{showEvent.eTime}</p></td>
            </tr>
            <tr>
              <td id='row_title'><span>이동 시간(자가용)</span></td>
              <td><p>{showEvent.moveTime ? showEvent.moveTime : '-'}</p></td>
            </tr>
          </table>
          {/* <Button onClick={() => { setOpenUpdate(true) }}>수정</Button> */}

          <div className="button_check">
            <ThemeProvider theme={theme}>
              <Link
                to='/updateEvent'
                state={{
                  ...showEvent,
                  start: showEvent.start + ' ' + showEvent.sTime,
                  end: showEvent.end + ' ' + showEvent.eTime,
                  preAlarm: parseInt(showEvent.preAlarm)
                }}
                style={{ textDecoration: "none" }}
              >
                <Button className="button_deny" variant="contained" color='secondary' size="medium"
                  style={{ color: 'white', font: 'bold' }}> 수정</Button>
              </Link>
              <Button className="button_accept" variant="contained" color='secondary' size="medium"
                onClick={() => { setOpenDelete(true) }}
                style={{ color: 'white', font: 'bold' }}>삭제</Button>
            </ThemeProvider>
          </div>
          <div className="recommend_Check">
            <p>"{showEvent.title}" 관련 그리니가 추천한 내용</p>
            <button style={{ color: 'white' }}
              className="suc"
              onClick={() => {
                setOpenRecommend(true);
              }}
            >
              보기
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog onClose={() => { setOpenDelete(false) }} open={openDelete}>
        <div className="delete_event">
          <DialogTitle className='delete_event_title' style={{ backgroundColor: showEvent.color }}>
          {showEvent.sDate} {showEvent.title}
          </DialogTitle>
          <img className="ask_greenee" src={greenee_surprise}></img>
          <DialogContent><p>정말 일정을 삭제하시게요?!</p></DialogContent>

          <ThemeProvider theme={theme}>

            <Button className="button_deny" variant="contained" color='secondary' size="medium"
              onClick={deleteEvent} style={{ color: 'white', font: 'bold' }}> 응</Button>
            <Button className="button_accept" variant="contained" color='secondary' size="medium"
              onClick={() => { setOpenDelete(false) }}
              style={{ color: 'white', font: 'bold' }}>아니</Button>

          </ThemeProvider>

        </div>
      </Dialog>
      <Dialog
        className="recommend_list"
        onClose={() => {
          setOpenRecommend(false);
        }}
        open={openRecommend}
      >
        <div className="modal_pad">
          <DialogTitle className="recommend_title"
          >
            <p
              className="bacc"
              onClick={() => {
                setOpenRecommend(false);
              }}
            >
              뒤로
            </p>{" "}
            이런 곳은 어때요?
          </DialogTitle>
          <DialogContent>
            {recommendLists.map((data, list) => (
              <div>
                <div key={list} style={{ display: "flex" }}>
                  <Table>
                    {/*    <img style={{float:"right"}} src="http://via.placeholder.com/10.png/09f/fff​" alt={data.image} />  */}

                    <TableRow>
                      <TableCell
                        colspan={2}
                        style={{ fontSize: "20px", fontWeight: "1000" }}
                        className=''
                      >
                        {data.title}
                      </TableCell>
                    </TableRow>

                    {/* <TableRow>
                      <TableCell>영업시간</TableCell>
                      <TableCell>
                        {data.start} - {data.end}
                      </TableCell>
                    </TableRow> */}
                    <TableRow>
                      <TableCell>정보</TableCell>
                      <TableCell>{data.info}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>장소</TableCell>
                      <TableCell>{data.location}</TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell>전화번호</TableCell>
                      <TableCell>{data.tel}</TableCell>
                    </TableRow> */}
                  </Table>
                </div>
                <div style={{ position: "relative", right: "-120px", margin: '10px 0' }}>
                  <Button
                    sx={{ marginRight: '5px', background: '#f39c12', borderRadius: '20px', color: '#fff !important' }}
                    onClick={() => {
                      setOpenDetail(true);
                    }}
                  >
                    자세히보기
                  </Button>
                  <Button
                    sx={{ background: '#f39c12', borderRadius: '20px', color: '#fff !important' }}
                    onClick={() => {
                      // setOpenRecommend(false);
                      setOpenScore(true);
                    }}
                  >
                    좋아요!
                  </Button>
                </div>


              </div>
            ))}
          </DialogContent>
        </div>
      </Dialog>

      <Dialog
        onClose={() => {
          setOpenScore(false);
        }}
        open={openScore}
      >
        <div className="modal_pad">
          <DialogTitle sx={{ padding:'10px 24px',textAlign:'center', background: '#2ecc71', color: '#fff', borderRadius: '20px', fontSize: '20px' }}>좋아요!</DialogTitle>
          <DialogContent>
            <Rating
              style={{textAlign:'center', marginTop:'10px'}}
              name="score"
              value={score}
              onChange={(event, newValue) => {
                setScore(newValue);
              }}
            />
          </DialogContent>
          <DialogActions style={{marginLeft:'10px'}}>
            <Button
              
              onClick={() => {
                setOpenScore(false);
              }}
            >
              다음에 하기
            </Button>
            <Button
              sx={{ background: '#f39c12 !important', color: '#fff !important', borderRadius: '15px' }}
              onClick={() => {
                setOpenScore(false);
                setOpenNoticeInfo(false);
                setOpenNoticeList(false);
              }}
            >
              제출
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* <Dialog
        onClose={() => {
          setOpenDetail(false);
        }}
        open={openDetail}
      >
        <div className="modal_pad">
          <DialogTitle sx={{ background: '#2ecc71', color: '#fff', textAlign: 'center', borderRadius: '20px' }}>한남동 나른한 오후 </DialogTitle>
          <DialogContent>
            <Table>
              <TableRow>
                <TableCell>메뉴</TableCell> <TableCell> 돈까스, 카레, 김밥</TableCell>{" "}
              </TableRow>
              <TableRow>
                <TableCell>방문자 사진</TableCell> <TableCell></TableCell>{" "}
              </TableRow>
              <TableRow>
                <TableCell>방문자 리뷰</TableCell> <TableCell></TableCell>{" "}
              </TableRow>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenScore(false);
                setOpenNoticeInfo(false);
                setOpenNoticeList(false);
              }}
            >
              좋아요!
            </Button>
          </DialogActions>
        </div>
      </Dialog> */}

      {/* <Dialog onClose={() => { setOpenUpdate(false) }} open={openUpdate}>
        <div>
          dsad
        </div>
      </Dialog> */}

    </div>
  );
};

export default Calendar;
