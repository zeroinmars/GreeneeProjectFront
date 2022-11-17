import React, {useEffect} from 'react'
import Login from '../components/Signup/Login';
import Profile from '../components/Profile';
import {useSelector, useDispatch} from 'react-redux';
import { Button } from'@mui/material';
import Snackbar from '../components/Snackbar';
import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    if (confirm) {
      dispatch({type:"SNACKBAR/ON", snackbar: {snackbarToggle:true, explain:"로그인 성공 했습니다.", severity:"success"}});
      dispatch({type:"CONFIRM", confirm:false});
    }
  })
  const session = useSelector(state=>(state.session))
  const confirm = useSelector(state=>(state.confirm))
  return (
    <div>
        {/* <Button onClick={()=>{console.log(session)}}>세션 데이터 확인</Button> */}
        {session.email?<Profile/>:<Login/>}
        <Snackbar/>
        <Link style={{position:"fixed", bottom:"80px", right:"10px"}} to='/chatbot'> <MessageIcon/> </Link>
    </div>
  )
}

export default MyProfile;
