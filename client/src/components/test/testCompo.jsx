import {Box, Button} from '@mui/material';
import Snackbar from '../Snackbar';
import {useDispatch} from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({type: "SNACKBAR/ON", snackbarToggle: true})
  }
  return(
    <Box>
      
    </Box>
  );
}