import React,{useEffect, useState}from 'react';
import { Eventcalendar, toast } from '@mobiscroll/react';
import axios from 'axios'
import {useSelector} from'react-redux';
function Calendar() {
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
            calendar: { type: 'month' }
        };
    }, []);

    return (
      <>
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
       {/* <button onClick={()=>{console.log(myEvents)}}></button> */}
      </>
    ); 
}

export default Calendar;