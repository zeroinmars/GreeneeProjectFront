import {Navbar} from 'react-bootstrap'
// import backback from "../../Mypage/Mypageimg/backback.png"
import { Button } from '@mui/material';
function Header() {
  const goback = () => {
    window.history.back();
  }

  return (
    <Navbar   variant="dark" className = "header-container">
      {/* <Button className='edit_back' onClick={goback}><img src={backback} className='back_btn' /></Button> */}
        <Navbar.Brand className = "header-title-container">
          <div style={{display:'flex', alignItems: 'center', flexDirection: 'row', height:'30px' }}
           >
            <Button style={{color:'white', fontSize:'25px', fontWeight:'bold'}} onClick={goback}>{'<'}</Button>
            <h3 style={{display:'inline'}}> Greenee</h3></div>
        </Navbar.Brand>
    </Navbar>
  );
}

export default Header;