import React, { useState } from 'react'
import { Dialog, DialogTitle, Button, Box, Stack, Switch, TextField, FormControlLabel, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import { LocalizationProvider, TimePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckWeeks from './FreqCompo/CheckWeeks';
import dayjs from 'dayjs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import Progress from './FreqCompo/Progress';
import Snackbar from './FreqCompo/Snackbar';
import '../css/AddEvent.css';
import MapAPI from './MapAPI';
import LabelBottomNavigation from './LabelBottomNavigation';

const UpdateEvent = () => {
    const state = useLocation().state;

    const [fontColor,] = useState("white"); // 태그 색깔 지정 변수
    const [startTagColor,] = useState("#2bcdb2"); // 태그 시작 벡그라운드 색 지정
    const [openTag, setOpenTag] = useState(false);
    const [openTag2, setOpenTag2] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);

    const nav = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector(state => (state.session.email)); // 리덕스 스토어에 저장되어있는 세션 email 값을 가져옴
    const [checkWeeks, setCheckWeeks] = useState({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false });
    const [eventInfo, setEventInfo] = useState({
        ...state
    });
    const [tag, setTag] = useState({ tagName: eventInfo.tag, tagColor: eventInfo.color });
    const [tag2, setTag2] = useState({ tagName: '태그', tagColor: startTagColor });
    const [checkSpecial, setCheckSpecial] = useState(eventInfo.checkSpecial);
    const [preAlarm, setPreAlarm] = useState(eventInfo.preAlarm);
    const [checkRecommend, setCheckRecommend] = useState(eventInfo.cateList ? true : false);
    const [sLocation, setSLocation] = useState(eventInfo.sLocation);
    const [eLocation, setELocation] = useState(eventInfo.eLocation);
    const [memo, setMemo] = useState(eventInfo.content);

    const handleOpenTag = () => {
        setOpenTag(true);
    }
    const handleOpenTag2 = () => {
        setOpenTag2(true);
    }
    const [cateList, setCateList] = useState(JSON.parse(eventInfo.cateList));
    const [start, setStart] = useState(dayjs(new Date(eventInfo.start)));
    const [sTime, setSTime] = useState(eventInfo.sTime);
    const [end, setEnd] = useState(dayjs(new Date(eventInfo.end)));
    const [eTime, setETime] = useState(eventInfo.eTime);

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
                setCateList([...cateList, { name: e.target.name, color: e.target.style.accentColor }]); setOpenCategory(false);
            }
        } else {
            setCateList([...cateList, { name: e.target.name, color: e.target.style.accentColor }]); setOpenCategory(false);
        }
    }

    const handleEventInfo = (e) => {
        setEventInfo({ ...eventInfo, [e.target.name]: e.target.value })
    }

    const writeMemo = (e) => {
        setMemo(e.target.value);
        setEventInfo({ ...eventInfo, content: memo });
    }

    const handleFormSubmit = () => {
        const sMonth = start.$M + 1;
        const sDay = start.$D;
        const eMonth = end.$M + 1;
        const eDay = end.$D;

        const sDate = start.$y + '-' + (sMonth < 10 ? '0' + sMonth : sMonth) + '-' + (sDay < 10 ? '0' + sDay : sDay);
        const eDate = end.$y + '-' + (eMonth < 10 ? '0' + eMonth : eMonth) + '-' + (eDay < 10 ? '0' + eDay : eDay);
        const url = "http://localhost:5000/lifeConcierge/api/UpdateEvent";

        let tempTag;
        let tempColor;
        if (tag.tagName !== '데일리루틴') {
            tempTag = tag.tagName;
            tempColor = tag.tagColor;
        } else {
            tempTag = tag2.tagName;
            tempColor = tag2.tagColor;
        }

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

    const goback = () => {
        window.history.back()
    }

    return (
        <div className='addeventbody'>
            <Box className='addevent'>
                <div className="back" onClick={goback}><HighlightOffIcon sx={{ fontSize: 40 }} style={{ color: '#BEBEBE' }} /></div>
                <Button onClick={handleOpenTag} style={{ background: tag.tagColor, color: fontColor }}>{tag.tagName ? tag.tagName : "태그"}</Button>
                {tag.tagName == "데일리루틴" ? <Button onClick={handleOpenTag2} style={{ borderRadius: "30px", background: tag2.tagColor, color: fontColor, marginTop: '20px' }}>{tag2.tagName ? tag2.tagName : "태그"}</Button> : ""}
                <Stack spacing={1}>

                    <div className='important' >
                        <input style={{ width: "100%" }} className='input' type='text' name="title" onChange={handleEventInfo} value={eventInfo.title} />
                        {checkSpecial ? <span onClick={() => { setCheckSpecial(false) }} className="star_yellow">⭐</span> :
                            <span onClick={() => { setCheckSpecial(true) }} className="star_white">⭐</span>}
                    </div>


                    {/* <TextField size="small" label="제목" name="title" variant="standard" sx={{ mb: "20px" }} onChange={handleEventInfo} value={eventInfo.title} />
                {tag.tagName == "데일리루틴" ? "" : <FormControlLabel control={<Switch name="checkSpecial" onChange={() => { setCheckSpecial(!checkSpecial) }} />} label="주요일정" />}<br /> */}
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                <br /> */}

                    <div className='datetime'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                // label="시작 날짜"
                                inputFormat="YYYY/MM/DD"
                                onChange={handleStartDate}
                                value={start}
                                renderInput={(label) => <TextField size="small" variant='standard' {...label} />}
                            />
                            <TimePicker
                                // label="시작 시간"
                                value={start}
                                onChange={handleStartTime}
                                renderInput={(label) => <TextField size="small" variant='standard' {...label} />} />
                        </LocalizationProvider>
                    </div>

                    <div className='datetime'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                // label="종료 날짜"
                                inputFormat="YYYY/MM/DD"
                                onChange={handleEndDate}
                                value={end}
                                renderInput={(label) => <TextField size="small" variant='standard' {...label} />}
                            />
                            <TimePicker
                                // label="종료 시간"
                                value={end}
                                onChange={handleEndTime}
                                renderInput={(label) => <div style={{ display: "flex" }}><TextField size="small" variant='standard' {...label} /></div>} />
                        </LocalizationProvider>
                    </div>

                    {/* <FormControl variant='filled' size='small' sx={{ width: "200px", mt: "0" }}>
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
                    </FormControl> */}

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
                    <TextField size="small" label='메모' name="content" multiline rows={3} variant="outlined" sx={{ mb: "20px" }} value={memo} onChange={writeMemo} />
                </Stack>
                <div>
                    <FormControlLabel style={{ float: "right" }} checked={checkRecommend} control={<Switch name="checkRecommend" onChange={() => { setCheckRecommend(!checkRecommend) }} />} label="추천받기" /><br />
                    {/* {checkRecommend ?
                    <div>
                        {cateList.map((data, index) => (
                            <Button name={data} key={index} onClick={(e) => { setCateList(cateList.filter((data) => (data !== e.target.name))) }}>{data}</Button>
                        ))}
                        <Button style={{ border: "solid black" }} onClick={() => { setOpenCategory(true) }}>+</Button>
                    </div>
                    : ""}<br /> */}
                    {checkRecommend ?
                        <div className="container">
                            {cateList.map((data, index) => (
                                <div style={{ float: 'left', marginRight: "0px" }}>
                                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                                        <div style={{ background: data.color, width: "15px", marginRight: '5px' }}></div>
                                        <Button style={{ marginLeft: "-4px", color: 'black', justifyContent: "left" }} name={data.name} key={index} onClick={(e) => { setCateList(cateList.filter((data) => (data.name !== e.target.name))) }}>{data.name}</Button>
                                    </div>
                                </div>
                            ))}
                            <AddCircleOutlineIcon onClick={() => { setOpenCategory(true) }} style={{ color: '#7e7e7e' }} sx={{ fontSize: 45 }} />
                        </div>
                        : ""}
                    <Button sx={{ mt: "10px", float: "right" }} variant="contained" onClick={handleFormSubmit}>수정</Button>
                </div>
                <Snackbar />
                <Progress />
                {/* 태그 1 선택 모달창  */}
                <Dialog open={openTag} onClose={() => { setOpenTag(false) }}>
                    <div className='tagselect'>
                        <DialogTitle>
                            태그 선택
                        </DialogTitle>
                    </div>
                    {/* <DialogTitle>
                        <Button name="데일리루틴" style={{ background: "#94ab50", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#94ab50" }); setOpenTag(false) }}>데일리루틴</Button><br />
                        <Button name="업무/학교" style={{ background: "#ffc847", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#ffc847" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>업무/학교</Button><br />
                        <Button name="여행/데이트/취미" style={{ background: "#8ed4c9", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#8ed4c9" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>여행/데이트/취미</Button><br />
                        <Button name="건강/핼스" style={{ background: "#855e95", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#855e95" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>건강/핼스</Button><br />
                        <Button name="쇼핑/구매/외식" style={{ background: "#e6c2ce", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#e6c2ce" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>쇼핑/구매/외식</Button><br />
                        <Button name="미용/패션" style={{ background: "#c7d3a5", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#c7d3a5" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>미용/패션</Button><br />
                        <Button name="개인/자기개발" style={{ background: "#477e85", color: fontColor }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#477e85" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>개인/자기개발</Button><br />
                    </DialogTitle> */}
                    <DialogTitle>
                        <div className='tag'>
                            <div className='tagcolor' style={{ background: '#94ab50', width: "30px" }}></div>
                            <Button name="데일리루틴" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#94ab50" }); setOpenTag(false) }}>데일리루틴</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#ffc847', width: "30px" }}></div>
                            <Button name="업무/학교" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#ffc847" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>업무/학교</Button><br />
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#8ed4c9', width: "30px" }}></div>
                            <Button name="여행/데이트/취미" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#8ed4c9" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>여행/데이트/취미</Button><br />
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#855e95', width: "30px" }}></div>
                            <Button name="건강/헬스" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#855e95" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>건강/헬스</Button><br />
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#e6c2ce', width: "30px" }}></div>
                            <Button name="쇼핑/구매/외식" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#e6c2ce" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>쇼핑/구매/외식</Button><br />
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#c7d3a5', width: "30px" }}></div>
                            <Button name="미용/패션" style={{ color: "black" }} onClick={(e) => { setTag({ ...tag, tagName: e.target.name, tagColor: "#c7d3a5" }); setTag2({ ...tag2, tagName: "", tagColor: startTagColor }); setOpenTag(false); setCheckWeeks({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }) }}>미용/패션</Button><br />
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#477e85', width: "30px" }}></div>
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
                    {/* <DialogTitle>
                        <Button name="업무/학교" style={{ background: "#ffc847", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#ffc847" }); setOpenTag2(false) }}>업무/학교</Button><br />
                        <Button name="여행/데이트/취미" style={{ background: "#8ed4c9", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#8ed4c9" }); setOpenTag2(false) }}>여행/데이트/취미</Button><br />
                        <Button name="건강/핼스" style={{ background: "#855e95", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#855e95" }); setOpenTag2(false) }}>건강/핼스</Button><br />
                        <Button name="쇼핑/구매/외식" style={{ background: "#e6c2ce", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#e6c2ce" }); setOpenTag2(false) }}>쇼핑/구매/외식</Button><br />
                        <Button name="미용/패션" style={{ background: "#c7d3a5", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#c7d3a5" }); setOpenTag2(false) }}>미용/패션</Button><br />
                        <Button name="개인/자기개발" style={{ background: "#477e85", color: fontColor }} onClick={(e) => { setTag2({ ...tag2, tagName: e.target.name, tagColor: "#477e85" }); setOpenTag2(false) }}>개인/자기개발</Button><br />
                    </DialogTitle> */}
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
                        {/* <div>
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
                            </div> */}
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#ff3c3c' }}></div>
                            <Button name="건강/운동/헬스케어" style={{ color: "black", accentColor: "#ff3c3c" }} onClick={handleCategory}>건강/운동/헬스케어</Button><br />
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#22c847' }}></div>
                            <Button name="금융/자산/제테크" style={{ color: "black", accentColor: '#22c847' }} onClick={handleCategory}>금융/자산/제테크</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#ffa585' }}></div>
                            <Button name="반려동물" style={{ color: "black", accentColor: '#ffa585' }} onClick={handleCategory}>반려동물</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#84ffc9' }}></div>
                            <Button name="뷰티/패션/쇼핑" style={{ color: "black", accentColor: '#84ffc9' }} onClick={handleCategory}>뷰티/패션/쇼핑</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: '#ff4d00' }}></div>
                            <Button name="생활/리빙" style={{ color: "black", accentColor: '#ff4d00' }} onClick={handleCategory}>생활/리빙</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: "#c44569" }}></div>
                            <Button name="여행/레저" style={{ color: "black", accentColor: "#c44569" }} onClick={handleCategory}>여행/레저</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: "#c8a722" }}></div>
                            <Button name="예술/엔터테인먼드" style={{ color: "black", accentColor: "#c8a722" }} onClick={handleCategory}>예술/엔터테인먼드</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: "#f6d5f7" }}></div>
                            <Button name="유아/어린이/교육" style={{ color: "black", accentColor: "#f6d5f7" }} onClick={handleCategory}>유아/어린이/교육</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: "#595cff" }}></div>
                            <Button name="음식/요리" style={{ color: "black", accentColor: "#595cff" }} onClick={handleCategory}>음식/요리</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: "#63cdda" }}></div>
                            <Button name="자동차/이동수단" style={{ color: "black", accentColor: "#63cdda" }} onClick={handleCategory}>자동차/이동수단</Button>
                        </div>
                        <div className="tag">
                            <div className='tagcolor' style={{ background: "#ffde68" }}></div>
                            <Button name="취미생활/자기개발" style={{ color: "black", accentColor: "#ffde68" }} onClick={handleCategory}>취미생활/자기개발</Button>
                        </div>
                    </DialogTitle>
                </Dialog>
                <LabelBottomNavigation></LabelBottomNavigation>
            </Box>
        </div>
    )
}

export default UpdateEvent
