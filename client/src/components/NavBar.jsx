import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from 'react'
import axios from 'axios';
import {AppBar, Box, Toolbar, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Menu, MenuItem} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import Snackbar from './Snackbar';
import Progress from './Progress';

const pages = [{page:"메인",path:'/'}, {page:"일정관리",path:"/calendar"}, {page:"회계관리",path:"/accountManage"}, {page:"유저 정보(개발자 전용)", path:"/userInfo"}, {page:"유저 성향(개발자 전용)", path:"/userChar"}]


export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector(res=>(res.session));
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [inputValue, setInputValue] = useState({
    email:"",
    pw:""
  })
  const handleOpenClick = () => {
    setOpenLogin(true);
  }
  const handleClose = () => {
    setOpenLogin(false);
  }
  const handleLogin = async () => {
    const url = "/lifeConcierge/api/login";
    dispatch({type:"PROGRESS/ON", progress:{progressToggle:true}});
    axios.post(url, inputValue)
    .then((res)=>{
      if(res.data == "NoneId") {
        dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.", severity:"error"}});
        
      }else{
        dispatch({type:"SESSION", session: res.data.rows[0]}); // redux store 안에 DB에 저장 된 session값 저장.
        dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"로그인 되었습니다.", severity:"success"}});
      }
      dispatch({type:"PROGRESS/ON", progress:{progressToggle:false}});
      navigate('/');
    })
    .catch((err)=>{
      dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"로그인 실패되었습니다.", severity:"error"}});
      dispatch({type:"PROGRESS/ON", progress:{progressToggle:false}});
      navigate('/');
    })

    setOpenLogin(false);

  }
  const handleLogOut = () => {
    fetch("/lifeConcierge/api/logout");
    dispatch({type:"SESSION", session:{}})
    dispatch({type:"SNACKBAR/ON", snackbar:{snackbarToggle:true, explain:"로그아웃 되었습니다.", severity:"success"}});
    navigate('/');
  }
  const handleInputValue = (e) => {
    if(e.target.name==="email") {
      setInputValue({email:e.target.value, pw:inputValue.pw})
    }else if (e.target.name ==="pw") {
      setInputValue({email:inputValue.email, pw:e.target.value});
    }
  }
  const handleOpenNavMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const handleCloseNavMenu = () => {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenNavMenu}
          > 
            <MenuIcon/>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseNavMenu}>
            {pages.map(pageObj=><Link to={pageObj.path} style={{textDecoration:"none", color:"black"}}><MenuItem key={pageObj.page} onClick={handleCloseNavMenu}><Typography>{pageObj.page}</Typography></MenuItem></Link>)}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          </Typography>
          <Button  color="inherit" component="span" onClick={()=>{console.log(session)}}>세션 데이터 확인</Button>
          {JSON.stringify(session)!='{}'?<Button color="inherit" onClick={handleLogOut}>로그아웃</Button>:<Button color="inherit" onClick={handleOpenClick}>로그인</Button>}
          <Dialog open={openLogin} onClose={handleClose}>
            <DialogTitle>로그인
              <DialogContent>
                <TextField label="이메일" type="text" name="email" onChange={handleInputValue}></TextField><br/>
                <TextField label="비밀번호" type="password" name="pw" onChange={handleInputValue}></TextField>
              </DialogContent>
              <DialogActions>
                <Link to="/signUp" style={{textDecoration:"none", color:"white", marginRight:"4px"}}><Button variant="contained" color="primary" onClick={()=>{setOpenLogin(false)}}>회원가입</Button></Link>
                <Button variant="contained" color="primary" component="span" onClick={handleLogin}>로그인</Button>
                <Button variant="outlined" color="primary" component="span" onClick={handleClose}>취소</Button>
              </DialogActions>
            </DialogTitle>
          </Dialog>
          <Progress/>
        </Toolbar>
      </AppBar>
      <Snackbar explain="로그인 성공 했습니다. "/>
    </Box>
  );
}
