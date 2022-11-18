import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {BottomNavigation,  BottomNavigationAction} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');
  const nav = useNavigate();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{position:"fixed", width: "100%", bottom:0}} value={value} showLabels onChange={handleChange}>
      <BottomNavigationAction
        onClick={()=>{nav("/")}}
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        onClick={()=>{nav("/calendar")}}
        label="Calendar"
        value="calendar"
        icon={<CalendarMonthIcon />}
      />
      <BottomNavigationAction
        onClick={()=>{nav("/memo")}}
        label="Memo"
        value="memo"
        icon={<AutoAwesomeMotionIcon />}
      />
      
      <BottomNavigationAction 
        onClick={()=>{nav("/myProfile")}}
        label="MyProfile" 
        value="myProfile" 
        icon={<PersonIcon/>} 
      />
    </BottomNavigation>
  );
}
