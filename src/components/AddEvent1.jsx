import React, { useState } from 'react'
import { Dialog, DialogTitle, Button, Box, Stack, Switch, TextField, FormControlLabel, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import { LocalizationProvider, TimePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CheckWeeks from './FreqCompo/CheckWeeks';
import dayjs from 'dayjs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Progress from './FreqCompo/Progress';
import Snackbar from './FreqCompo/Snackbar';
import MapAPI from './MapAPI';
import LabelBottomNavigation from './LabelBottomNavigation';
import '../css/AddEvent.css'

const AddEvent = () => {
  const [fontColor,] = useState("white"); // 태그 색깔 지정 변수
  const [startTagColor,] = useState("#2bcdb2"); // 태그 시작 벡그라운드 색 지정
  const [openTag, setOpenTag] = useState(false);
  const [openTag2, setOpenTag2] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [tag, setTag] = useState({ tagName: "", tagColor: startTagColor });
  const [tag2, setTag2] = useState({ tagName: "", tagColor: startTagColor });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(state => (state.session.email)); // 리덕스 스토어에 저장되어있는 세션 email 값을 가져옴
  const [checkWeeks, setCheckWeeks] = useState({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false });
  const [eventInfo, setEventInfo] = useState({ //title, 
  });
  const [checkSpecial, setCheckSpecial] = useState(false);
  const [preAlarm, setPreAlarm] = useState(0);
  const [checkRecommend, setCheckRecommend] = useState(false);
  const [sLocation, setSLocation] = useState('');
  const [eLocation, setELocation] = useState('');

  const handleOpenTag = () => {
    setOpenTag(true);
  }
  const handleOpenTag2 = () => {
    setOpenTag2(true);
  }
  const [cateList, setCateList] = useState([]);
  const [start, setStart] = useState(dayjs(new Date()));
  const [sTime, setSTime] = useState('');
  const [end, setEnd] = useState(dayjs(new Date()));
  const [eTime, setETime] = useState('');

  const handleStartDate = (n) => {
    console.log(n)
    setStart(n);
  }
  const handleEndDate = (n) => {
    setEnd(n);
  }
  const handleStartTime = (n) => {
    let hour = n.$H;
    let minute = n.$m;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    
    setStart(n);
    setSTime(hour + ':' + minute);
  };
  const handleEndTime = (n) => {
    let hour = n.$H;
    let minute = n.$m;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    setEnd(n);
    setETime(hour + ':' + minute);
  };

  const handleCategory = (e) => {
    let count = 0
    if (cateList.length !== 0) {
      for (let i of cateList) {
        if (i === e.target.name) {
          count += 1
        } else {

        }
      }
      if (count == 0) {
        setCateList([...cateList, e.target.name]); setOpenCategory(false)
      }
    } else {
      setCateList([...cateList, e.target.name]); setOpenCategory(false)
    }
  }

  const handleEventInfo = (e) => {
    setEventInfo({ ...eventInfo, [e.target.name]: e.target.value })
  }
  const handleFormSubmit = () => {
    let sDay = start.$y +'-'+ (start.$M + 1) +'-'+ start.$D;
    let eDay = end.$y +'-'+ (end.$M + 1) +'-'+ end.$D;
    const url = "http://localhost:5000/lifeConcierge/api/addEvent";
    console.log(tag.tagName)

    let tempTag;
    let tempColor;
    if (tag.tagName !== '데일리루틴') {
      tempTag = tag.tagName;
      tempColor = tag.tagColor;
    } else {
      tempTag = tag2.tagName;
      tempColor = tag2.tagColor;
    }
    console.log(tempTag, tempColor)
    if (email) {
      dispatch({ type: "PROGRESS", progress: { progressToggle: true } });
      axios.post(url, { 
                    ...eventInfo, checkWeeks, email, checkSpecial, preAlarm, 
                    tag : tag.tagName, color: tag.tagColor, tag2: tag2.tagName, color2: tag2.tagColor,
                    cateList, start: sDay, end: eDay, sTime, eTime, sLocation, eLocation })
        .then((res) => {
          if (res.data.affectedRows) {
            dispatch({ type: "ISEVENTADDED", isEventAdded: true });
            dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
            nav('/calendar');
            
          } else {
            dispatch({ type: "SNACKBAR/ON", snackbar: { snackbarToggle: true, explain: "일정등록 실패", severity: "error" } });
            dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
          }
        })
        .catch((err) => { console.log("에러 발생") })
    } else {
      dispatch({ type: "SNACKBAR/ON", snackbar: { snackbarToggle: true, explain: "로그인 되어있지 않습니다. 로그인을 진행해 주세요.", severity: "error" } });
    }

  }

  return (
    <Box className='test'>
      <Button onClick={handleOpenTag} style={{ background: tag.tagColor, color: fontColor }}>{tag.tagName ? tag.tagName : "태그"}</Button>
      {tag.tagName == "데일리루틴" ? <Button onClick={handleOpenTag2} style={{ background: tag2.tagColor, color: fontColor }}>{tag2.tagName ? tag2.tagName : "태그"}</Button> : ""}
      <Stack spacing={1}>
        <TextField size="small" label="제목" name="title" variant="standard" sx={{ mb: "20px" }} onChange={handleEventInfo} />
        {tag.tagName == "데일리루틴" ? "" : <FormControlLabel control={<Switch name="checkSpecial" onChange={() => { setCheckSpecial(!checkSpecial) }} />} label="주요일정" />}<br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="시작 날짜"
            inputFormat="MM/DD/YYYY"
            onChange={handleStartDate}
            value={start}
            renderInput={(label) => <TextField size="small" {...label} />}
          />
          <TimePicker
            label="시작 시간"
            value={start}
            onChange={handleStartTime}
            renderInput={(label) => <TextField size="small" {...label} />} />
        </LocalizationProvider>
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="종료 날짜"
            inputFormat="MM/DD/YYYY"
            onChange={handleEndDate}
            value={end}
            renderInput={(label) => <TextField size="small" {...label} />}
          />
          <TimePicker
            label="종료 시간"
            value={end}
            onChange={handleEndTime}
            renderInput={(label) => <TextField size="small" {...label} />} />
        </LocalizationProvider>
        <br />
        <FormControl variant='filled' size='small' sx={{ width: "200px", mt: "0" }}>
          <InputLabel id="demo-simple-select-label">미리 알림</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={preAlarm}
            onChange={(e) => { setPreAlarm(e.target.value) }}
          >
            <MenuItem value={0}>알림없음</MenuItem>
            <MenuItem value={10}>10분전</MenuItem>
            <MenuItem value={20}>20분전</MenuItem>
            <MenuItem value={30}>30분전</MenuItem>
            <MenuItem value={60}>60분전</MenuItem>
          </Select>
        </FormControl>
        <MapAPI sLocation={sLocation} setSLocation={setSLocation}
          eLocation={eLocation} setELocation={setELocation}>
        </MapAPI>
        {tag.tagName == "데일리루틴" ? <CheckWeeks checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks} /> : ""}

        {/* <TextField size="small" label="내용" name="content" multiline rows={5} variant="outlined" style={{marginBottom:"20px"}} onChange={handleEventInfo}/> */}
        <TextField size="small" label="메모" name="content" multiline rows={3} variant="outlined" sx={{ mb: "20px" }} onChange={handleEventInfo} />
        {/* <TextField label="장소" name="location" variant="outlined" sx={{mb:"20px"}} onChange={handleEventInfo}/> */}
      </Stack>
      <FormControlLabel style={{ float: "right" }} control={<Switch name="checkRecommend" onChange={() => { setCheckRecommend(!checkRecommend) }} />} label="추천받기" /><br />
      {checkRecommend ?
        <div>
          {cateList.map((data, index) => (
            <Button name={data} key={index} onClick={(e) => { setCateList(cateList.filter((data) => (data !== e.target.name))) }}>{data}</Button>
          ))}
          <Button style={{ border: "solid black" }} onClick={() => { setOpenCategory(true) }}>+</Button>
        </div>
        : ""}<br />
      <Button sx={{ mt: "10px", float: "right" }} variant="contained" onClick={handleFormSubmit}>등록</Button>

      <Snackbar />
      <Progress />
      {/* 태그 1 선택 모달창  */}
      <Dialog open={openTag} onClose={() => { setOpenTag(false) }}>
        <DialogTitle>
          태그 선택
        </DialogTitle>
        <DialogTitle>
          <Button name="데일리루틴" style={{ background: "#94ab50", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#94ab50" }); setOpenTag(false) }}>데일리루틴</Button><br />
          <Button name="업무/학교" style={{ background: "#ffc847", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#ffc847" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>업무/학교</Button><br />
          <Button name="여행/데이트/취미" style={{ background: "#8ed4c9", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#8ed4c9" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>여행/데이트/취미</Button><br />
          <Button name="건강/핼스" style={{ background: "#855e95", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#855e95" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>건강/핼스</Button><br />
          <Button name="쇼핑/구매/외식" style={{ background: "#e6c2ce", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#e6c2ce" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>쇼핑/구매/외식</Button><br />
          <Button name="미용/패션" style={{ background: "#c7d3a5", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#c7d3a5" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>미용/패션</Button><br />
          <Button name="개인/자기개발" style={{ background: "#477e85", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#477e85" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>개인/자기개발</Button><br />
        </DialogTitle>
      </Dialog>
      {/* 태그 2 선택 모달창  */}
      <Dialog open={openTag2} onClose={() => { setOpenTag2(false) }}>
        <DialogTitle>
          태그 선택
        </DialogTitle>
        <DialogTitle>
          <Button name="업무/학교" style={{ background: "#ffc847", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#ffc847" }); setOpenTag2(false) }}>업무/학교</Button><br />
          <Button name="여행/데이트/취미" style={{ background: "#8ed4c9", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#8ed4c9" }); setOpenTag2(false) }}>여행/데이트/취미</Button><br />
          <Button name="건강/핼스" style={{ background: "#855e95", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#855e95" }); setOpenTag2(false) }}>건강/핼스</Button><br />
          <Button name="쇼핑/구매/외식" style={{ background: "#e6c2ce", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#e6c2ce" }); setOpenTag2(false) }}>쇼핑/구매/외식</Button><br />
          <Button name="미용/패션" style={{ background: "#c7d3a5", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#c7d3a5" }); setOpenTag2(false) }}>미용/패션</Button><br />
          <Button name="개인/자기개발" style={{ background: "#477e85", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#477e85" }); setOpenTag2(false) }}>개인/자기개발</Button><br />
        </DialogTitle>
      </Dialog>

      <Dialog open={openCategory} onClose={() => { setOpenCategory(false) }}>
        <DialogTitle>
          카테고리 선택
        </DialogTitle>
        <DialogTitle>
          <div>
            <Button name="건강/운동/헬스케어" style={{ background: "#ffc847", color: fontColor }} onClick={handleCategory}>건강/운동/헬스케어</Button><br />
            <Button name="금융/자산/제테크" style={{ background: "#22c847", color: fontColor }} onClick={handleCategory}>금융/자산/제테크</Button>
            <Button name="반려동물" style={{ background: "#2293c8", color: fontColor }} onClick={handleCategory}>반려동물</Button>
            <Button name="뷰티/패션/쇼핑" style={{ background: "#96c822", color: fontColor }} onClick={handleCategory}>뷰티/패션/쇼핑</Button>
            <Button name="생활/리빙" style={{ background: "#c822af", color: fontColor }} onClick={handleCategory}>생활/리빙</Button>
            <Button name="여행/레저" style={{ background: "#c82257", color: fontColor }} onClick={handleCategory}>여행/레저</Button>
            <Button name="예술/엔터테인먼드" style={{ background: "#c8a722", color: fontColor }} onClick={handleCategory}>예술/엔터테인먼드</Button>
            <Button name="유아/어린이/교육" style={{ background: "#1d0303", color: fontColor }} onClick={handleCategory}>유아/어린이/교육</Button>
            <Button name="음식/요리" style={{ background: "#2d4e68", color: fontColor }} onClick={handleCategory}>음식/요리</Button>
            <Button name="자동차/이동수단" style={{ background: "#7e54c6", color: fontColor }} onClick={handleCategory}>자동차/이동수단</Button>
            <Button name="취미생활/자기개발" style={{ background: "#e38e27", color: fontColor }} onClick={handleCategory}>취미생활/자기개발</Button>
            <Button name="로컬 전용" style={{ background: "#8d2d19", color: fontColor }} onClick={handleCategory}>로컬 전용</Button>
          </div>
        </DialogTitle>
      </Dialog>
      <LabelBottomNavigation></LabelBottomNavigation>
    </Box>
  )
}
export default AddEvent;