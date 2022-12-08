import React, {useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { FormControl, TextField, Button, borders } from '@mui/material';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import SnackBar from '../FreqCompo/Snackbar';
import Progress from '../FreqCompo/Progress'
/* import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom'; */
import greenee from '../../img/greenee.png'
import { Container } from 'react-bootstrap';
import "../../css/Patchnote.css";
import backback from "./Mypageimg/backback.png"



const Patchnote = () => {

  const goback = () => {
    window.history.back();
  }
  
  return(
    <div className='patch_page'>
      <div id='wrapper'>
      <h1 className='title'>패치노트</h1>
      <br></br>
      <h3 className='sub_title'>Patch Note</h3>
      {/* <button class="bg-blue-500 relative inline-flex h-8 w-14 items-center rounded-full sm:h-6 sm:w-11" id="headlessui-switch-1" role="switch" tabindex="0" aria-checked="false" data-headlessui-state="" type="button"><span class="sr-only">Enable Darkmode</span><span class="absolute top-1 right-0.5 sm:top-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-6 w-6 text-yellow-400 sm:h-5 sm:w-5"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z">
      </path></svg></span><span class="translate-x-1 sm:translate-x-0.5 inline-block h-6 w-6 transform rounded-full bg-white transition sm:h-5 sm:w-5">
      </span></button> */}
      </div>
      <div className='patch_contents'>
        <Button className='return_btn' color='success' variant='contained' onClick={goback}>돌아가기</Button>
      </div>
        
        <footer className='foot_p'>
          <p>버전 1.0.0</p>
        </footer>
      
    </div>
    )
}
export default Patchnote; 