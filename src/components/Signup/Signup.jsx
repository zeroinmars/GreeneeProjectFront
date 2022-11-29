import { useState } from 'react';
import UserInfo from './UserInfo';
import axios from 'axios';
import {Box, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Snackbar from '../FreqCompo/Snackbar';
import Progress from '../FreqCompo/Progress';
import HeaderAlarm from '../HeaderAlarm';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Container, TextField, Stack} from '@mui/material';



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
    const url = "/lifeConcierge/api/signup";
    if (isAllNotUndefined(userInfo)) {
      dispatch({type:"PROGRESS", progress:{progressToggle:true}});
      axios.post(url, userInfo)
      .then((res)=>{
        console.log(res);
        dispatch({type:"PROGRESS", progress:{progressToggle:false}});
        navigate('/myProfile');
        dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"회원가입이 성공적으로 완료 되었습니다.", severity:"success"}});
      })
      .catch((err)=>{
        console.log(err);
        dispatch({type:"PROGRESS", progress:{progressToggle:false}});
        dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"회원가입 오류", severity:"error"}});
      })
    } else {
      dispatch({type:"PROGRESS", progress:{progressToggle:false}});
      dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"비어 있는 값이 있습니다. 다시 입력 해 주세요,", severity:"error"}});
    }
  }

  return (
    <Box>
      <HeaderAlarm></HeaderAlarm>
      <Container sx={{marginTop:"10%"}}>
        <Stack spacing={2} alignItems="stretch">
          <TextField style={style.input} variant="standard" value={userInfo.email} placeholder="이메일"  name="email" onChange={handleOnChange}></TextField>
          <TextField style={style.input} variant="standard" value={userInfo.pw} placeholder="비밀번호"  type="password" name="pw" onChange={handleOnChange}></TextField>
          <TextField error={userInfo.pw !== pwCheck} style={style.input} variant="standard" value={pwCheck} placeholder="비밀번호확인" type="password" onChange={(e) => {setPwCheck(e.target.value)}}></TextField>
          <TextField style={style.input} variant="standard" value={userInfo.name} placeholder="이름" name="name" onChange={handleOnChange}></TextField>
          <TextField style={style.input} variant="standard" value={userInfo.hAddr} placeholder="자택 주소" name="hAddr" onChange={handleOnChange}></TextField>
          <TextField style={style.input} variant="standard" value={userInfo.cAddr} placeholder="회사 주소" name="cAddr" onChange={handleOnChange}></TextField>
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
  );
}

export default  Signup;