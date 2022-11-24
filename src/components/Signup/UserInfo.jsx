import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Container, TextField, Stack} from '@mui/material';
import axios from 'axios'
import {useSelector} from'react-redux';
import {useState} from 'react';

/* mui css에 css파일을 오버라이딩 하기 위한*/
/* import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
const cache = createCache({
  key: "css",
  prepend: true,
}); */

export default ({ inputUserInfo, setInputUserInfo }) => {
  const userInfo = useSelector(state=>state.user.userInfo);
  const addCustomer = () => {
    const url = "/lifeConcierge/api/signUp";
    const data = {
      email:inputUserInfo.email,
      pw:inputUserInfo.pw,
      name:inputUserInfo.name,
      gender:inputUserInfo.gender,
      birthday:inputUserInfo.birthday,
      job:inputUserInfo.job,
      hAddr:inputUserInfo.hAddr,
      cAddr:inputUserInfo.cAddr,
      disease:inputUserInfo.disease
    }
    return axios.post(url,data);
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    addCustomer()
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)});
  }
  const [checkId, setCheckId] = useState({
    error:false,
    helperText:""
  })
  const handleOnChange = (e)=>{
    setInputUserInfo({...inputUserInfo, email:e.target.value})
    
  }
  return(
  
    <>
      <Container sx={{marginTop:"10%"}}>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2} alignItems="stretch">
          <TextField style={{marginTop:"30px"}} variant="standard" placeholder="이메일"error={inputUserInfo.email===""?true:false}  name="email" value={inputUserInfo.email} onChange={handleOnChange}></TextField>
          {/* <TextField variant="standard" error={inputUserInfo.pw===""?true:false} label="비밀번호" type="password" name="pw" onChange={(e)=>{setInputUserInfo({...inputUserInfo, pw:e.target.value})}}></TextField> */}
          <TextField style={{marginTop:"30px"}} variant="standard" placeholder="비밀번호"error={inputUserInfo.pw===""?true:false}  type="password" name="pw" onChange={(e)=>{setInputUserInfo({...inputUserInfo, pw:e.target.value})}}></TextField>
          {/* 비밀번호 확인 구현 */}
          <TextField style={{marginTop:"30px"}} variant="standard" placeholder="비밀번호확인" error={inputUserInfo.pw===""?true:false}  type="password" name="pw" onChange={(e)=>{setInputUserInfo({...inputUserInfo, pw:e.target.value})}}></TextField>
          <TextField style={{marginTop:"30px"}} variant="standard" placeholder="이름"error={inputUserInfo.name===""?true:false} name="name" value={inputUserInfo.name} onChange={(e)=>{setInputUserInfo({...inputUserInfo, name:e.target.value})}}></TextField>
          <TextField style={{marginTop:"30px"}} variant="standard" placeholder="자택 주소"error={inputUserInfo.hAddr===""?true:false} name="hAddr" value={inputUserInfo.hAddr} onChange={(e)=>{setInputUserInfo({...inputUserInfo, hAddr:e.target.value})}}></TextField>
          <TextField style={{marginTop:"30px"}} variant="standard" placeholder="회사 주소"error={inputUserInfo.cAddr===""?true:false} name="cAddr" value={inputUserInfo.cAddr} onChange={(e)=>{setInputUserInfo({...inputUserInfo, cAddr:e.target.value})}}></TextField>
          <TextField style={{marginTop:"30px"}} variant="standard" placeholder="생년월일"error={inputUserInfo.brithday===""?true:false} helperText="생년월일" required type="date" name="birthday" value={inputUserInfo.birthday} onChange={(e)=>{setInputUserInfo({...inputUserInfo, birthday:e.target.value})}}></TextField>
          <FormControl style={{marginTop:"30px"}}>
            <FormLabel id="demo-radio-buttons-group-label">성별</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="gender"
            >
              <FormControlLabel value="남성" control={<Radio onChange={(e)=>{setInputUserInfo({...inputUserInfo, gender : e.target.value})}}/>} label="남자" />
              <FormControlLabel value="여성" control={<Radio onChange={(e)=>{setInputUserInfo({...inputUserInfo, gender : e.target.value})}}/>} label="여자" />
            </RadioGroup>
          </FormControl>
        </Stack>
      </form>
    </Container>
    </>
  );
}