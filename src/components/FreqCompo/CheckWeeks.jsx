import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import WeekCheck from './WeekCheck'; 

// checkWeeks
const CheckWeeks = ({checkWeeks, setCheckWeeks}) => {
  const props = {
    checkbox : { sx: {color: "#ff9c00", '&.Mui-checked': { color: "#ff9c00"}}},
    formControlLabel : {labelPlacement: "top", sx:{margin:"0px"}}
  }
  const handleWeeks = (e) => {
    setCheckWeeks({[e.target.name]:!checkWeeks})
    console.log(checkWeeks)
  }
  return (
    <div style={{display:"flex"}}>
      <WeekCheck name="mon" title="월" checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks}/>
      <WeekCheck name="tue" title="화" checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks}/>
      <WeekCheck name="wed" title="수" checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks}/>
      <WeekCheck name="thu" title="목" checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks}/>
      <WeekCheck name="fri" title="금" checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks}/>
      <WeekCheck name="sat" title="토" checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks}/>
      <WeekCheck name="sun" title="일" checkWeeks={checkWeeks} setCheckWeeks={setCheckWeeks}/>
      {/* <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} name="mon" onChange={handleWeeks} />} label="월" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} name="tue" onChange={handleWeeks}/>} label="화" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} name="wed" onChange={handleWeeks}/>} label="수" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} name="thur"onChange={handleWeeks}/>} label="목" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} name="fri" onChange={handleWeeks}/>} label="금" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} name="sat" onChange={handleWeeks}/>} label="토" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} name="sun" onChange={handleWeeks}/>} label="일" /> */}
    </div>
  )
}

export default CheckWeeks