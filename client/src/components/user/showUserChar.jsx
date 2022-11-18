import {Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress} from '@mui/material';
import { useEffect, useState } from 'react'

export default () => {
  const callApi = async () => {
    const response = await fetch("/lifeConcierge/api/userchar");
    const body = await response.json();
    return body;
  }
  const [userChar, setUserChar] = useState([]);
  useEffect(()=>{
    callApi()
    .then((res)=>{setUserChar(res)})
    .catch((err)=>{console.log(err)})
  });

  return(
    <Paper sx={{width:"90%", m:"auto", marginTop:"50px"}}>
      <Typography sx={{textAlign:"center", fontSize:"25px", mb:"30px"}}> 유저 성향</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>교통수단</TableCell>
            <TableCell>취미</TableCell>
            <TableCell>선호음식</TableCell>
            <TableCell>선호음료</TableCell>
            <TableCell>MBTI</TableCell>
            <TableCell>선호패션</TableCell>
            <TableCell>선호음악</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userChar?userChar.map(user=><TableRow key={user.pk}>
            <TableCell>name</TableCell>
            <TableCell>{user.transpo}</TableCell>
            <TableCell>{user.hobby}</TableCell>
            <TableCell>{user.food}</TableCell>
            <TableCell>{user.drink}</TableCell>
            <TableCell>{user.mbti}</TableCell>
            <TableCell>{user.fashion}</TableCell>
            <TableCell>{user.music}</TableCell>
          </TableRow>):<TableRow><TableCell align='center' colSpan="10"><CircularProgress></CircularProgress></TableCell></TableRow>}
        </TableBody>
      </Table>
    </Paper>
  );
}