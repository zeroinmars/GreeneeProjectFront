import React from 'react'
import CheckWeeks from './CheckWeeks';

const WeekCheck = ({name, title, checkWeeks, setCheckWeeks}) => {
    const [click, setClick] = React.useState(false);
    const style = {
        true : {
            color:"white",
            backgroundColor:"#ff9c00",
            height:"45px",
            width:"45px",
            borderRadius:"30px",
            textAlign:"center",
            lineHeight:"45px",
            margin:"4px",
            border:"none"
    },
        false : {
            color:"white",
            backgroundColor:"silver",
            height:"45px",
            width:"45px",
            borderRadius:"30px",
            textAlign:"center",
            lineHeight:"45px",
            margin:"4px",
            border:"none"
        }
    }

    // 구조분해 할당

    // let k = {a:1, b:2, c: 3}

    //{b, c} = k


    // {mon:false, tue:false, wed:false, thr:false, fri:false, sat:false, sun:false}

    const handleChangeWeeksTrue = (e) =>{
        handleClick();
        setCheckWeeks({...checkWeeks, [e.target.name] : true})
    }
    
    const handleChangeWeeksFalse = (e) =>{
        handleClick();
        setCheckWeeks({...checkWeeks, [e.target.name] : false})
    }

    const handleClick = () => {
        setClick(!click);
    }
    

  return (
      <div>
        {click?
        <button name={name} style={style.true} onClick={handleChangeWeeksFalse}>{title}</button>
        : <button name={name} style={style.false} onClick={handleChangeWeeksTrue}>{title}</button>}
    </div>
  )
}

export default WeekCheck