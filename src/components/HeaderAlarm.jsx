import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

import greenee from "../img/greenee.png";
import "../css/header.css";
import "./HeaderAlarm.css";

const HeaderAlarm = () => {
  const [recommendLists, setRecommendList] = useState([
    {
      title: "한남동 나른한 오후",
      image: "https://picsum.photos/200/300​",
      tel: "0507-1344-8722",
      start: "11:30",
      end: "22:00",
      location: " 광주 동구 지산동",
    },
    {
      title: "양만휘해물생합칼국수 본점",
      image: "https://picsum.photos/200/300​",
      tel: "062-222-7977",
      start: "11:00",
      end: "23:00",
      location: " 광주 동구 지산동",
    },
    {
      title: "샤오바오 충장로점",
      image: "https://picsum.photos/200/300​",
      tel: "0507-1453-8123",
      start: "11:00",
      end: "23:30",
      location: " 광주 동구 금남로2가",
    },
  ]);
  const [openDetail, setOpenDetail] = useState(false);
  const [score, setScore] = useState(0);
  const [openScore, setOpenScore] = useState(false);
  const [openRecommend, setOpenRecommend] = useState(false);
  const userName = useSelector((state) => state.userName);
  // const [specialEvent, setSpecialEvent] = useState(state => (state.specialEvent));
  // const event = useSelector();
  // const [noticeList, setNoticeInfo] = useState([]);

  // const theme = createTheme({
  //   palette: {
  //     secondary: {
  //       main: (themeColor? themeColor : '#2ecc71'),
  //       // main: ('#2ecc71')
  //     },
  //   },
  // });

  const showNoticeInfo = (e) => {
    const notice = events[e.target.id];
    const sDate = notice.start.slice(5);
    const eDate = notice.end.slice(5);

    const tempInfo = (
      <div className="dd">
        <DialogTitle
          style={{ textAlign: "center", backgroundColor: notice.color }}
        >
          {notice.title}
        </DialogTitle>
        <table className="calendar_table">
          <tr>
            <td id="row_title">
              <span>장소</span>
            </td>
            <td colSpan={3}>
              <p>{notice.eLocation ? notice.eLocation : "-"}</p>
            </td>
          </tr>
          <tr>
            <td id="row_title">
              <span>출발지</span>
            </td>
            <td colSpan={3}>
              <p>{notice.sLocation ? notice.sLocation : "-"}</p>
            </td>
          </tr>
          <tr>
            <td id="row_title">
              <span>내용</span>
            </td>
            <td colSpan={3}>
              <p>{notice.content ? notice.content : "-"}</p>
            </td>
          </tr>
          <tr>
            <td id="row_title" className="ggg2">
              <span>시작일</span>
            </td>{" "}
            <td>
              <p>{sDate}</p>
            </td>
            <td id="row_title" className="ggg">
              <span>시간</span>
            </td>{" "}
            <td>
              <p>{notice.sTime}</p>
            </td>
          </tr>
          <tr>
            <td id="row_title">
              <span>종료일</span>
            </td>{" "}
            <td>
              <p>{eDate}</p>
            </td>
            <td id="row_title" className="ggg">
              <span>시간</span>
            </td>{" "}
            <td>
              <p>{notice.eTime}</p>
            </td>
          </tr>
          <tr>
            <td id="row_title">
              <span>이동 시간</span>
            </td>
            <td colSpan={2}>
              <p>{notice.moveTime ? notice.moveTime : "-"}</p>
            </td>
          </tr>

          <tr className="ss">
            <td colSpan={2} className="suc2">
              추천이 있습니다. 확인하시겠습니까?
            </td>
            <td className="suc3" colSpan={3}>
              {" "}
              <button
                className="suc"
                onClick={() => {
                  setOpenRecommend(true);
                }}
              >
                승낙
              </button>
            </td>
          </tr>
        </table>
        {/* <div className="button_check">
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
                <Button className="button_accept" variant="contained" color='secondary' size="medium"
                  style={{ color: 'white', font: 'bold' }}> 수정</Button>
              </Link>
              <Button className="button_deny" variant="contained" color='secondary' size="medium" 
              onClick={() => { setOpenDelete(true) }}
              style={{ color: 'white', font: 'bold' }}>삭제</Button>
            </ThemeProvider>
          </div> */}
      </div>
    );
    setNoticeInfo(tempInfo);
    setOpenNoticeInfo(true);
  };

  // 임시 알림 데이터. preAlarm 값 여부로 미리 필터 했다고 가정
  // preAlarm이 있어야 알림을 주는 일정인 것
  // 시작 날짜나 시간이 없는데 preAlarm 값을 넣는 등의 예외는 일단 무시.
  const events = [
    {
      title: "회식",
      start: "2022-12-05",
      end: "2022-12-05",
      sTime: "18:30",
      eTime: "19:31",
      preAlarm: 60,
      sLocation: "광주 동구 서남로 1",
      content: "회식하기 시러",
      moveTime: "23분",
      eLocation: "광주 서구 경열로 33",
      color: "#ffc847",
    },
    // { title: '미팅', start: '2022-12-05', end: '2022-12-05',
    // sTime: '12:00', eTime: '17:00',
    //    preAlarm: 30,sLocation:'어딘가', content:'일정 내용', moveTime:'20분', eLocation: '광주 동구청', color: 'blue' },
  ];
  const noticeList = events.map((data, idx) => {
    const [year, month, day] = data.start.split("-");
    const [hour, minute] = data.sTime.split(":");

    const date = `${year}년 ${month}월 ${day}일`;
    const time = `${hour}시 ${minute}분`;

    const eventDate = new Date(data.start + " " + data.sTime);
    const ms = data.preAlarm * 60 * 1000;
    const alarmTime = new Date(eventDate - ms);

    return (
      <div id={idx} onClick={showNoticeInfo}>
        <hr></hr>
        <span style={{ color: data.color }}> ● </span>
        {alarmTime.toLocaleString()}
        <br></br>
        <h5 style={{ display: "inline" }}>{data.title}</h5>
        일정이 <strong>{data.preAlarm}분</strong> 후에 시작합니다. <br></br>
        시작 시간: {date} {time} <br></br>
      </div>
    );
  });

  const [noticeNum, setNoticeNum] = useState(1);
  // const [noticeNum, setNoticeNum] = useState(noticeList.length);
  const [noticeInfo, setNoticeInfo] = useState("");
  const [openNoticeList, setOpenNoticeList] = useState(false);
  const [openNoticeInfo, setOpenNoticeInfo] = useState(false);

  const talk = [
    `${userName}님, 오늘 기분은 어떠신가요?`,
    `${userName}님, 건강이 최우선이라고 하더군요!`,
    `${userName}님께 즐거운 일만 가득하길..`,
    `배가 고프네요. 지구인은 뭘 먹고 사나요?`,
    `내 이름은 그리니! 탐정이죠.`,
    `오늘은 어떤 일이 일어날까요?`,
  ];
  const talkIdx = Math.floor(Math.random() * 6);
  const grnTalk = talk[talkIdx];

  const deleteNotice = () => {};

  return (
    <div>
      {!noticeNum ? (
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
      ) : (
        <div className="header_area">
          <img
            onClick={() => {
              setOpenNoticeList(true);
            }}
            src={greenee}
            className={"greenee"}
            style={{ width: "110px", padding: "20px" }}
          />
          <div
            className="notice"
            onClick={() => {
              setOpenNoticeList(true);
            }}
          >
            <span>{noticeNum}</span>
          </div>

          <div class="room-list-empty-room">
            <span>읽지 않은 알림이 {noticeNum}개 있어요!</span>
          </div>
        </div>
      )}

      <Dialog
        onClose={() => {
          setOpenNoticeList(false);
        }}
        open={openNoticeList}
      >
        <h4 style={{ textAlign: "center" }}>알림</h4>
        {noticeList}
        {/* {noticeList.map((data) => {
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
        })} */}
      </Dialog>

      <Dialog
        onClose={() => {
          setOpenNoticeInfo(false);
        }}
        open={openNoticeInfo}
      >
        {noticeInfo}
      </Dialog>

      <Dialog
        onClose={() => {
          setOpenRecommend(false);
        }}
        open={openRecommend}
      >
        <DialogTitle>
          <p
            className="bacc"
            onClick={() => {
              setOpenRecommend(false);
            }}
          >
            뒤로
          </p>{" "}
          오늘 여기는 어떠신가요?
        </DialogTitle>
        <DialogContent>
          {recommendLists.map((data, list) => (
            <div>
              <div key={list} style={{ display: "flex", margin: "20px" }}>
                <Table>
                  {/*    <img style={{float:"right"}} src="http://via.placeholder.com/10.png/09f/fff​" alt={data.image} />  */}

                  <TableRow>
                    <TableCell
                      colspan={2}
                      style={{ fontSize: "20px", fontWeight: "1000" }}
                    >
                      {data.title}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>영업시간</TableCell>
                    <TableCell>
                      {data.start} - {data.end}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>장소</TableCell>
                    <TableCell>{data.location}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>전화번호</TableCell>
                    <TableCell>{data.tel}</TableCell>
                  </TableRow>
                </Table>
              </div>
              <div style={{ position: "relative", right: "-145px" }}>
                <Button
                  onClick={() => {
                    setOpenDetail(true);
                  }}
                >
                  자세히보기
                </Button>
                <Button
                  onClick={() => {
                    setOpenRecommend(false);
                    setOpenScore(true);
                  }}
                >
                  좋아요!!
                </Button>
              </div>
              __________________________________
            </div>
          ))}
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() => {
          setOpenScore(false);
        }}
        open={openScore}
      >
        <DialogTitle>이번 추천은 만족 스러웠나요?</DialogTitle>
        <DialogContent>
          <Rating
            /*   style={{paddingBottom:"0px"}} */
            name="score"
            value={score}
            onChange={(event, newValue) => {
              setScore(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenScore(false);
            }}
          >
            다음에 하기
          </Button>
          <Button
            onClick={() => {
              setOpenScore(false);
              setOpenNoticeInfo(false);
              setOpenNoticeList(false);
            }}
          >
            제출
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={() => {
          setOpenDetail(false);
        }}
        open={openDetail}
      >
        <DialogTitle>한남동 나른한 오후 </DialogTitle>
        <DialogContent>
          <div>카카오 api</div>
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
            좋아요!!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HeaderAlarm;
