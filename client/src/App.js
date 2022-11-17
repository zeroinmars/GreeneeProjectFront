import Signup from './pages/Signup';
import Calendar from './pages/Calendar';
import Test from './pages/Test';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import UserInfo from './pages/UserInfo';
import UserChar from './pages/UserChar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MyProfile from './pages/MyProfile';
import axios from 'axios';
import Home from './pages/Home'
import LabelBottomNavigation from './components/LabelBottomNavigation';
import AddEvent from './components/AddEvent';


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    axios.get('/lifeConcierge/api/session')
    .then((res)=>{dispatch({type:"SESSION", session:res.data})})
    .catch(()=>{console.log("세션 호출 에러")});
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/myProfile" element={<MyProfile/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/userInfo" element={<UserInfo/>}/>
          <Route path="/userChar" element={<UserChar/>}/>
          <Route path="/addEvent" element={<AddEvent/>}/>
        </Routes>
        <LabelBottomNavigation/>
      </BrowserRouter>
    </div>
  );
}

export default App;
