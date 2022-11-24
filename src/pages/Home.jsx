import AddEventButton from '../components/FreqCompo/AddEventButton';
import Timeline from '../components/Timeline';
import Snackbar  from '../components/FreqCompo/Snackbar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
/* import LabelBottomNavigation from '../components/LabelBottomNavigation'; */

export default () => {
  const dispatch = useDispatch();
  const isEventAdded = useSelector((state)=>(state.isEventAdded))
  useEffect(()=>{
    if (isEventAdded) {
      dispatch({type:"SNACKBAR/ON", snackbar: {snackbarToggle:true, explain:"일정이 성공적으로 등록 되었습니다.", severity:"success"}});
      dispatch({type:"ISEVENTADDED", isEventAdded: false});
    }
  })
  return(
    <>  
     <AddEventButton/> 
      <Timeline></Timeline>
      <Snackbar/>
    </>
  );
}