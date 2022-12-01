import React, { useState } from 'react'
import { Dialog, DialogTitle, Button, Box, Stack, Switch, TextField, FormControlLabel, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText';
import { LocalizationProvider, TimePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Checkbox from '@mui/material/Checkbox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckWeeks from './FreqCompo/CheckWeeks';
import dayjs from 'dayjs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Progress from './FreqCompo/Progress';
import Snackbar from './FreqCompo/Snackbar';
import MapAPI from './MapAPI';
import LabelBottomNavigation from './LabelBottomNavigation';
import '../css/AddEvent.css';


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
    const sMonth = start.$M + 1;
    const sDay = start.$D;
    const eMonth = end.$M + 1;
    const eDay = end.$D;

    const sDate = start.$y + '-' + (sMonth < 10 ? '0' + sMonth : sMonth) + '-' + (sDay < 10 ? '0' + sDay : sDay);
    const eDate = end.$y + '-' + (eMonth < 10 ? '0' + eMonth : eMonth) + '-' + (eDay < 10 ? '0' + eDay : eDay);
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
        tag: tag.tagName, color: tag.tagColor, tag2: tag2.tagName, color2: tag2.tagColor,
        cateList, start: sDate, end: eDate, sTime, eTime, sLocation, eLocation
      })
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
    <>
      <Box className='addevent'>
        {/* <button onClick={() => {
        console.log(start.$y +'-'+ (start.$M + 1) +'-'+ start.$D);
      }}>check</button>

      <button onClick={() => {
        console.log(sTime)
      }}>시간 보기</button> */}
        <Button onClick={handleOpenTag} style={{ background: tag.tagColor, color: fontColor, marginTop: '20px' }}>{tag.tagName ? tag.tagName : "태그"}</Button>
        {tag.tagName == "데일리루틴" ? <Button onClick={handleOpenTag2} style={{ background: tag2.tagColor, color: fontColor, marginTop: '20px' }}>{tag2.tagName ? tag2.tagName : "태그"}</Button> : ""}
        <Stack spacing={1}>
          <div className='important' >
            <input style={{ width: "100%" }} className='input' placeholder="제목 추가" type='text' name="title" onChange={handleEventInfo} />
            {/* <TextField size="small" placeholder="제목" name="title" variant="standard" sx={{ mb: "20px" }} onChange={handleEventInfo} /> */}
            {/* {tag.tagName == "데일리루틴" ? "" :
        <FormControlLabel control={<Switch name="checkSpecial" onChange={() => { setCheckSpecial(!checkSpecial) }} />} label="주요일정" />
        } */}
            {checkSpecial ? <span onClick={() => { setCheckSpecial(false) }} className="star_yellow">⭐</span> :
              <span onClick={() => { setCheckSpecial(true) }} className="star_white" star_yellow>⭐</span>}
            {/* <div className='importantfont'>주요일정</div> */}
          </div>

          
          {tag.tagName !== "데일리루틴" ?
            <div>
              <div className='datetime'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="시작 날짜"
                    inputFormat="YYYY/MM/DD"
                    onChange={handleStartDate}
                    value={start}
                    renderInput={(label) => <TextField size="small" variant='standard' {...label} />}
                  />
                  <TimePicker
                    label="시작 시간"
                    value={start}
                    onChange={handleStartTime}
                    renderInput={(label) => <TextField size="small" variant='standard' {...label} />} />
                </LocalizationProvider>
              </div>
              
              <div
               className='datetime'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="종료 날짜"
                    inputFormat="YYYY/MM/DD"
                    onChange={handleEndDate}
                    value={end}
                    renderInput={(label) => <TextField size="small" variant='standard' {...label} />}
                  />
                  <TimePicker
                    label="종료 시간"
                    value={end}
                    onChange={handleEndTime}
                    renderInput={(label) => <div style={{ display: "flex" }}><TextField size="small" variant='standard' {...label} /></div>} />
                </LocalizationProvider>
              </div>
            </div>
            :
            <div>
              <div className='datetime'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                    label="루틴 시작"
                    inputFormat="YYYY/MM/DD"
                    onChange={handleStartDate}
                    value={start}
                    renderInput={(label) => <TextField size="small" variant='standard' {...label} />}
                  />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="루틴 종료"
                    inputFormat="YYYY/MM/DD"
                    onChange={handleEndDate}
                    value={end}
                    renderInput={(label) => <TextField size="small" variant='standard' {...label} />}
                  />
                </LocalizationProvider>
                
              </div>
              
              <div className='datetime'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="시작 시간"
                    value={start}
                    onChange={handleStartTime}
                    renderInput={(label) => <TextField size="small" variant='standard' {...label} />} />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="종료 시간"
                    value={end}
                    onChange={handleEndTime}
                    renderInput={(label) => <div style={{ display: "flex" }}><TextField size="small" variant='standard' {...label} /></div>} />
                </LocalizationProvider>
              </div>
            </div>
          }

          <div className='alarm'>

            <NotificationsNoneIcon fontSize='large' style={{ visibility: "visible" }} />
            <FormControl variant='filled' size='small'>
              {/* <InputLabel id="demo-simple-select-label">미리 알림</InputLabel> */}
              <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                value={preAlarm}
                onChange={(e) => { setPreAlarm(e.target.value) }}
              >
                <MenuItem value={0}>알람없음</MenuItem>
                <MenuItem value={10}>10분전</MenuItem>
                <MenuItem value={20}>20분전</MenuItem>
                <MenuItem value={30}>30분전</MenuItem>
                <MenuItem value={60}>60분전</MenuItem>
              </Select>
            </FormControl>
          </div>

          <MapAPI sLocation={sLocation} setSLocation={setSLocation}
            eLocation={eLocation} setELocation={setELocation}>
          </MapAPI>
          {tag.tagName == "데일리루틴" ? <CheckWeeks checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks} /> : ""}
          {/* <TextField size="small" label="내용" name="content" multiline rows={5} variant="outlined" style={{marginBottom:"20px"}} onChange={handleEventInfo}/> */}
          <TextField size="small" placeholder="메모" name="content" multiline rows={3} variant="outlined" sx={{ mb: "20px" }} onChange={handleEventInfo} />
          {/* <TextField label="장소" name="location" variant="outlined" sx={{mb:"20px"}} onChange={handleEventInfo}/> */}
        </Stack>
        <div className='test'>
          <FormControlLabel style={{ float: "right" }} control={<Switch name="checkRecommend" onChange={() => { setCheckRecommend(!checkRecommend) }} />} label="추천받기" /><br />

          {checkRecommend ?
            <div>
              {cateList.map((data, index) => (
                <Button name={data} key={index} onClick={(e) => { setCateList(cateList.filter((data) => (data !== e.target.name))) }}>{data}</Button>
              ))}
              <Button onClick={() => { setOpenCategory(true) }}>카테고리 추가</Button>
            </div>
            : ""}
          <Button sx={{ mt: "10px", float: "right" }} variant="contained" onClick={handleFormSubmit}>등록</Button>
        </div>
        {/* <Button sx={{ mt: "10px", float: "right" }} variant="contained" onClick={handleFormSubmit}>등록</Button> */}

        <Snackbar />
        <Progress />
        {/* 태그 1 선택 모달창  */}
        <Dialog open={openTag} onClose={() => { setOpenTag(false) }}>
          <div className='tagselect'>
            <DialogTitle>
              태그 선택
            </DialogTitle>
          </div>
          <DialogTitle>
            <div className='tag'>
              <div className='tagcolor' style={{ background: '#94ab50' }}></div>
              <Button name="데일리루틴" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#94ab50" }); setOpenTag(false) }}>데일리루틴</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#ffc847' }}>　</div>
              <Button name="업무/학교" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#ffc847" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>업무/학교</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#8ed4c9' }}>　</div>
              <Button name="여행/데이트/취미" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#8ed4c9" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>여행/데이트/취미</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#855e95' }}>　</div>
              <Button name="건강/헬스" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#855e95" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>건강/헬스</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#e6c2ce' }}>　</div>
              <Button name="쇼핑/구매/외식" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#e6c2ce" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>쇼핑/구매/외식</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#c7d3a5' }}>　</div>
              <Button name="미용/패션" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#c7d3a5" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>미용/패션</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#477e85' }}>　</div>
              <Button name="개인/자기개발" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#477e85" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>개인/자기개발</Button><br />
            </div>
          </DialogTitle>
        </Dialog>
        {/* 태그 2 선택 모달창  */}
        <Dialog open={openTag2} onClose={() => { setOpenTag2(false) }}>
          <div className='tagselect'>
            <DialogTitle>
              태그 선택
            </DialogTitle>
          </div>
          <DialogTitle>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#ffc847' }}></div>
              <Button name="업무/학교" style={{ color: "black" }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#ffc847" }); setOpenTag2(false) }}>업무/학교</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#8ed4c9' }}></div>
              <Button name="여행/데이트/취미" style={{ color: "black" }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#8ed4c9" }); setOpenTag2(false) }}>여행/데이트/취미</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#855e95' }}></div>
              <Button name="건강/헬스" style={{ color: "black" }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#855e95" }); setOpenTag2(false) }}>건강/헬스</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#e6c2ce' }}></div>
              <Button name="쇼핑/구매/외식" style={{ color: "black" }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#e6c2ce" }); setOpenTag2(false) }}>쇼핑/구매/외식</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#c7d3a5' }}></div>
              <Button name="미용/패션" style={{ color: "black" }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#c7d3a5" }); setOpenTag2(false) }}>미용/패션</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#477e85' }}></div>
              <Button name="개인/자기개발" style={{ color: "black" }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#477e85" }); setOpenTag2(false) }}>개인/자기개발</Button><br />
            </div>
          </DialogTitle>
        </Dialog>

        <Dialog open={openCategory} onClose={() => { setOpenCategory(false) }}>
          <div className='tagselect'>
            <DialogTitle>
              카테고리 선택
            </DialogTitle>
          </div>
          <DialogTitle>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#ff3c3c' }}></div>
              <Button name="건강/운동/헬스케어" style={{ color: "black" }} onClick={handleCategory}>건강/운동/헬스케어</Button><br />
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#22c847' }}></div>
              <Button name="금융/자산/제테크" style={{ color: "black" }} onClick={handleCategory}>금융/자산/제테크</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#ffa585' }}></div>
              <Button name="반려동물" style={{ color: "black" }} onClick={handleCategory}>반려동물</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#84ffc9' }}></div>
              <Button name="뷰티/패션/쇼핑" style={{ color: "black" }} onClick={handleCategory}>뷰티/패션/쇼핑</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: '#ff4d00' }}></div>
              <Button name="생활/리빙" style={{ color: "black" }} onClick={handleCategory}>생활/리빙</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: "#c44569" }}></div>
              <Button name="여행/레저" style={{ color: "black" }} onClick={handleCategory}>여행/레저</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: "#c8a722" }}></div>
              <Button name="예술/엔터테인먼드" style={{ color: "black" }} onClick={handleCategory}>예술/엔터테인먼드</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: "#f6d5f7" }}></div>
              <Button name="유아/어린이/교육" style={{ color: "black" }} onClick={handleCategory}>유아/어린이/교육</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: "#595cff" }}></div>
              <Button name="음식/요리" style={{ color: "black" }} onClick={handleCategory}>음식/요리</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: "#63cdda" }}></div>
              <Button name="자동차/이동수단" style={{ color: "black" }} onClick={handleCategory}>자동차/이동수단</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: "#ffde68" }}></div>
              <Button name="취미생활/자기개발" style={{ color: "black" }} onClick={handleCategory}>취미생활/자기개발</Button>
            </div>
            <div className="tag">
              <div className='tagcolor' style={{ background: "#8d2d19" }}></div>
              <Button name="로컬 전용" style={{ color: "black" }} onClick={handleCategory}>로컬 전용</Button>
            </div>
          </DialogTitle>
        </Dialog>
      </Box>
      <LabelBottomNavigation></LabelBottomNavigation>
    </>
  )
}
export default AddEvent;