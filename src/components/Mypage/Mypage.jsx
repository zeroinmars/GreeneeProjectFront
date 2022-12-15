import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FormControl, TextField, Button, Avatar, Dialog,
    DialogTitle, DialogContent, Stack
} from '@mui/material';
import "../../css/Mypage.css";
import greenee from "../../img/greenee.png"
import password from "./Mypageimg/password.png"
import patchnote from "./Mypageimg/patchnote.png"
import hAddr from "./Mypageimg/hAddr.png"
import cAddr from "./Mypageimg/cAddr.png"
import nickname from "./Mypageimg/nickname.png"
import light_icon from "./Mypageimg/light.png"
import tendancy from "./Mypageimg/tendancy.png"
import tag from "./Mypageimg/tag.png"
import LabelBottomNavigation from "../../components/LabelBottomNavigation";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import happygreenee from '../../img/greeneehappy.png';

function Profile() {

    const [themeColor, setThemeColor] = useState('');
    const theme = createTheme({
        palette: {
            secondary: {
                main: (themeColor ? themeColor : '#2ecc71'),
                // main: ('#2ecc71')
            },
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openChat, setOpenChat] = useState(false);

    const Logout = () => {
        dispatch({ type: "PROGRESS", progress: { progressToggle: true } });
        axios.get('/lifeConcierge/api/logout')
            .then(() => {
            })
            .catch(() => {
                dispatch({ type: "SNACKBAR/ON", snackbar: { snackbarToggle: true } });
            })
        window.location.replace("/myProfile");
    }

    // const Logout= () => {
    //     // navigate("/Myprofile");
    //
    // };


    const EditNick = () => {
        navigate("/EditNick");
    };

    const EditPw = () => {
        navigate("/EditPw");
    };

    const EdithAddr = () => {
        navigate("/EdithAddr");
    };

    const EditcAddr = () => {
        navigate("/EditcAddr");
    };

    const EditTendancy = () => {
        navigate("/Chatpersonal")
    }

    const Patchnote = () => {
        navigate("/Patchnote");
    };

    const Edittag = () => {
        navigate("/Edittag")
    }




    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const fileInput = useRef()
    // const setFile = useRef()
    const [file_, setFile] = useState();
    const onChange = (e) => {
        if (e.target.files[0]) {
            // setFile(e.target.files[0])
        } else { //업로드 취소할 시
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
            return
        }
        //화면에 프로필 사진 표시
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <div className='profile_page'>
            <div>
                <Avatar className='avatar'
                    src={Image}
                    onClick={() => { fileInput.current.click() }}>
                </Avatar>
                <input type='file' style={{ display: 'none' }} accept='image/jpg,impge/png,image/jpeg'
                    name='profile_img' onChange={onChange}
                    ref={fileInput}></input>
            </div>
            <div className='name_mail'>
                <p>김게을<br />
                    kim@green.com<br /><br />
                    가입날짜 2022-12-11</p>
            </div>
            <Button className='logout_btn' onClick={Logout}>로그아웃</Button>

            <div className="my_info">

                <li className='list1' onClick={EditNick}>
                    <span className="item_text" ><img src={nickname} className='icon' /> 닉네임</span>
                    <Button className="btn_edit"> 〉</Button>
                </li>

                <li className='list2' onClick={EditPw}>
                    <span className="item_text"><img src={password} className='icon' /> 비밀번호</span>
                    <Button className="btn_edit"> 〉</Button>
                </li>
                <li className='list2' onClick={EdithAddr}>
                    <span className="item_text"><img src={hAddr} className='icon' /> 자택 주소</span>
                    <Button type="button" className="btn_edit"> 〉</Button>
                </li>
                <li className='list2' onClick={EditcAddr}>
                    <span className="item_text"><img src={cAddr} className='icon' /> 회사 주소</span>
                    <Button type="button" className="btn_edit"> 〉</Button>
                </li>

                <li className='list2' onClick={() => { setOpenChat(true) }}>
                    <span className="item_text"><img src={tendancy} className='icon' /> 성향 정보</span>
                    <Button type="button" className="btn_edit"> 〉</Button>
                </li>

                <li className='list2' onClick={Edittag}>
                    <span className="item_text"><img src={tag} className='icon' /> 태그수정</span>
                    <Button type="button" className="btn_edit"> 〉</Button>
                </li>

                <li className='list2' onClick={Patchnote}>
                    <span className="item_text"><img src={patchnote} className='icon' /> 패치노트</span>
                    <Button type="button" className="btn_edit"> 〉</Button>
                </li>


            </div>
            <div className='foot'>
                <p>버전 1.0.0 <br />
                    ECLIPSE</p>
            </div>
            <Dialog onClose={() => { setOpenChat(false) }} open={openChat}>
                <div className="delete_event">
                    <DialogTitle className='delete_event_title'>
                    </DialogTitle>
                    <img src={happygreenee} style={{ width: '16vh' }}></img>

                    <DialogContent><p>성향을 수정하시려구요?</p></DialogContent>

                    <ThemeProvider theme={theme}>

                        <Button className="button_deny" variant="contained" color='secondary' size="medium"
                        style={{ color: 'white', font: 'bold' }}
                        onClick={() => {navigate('/chatpersonal')}}
                        > 응</Button>
                        <Button className="button_accept" variant="contained" color='secondary' size="medium"
                            style={{ color: 'white', font: 'bold' }}>아니</Button>

                    </ThemeProvider>

                </div>
            </Dialog>
            <LabelBottomNavigation></LabelBottomNavigation>
        </div>
    )
}


export default Profile;