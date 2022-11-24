import React, {useState} from 'react'
import {Dialog, DialogTitle, Button, Box, Stack, Switch, TextField, FormControlLabel, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import {LocalizationProvider, TimePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CheckWeeks from './FreqCompo/CheckWeeks';
import dayjs from 'dayjs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Progress from './FreqCompo/Progress';
import Snackbar from './FreqCompo/Snackbar';

const AddEvent = () => {
  const [openTag, setOpenTag] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [tag, setTag] = useState({tagName:"", tagColor:""});
  const nav = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(state=>(state.session.email));
  const [checkWeeks, setCheckWeeks] = useState({mon:false,tue:false,wed:false,thu:false,fri:false,sat:false,sun:false});
  const [eventInfo, setEventInfo] = useState({
  });
  const [checkSpecial, setCheckSpecial] = useState(false);
  const [preAlarm, setPreAlarm] = useState(0);
  const [checkRecommend, setCheckRecommend] = useState(false);
  const handleOpenTag = () => {
    setOpenTag(true);
  }
  const [cateList, setCateList] = useState([]);
  const [start, setStart] = useState(dayjs('2022-11-18T21:11:54'));
  const [end, setEnd] = useState(dayjs('2022-11-19T21:11:54'));

  const handleS = (n) => {
    setStart(n);
    setEventInfo({...eventInfo, start: start.$d})
  }
  const handleE = (n) => {
    setEnd(n);
    setEventInfo({...eventInfo, end: end.$d})
  }
  const handleStartDate = (n) => {
    setStart(n);
    setEventInfo({...eventInfo, start: start.$d})
  };
  const handleEndDate = (n) => {
    setEnd(n);
    setEventInfo({...eventInfo, end: end.$d})
  };

  const handleCategory = (e)=>{
    let count = 0
    if (cateList.length !== 0) {
      for (let i of cateList) {
        if (i === e.target.name) {
          count += 1
        } else {
          
        }
      }
      if (count == 0 ) {
        setCateList([...cateList, e.target.name ]); setOpenCategory(false)
      }
    } else {
      setCateList([...cateList, e.target.name ]); setOpenCategory(false)
    }
  }

  const handleEventInfo = (e) => {
    setEventInfo({...eventInfo, [e.target.name] : e.target.value})
  }
  const handleFormSubmit = () => {
    const url = "http://localhost:5000/lifeConcierge/api/addEvent";
    console.log({...eventInfo,checkWeeks, email, checkSpecial, preAlarm});
    dispatch({type:"PROGRESS", progress:{progressToggle:true}});
    axios.post(url, {...eventInfo,checkWeeks, email, checkSpecial, preAlarm})
    .then((res)=>{
      if(res.data.affectedRows) {
        dispatch({type:"ISEVENTADDED", isEventAdded:true})
        dispatch({type:"PROGRESS", progress:{progressToggle:false}});
        nav('/home');
      } else {
        dispatch({type:"SNACKBAR/ON", snackbar: {snackbarToggle:true, explain:"일정등록 실패", severity:"error"}});
        dispatch({type:"PROGRESS", progress:{progressToggle:false}});
      }
      
    })
    .catch((err)=>{console.log("에러 발생")})
  }

  return (
    <Box className='test'>
      <Button onClick={handleOpenTag} style={{background:tag.tagColor, color:"white"}}>{tag.tagName?tag.tagName:"태그"}</Button>
      <Stack spacing={1}>
        <TextField size="small" label="제목" name="title" variant="standard" sx={{mb:"20px"}} onChange={handleEventInfo}/>
        <FormControlLabel control={<Switch name="checkSpecial" onChange={()=>{setCheckSpecial(!checkSpecial)}} />} label="특별일정" /><br/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>        
          <MobileDatePicker
            label="시작 날짜"
            inputFormat="MM/DD/YYYY"
            onChange={handleS}
            value={start}
            renderInput={(label) => <TextField size="small" {...label} />}
          />
          <TimePicker 
            label="시작 시간"
            value={start}
            onChange={handleStartDate}
            renderInput={(label) => <TextField size="small" {...label} />}/>
        </LocalizationProvider>
        <br/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
              label="종료 날짜"
              inputFormat="MM/DD/YYYY"
              onChange={handleE}
              value={end}
              renderInput={(label) => <TextField size="small" {...label} />}
            />
          <TimePicker 
            label="종료 시간"
            value={end}
            onChange={handleEndDate}
            renderInput={(label) => <TextField size="small" {...label} />}/>
        </LocalizationProvider>
        <br/>
        <FormControl variant='filled' size='small' sx={{width:"200px", mt:"0"}}>
          <InputLabel id="demo-simple-select-label">미리 알림</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={preAlarm}
            onChange={(e)=>{setPreAlarm(e.target.value)}}
          >
            <MenuItem value={0}>알림없음</MenuItem>
            <MenuItem value={10}>10분전</MenuItem>
            <MenuItem value={20}>20분전</MenuItem>
            <MenuItem value={30}>30분전</MenuItem>
            <MenuItem value={60}>60분전</MenuItem>
          </Select>
        </FormControl>
        <TextField size="small" label="출발장소" name="sLocation" variant="standard" sx={{mb:"20px"}} onChange={handleEventInfo}/>
        <TextField size="small" label="도착장소" name="eLocation" variant="standard" sx={{mb:"20px"}} onChange={handleEventInfo}/>
        
        <CheckWeeks checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks}/>
        
        {/* <TextField size="small" label="내용" name="content" multiline rows={5} variant="outlined" style={{marginBottom:"20px"}} onChange={handleEventInfo}/> */}
        <TextField size="small" label="내용" name="content" multiline rows={3} variant="outlined" sx={{mb:"20px"}} onChange={handleEventInfo}/>
        {/* <TextField label="장소" name="location" variant="outlined" sx={{mb:"20px"}} onChange={handleEventInfo}/> */}
      </Stack>
      <FormControlLabel style={{float:"right"}} control={<Switch name="checkRecommend" onChange={()=>{setCheckRecommend(!checkRecommend)}} />} label="추천받기" /><br/>
      {checkRecommend?
      <div>
        {cateList.map((data, index)=>(
          <Button name={data} key={index} onClick={(e)=>{setCateList(cateList.filter((data)=>(data !== e.target.name)))}}>{data}</Button>
          ))}
        <Button style={{border:"solid black"}} onClick={()=>{setOpenCategory(true)}}>+</Button>
      </div>
      :""}<br/>
      <Button sx={{mt:"10px", float:"right"}} variant="contained" onClick={handleFormSubmit}>등록</Button>

      <Snackbar/>
      <Progress/>

      <Dialog open={openTag} onClose={()=>{setOpenTag(false)}}>
        <DialogTitle>
          태그 선택
        </DialogTitle>
        <DialogTitle>
          <Button name="업무/학교" style={{background:"#ffc847", color:"white"}} onClick={(e)=>{setTag({...tag, tagName: e.target.name, tagColor:"#ffc847"}); setOpenTag(false)}}>업무/학교</Button><br/>
          <Button name="데일리루틴" style={{background:"#94ab50", color:"white"}} onClick={(e)=>{setTag({...tag, tagName: e.target.name, tagColor:"#94ab50"}); setOpenTag(false)}}>데일리루틴</Button><br/>
          <Button name="여행/데이트/취미" style={{background:"#8ed4c9", color:"white"}} onClick={(e)=>{setTag({...tag, tagName: e.target.name, tagColor:"#8ed4c9"}); setOpenTag(false)}}>여행/데이트/취미</Button><br/>
          <Button name="건강/핼스" style={{background:"#855e95", color:"white"}} onClick={(e)=>{setTag({...tag, tagName: e.target.name, tagColor:"#855e95"}); setOpenTag(false)}}>건강/핼스</Button><br/>
          <Button name="쇼핑/구매/외식" style={{background:"#e6c2ce", color:"white"}} onClick={(e)=>{setTag({...tag, tagName: e.target.name, tagColor:"#e6c2ce"}); setOpenTag(false)}}>쇼핑/구매/외식</Button><br/>
          <Button name="미용/패션" style={{background:"#c7d3a5", color:"white"}} onClick={(e)=>{setTag({...tag, tagName: e.target.name, tagColor:"#c7d3a5"}); setOpenTag(false)}}>미용/패션</Button><br/>
          <Button name="개인/자기개발" style={{background:"#477e85", color:"white"}} onClick={(e)=>{setTag({...tag, tagName: e.target.name, tagColor:"#477e85"}); setOpenTag(false)}}>개인/자기개발</Button><br/>
        </DialogTitle>
      </Dialog>

      <Dialog open={openCategory} onClose={()=>{setOpenCategory(false)}}>
        <DialogTitle>
          카테고리 선택
        </DialogTitle>
        <DialogTitle>
          <div>
            <Button name="건강/운동/헬스케어" style={{background:"#ffc847", color:"white"}} onClick={handleCategory}>건강/운동/헬스케어</Button><br/>
            <Button name="반려동물" style={{background:"#22c847", color:"white"}} onClick={handleCategory}>반려동물</Button>
          </div>
        </DialogTitle>
      </Dialog>
    </Box>
  )
}
export default AddEvent;