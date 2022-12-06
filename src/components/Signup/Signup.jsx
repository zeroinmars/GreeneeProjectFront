import { useState } from 'react';
import UserInfo from './UserInfo';
import axios from 'axios';
import {Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Container, TextField, Stack} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import SignUpMapAPI from '../SignUpMapAPI'
import Snackbar from '../FreqCompo/Snackbar';
import Progress from '../FreqCompo/Progress';
import backback from '../../img/backback.png';
import "../../css/Signup.css";

const Signup =  () => {
  const style = {
    input : {marginTop:"30px"}
  }
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pwCheck, setPwCheck] = useState('');
  const [userInfo, setUserInfo] = useState({
    email:"",pw:"", name:"",gender:"",birthday:"",hAddr:"",cAddr:""
  });
  const [hLocation, setHLocation] = useState('');
  const [cLocation, setCLocation] = useState('');
  const handleOnChange = (e)=>{
    setUserInfo({...userInfo, [e.target.name]:e.target.value})
  }

  const isAllNotUndefined = (obj) => {
    for (let i of Object.values(obj)) {
      if(i == false) {
        return false
      }
    }
    return true;
  }

  const handleFormSubmit = (e) => {
    userInfo.hAddr = hLocation;
    userInfo.cAddr = cLocation;
    const url = "/lifeConcierge/api/signup";
    if (isAllNotUndefined(userInfo)) {
      dispatch({type:"PROGRESS", progress:{progressToggle:true}});
      axios.post(url, userInfo)
      .then((res)=>{
        console.log(res);
        dispatch({type:"PROGRESS", progress:{progressToggle:false}});
        axios.post('/lifeConcierge/api/login', userInfo)
        .then((res) => {
          if (res.data != "NoneId") {
            dispatch({ type: "ISLOGGEDIN", isLoggedin: true });
            // Login 컴포넌트에 바로 알람을 출력하면 로그인이 성공이 되면 MyProfile 페이지에서 Login 컴포넌트를 MyProfile 컴포넌트로 전환해버리기 때문에 Login 컴포넌트에 알람을 출력해도 알람이 뜨지 않는다.
            // 그래서 cofirm이라는 변수만 한개 설정한 뒤 MyProfile
            dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
            dispatch({ type: "SESSION", session: res.data.rows[0] });
          } else {
            dispatch({ type: "SNACKBAR/ON", snackbar: { snackbarToggle: true, explain: "아이디가 없습니다. 적절한 아이디를 다시 작성해주세요.", severity: "error" } });
            dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
          }
        })
        .catch(() => {
          dispatch({ type: "SNACKBAR/ON", snackbar: { snackbarToggle: true, explain: "로그인에 실패 했습니다.", severity: "error" } });
          dispatch({ type: "PROGRESS", progress: { progressToggle: false } });
        });
        dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"회원가입이 성공적으로 완료 되었습니다.", severity:"success"}});
        navigate('/signupcheck');
      })
      .catch((err)=>{
        console.log(err);
        dispatch({type:"PROGRESS", progress:{progressToggle:false}});
        dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"회원가입 오류", severity:"error"}});
      })
    } else {
      dispatch({type:"PROGRESS", progress:{progressToggle:false}});
      dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"비어 있는 칸이 있습니다. 다시 입력 해 주세요,", severity:"error"}});
    }
  }

  const goback = () => {
    window.history.back()
  }

  return (
    <>
    <div className='page'>
    <Button className='edit_back' onClick={goback}><img src={backback} className='back_btn' /></Button>
    <div className='s_h_line'>회원가입</div>
    <Box>
      <Container sx={{height:'100vh'}}>
        <Stack spacing={2} alignItems="stretch">
          <TextField style={style.input} variant="standard" value={userInfo.email} placeholder="이메일"  name="email" onChange={handleOnChange}></TextField>
          <TextField style={style.input} variant="standard" value={userInfo.pw} placeholder="비밀번호"  type="password" name="pw" onChange={handleOnChange}></TextField>
          <TextField error={userInfo.pw !== pwCheck} style={style.input} variant="standard" value={pwCheck} placeholder="비밀번호확인" type="password" onChange={(e) => {setPwCheck(e.target.value)}}></TextField>
          <TextField style={style.input} variant="standard" value={userInfo.name} placeholder="이름" name="name" onChange={handleOnChange}></TextField>
          <SignUpMapAPI hLocation={hLocation} setHLocation={setHLocation}
            cLocation={cLocation} setCLocation={setCLocation}></SignUpMapAPI>
          <TextField style={style.input} variant="standard" value={userInfo.birthday} placeholder="생년월일" helperText="생년월일" required type="date" name="birthday" onChange={(e)=>{setUserInfo({...userInfo, birthday:e.target.value})}}></TextField>
          <FormControl >
            <FormLabel id="demo-radio-buttons-group-label">성별</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="gender"
            >
              <FormControlLabel value="남성" control={<Radio onChange={(e)=>{setUserInfo({...userInfo, gender : e.target.value})}}/>} label="남자" />
              <FormControlLabel value="여성" control={<Radio onChange={(e)=>{setUserInfo({...userInfo, gender : e.target.value})}}/>} label="여자" />
            </RadioGroup>
          </FormControl>
          <Button variant='contained' color='success' onClick={handleFormSubmit}>등록</Button>
        </Stack>
    </Container>
    <Progress/>
    <Snackbar/>
    </Box>
    </div>
    </>
  );
}

export default Signup;