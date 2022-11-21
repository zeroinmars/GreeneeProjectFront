import React, {useEffect, useState}from 'react';
import { Eventcalendar, toast } from '@mobiscroll/react';
import {useSelector} from 'react-redux';
import axios from 'axios';


const TimeLine = () => {
  const [myEvents, setEvents] = useState([]);
    const email = useSelector(state=>(state.session.email));

  useEffect(() => {
      axios.post("/lifeConcierge/api/showDailyEvent", {email})
      .then(res=>{
        console.log(res.data);
        setEvents(res.data)
      })
      .catch(err=>{console.log(err)});
    }, []);

  const onEventClick = React.useCallback((event) => {
      toast({
          message: event.event.title
      });
  }, []);
  
  const view = React.useMemo(() => {
      return {
          timeline: { type: 'day' }
      };
  }, []);

  return (
    <div style={{width:"60%", margin:"auto", marginTop:"100px", marginBottom:"300px"}}>
      <Eventcalendar
        theme="ios" 
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        eventDelete={false}
        data={myEvents}
        view={view}
        onEventClick={onEventClick}
       />
    </div>
  )
}

export default TimeLine