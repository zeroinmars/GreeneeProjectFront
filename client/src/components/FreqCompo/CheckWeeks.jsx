import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'

const CheckWeeks = ({checkWeeks, setCheckWeeks}) => {
  const props = {
    checkbox : { inputProps: { 'aria-label': 'Checkbox demo' }, sx: { color: "#adb1ed", '&.Mui-checked': { color: "#4d50a8"}}},
    formControlLabel : {labelPlacement: "top", sx:{margin:"0px"}}
  }
  const handleWeeks = (e) => {
    switch(e.target.value){
      case "true":
        setCheckWeeks({...checkWeeks,[e.target.name]:false});
        break;
      case "false":
        setCheckWeeks({...checkWeeks,[e.target.name]:true});
        break;
    }
    
  }
  return (
    <div>
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} value={checkWeeks.mon} name="mon" onChange={handleWeeks}/>} label="월" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} value={checkWeeks.tue} name="tue" onChange={handleWeeks}/>} label="화" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} value={checkWeeks.wed} name="wed" onChange={handleWeeks}/>} label="수" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} value={checkWeeks.thu} name="thu"onChange={handleWeeks}/>} label="목" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} value={checkWeeks.fri} name="fri" onChange={handleWeeks}/>} label="금" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} value={checkWeeks.sat} name="sat" onChange={handleWeeks}/>} label="토" />
      <FormControlLabel {...props.formControlLabel} control={<Checkbox {...props.checkbox} value={checkWeeks.sun} name="sun" onChange={handleWeeks}/>} label="일" />
    </div>
  )
}

export default CheckWeeks