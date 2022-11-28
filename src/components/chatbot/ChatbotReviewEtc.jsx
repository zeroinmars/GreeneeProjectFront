/* import axios from "axios";
import { fontWeight } from "@mui/system";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Eventcalendar, toast, getJson } from '@mobiscroll/react';
axios
.post("/chatbotUpdate", data)
.then((res) => {
  console.log("라우터다녀옴");
})
.catch((res) => {
  console.log("error");
}); */
import React, { Component } from "react";
import PropTypes from "prop-types";
class ChatbotReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transport: "",
      job: "",
      hobby: "",
      food: "",
      music: "",
      etctransport: "",
      etcjob: "",
      etchobby: "",
      etcfood: "",
      etcmusic: "",
    };
  }
  componentWillMount() {
    const { steps } = this.props;
    const { transport, job, hobby, food, music,etctransport, etcjob, etchobby, etcfood, etcmusic  } = steps;
    this.setState({ transport, job, hobby, food, music,etctransport, etcjob, etchobby, etcfood, etcmusic });
  }
  render() { 
    let { transport, job, hobby, food, music,etctransport, etcjob, etchobby, etcfood, etcmusic } = this.state;
    let data = {
      transport: transport.value,
      job: job.value,
      hobby: hobby.value,
      food: food.value,
      music: music.value,
    };
    if (data[transport]=='기타'){
      data[etctransport]= etctransport.value
    }
    if (data[job]=='기타'){
      data[etcjob]= etcjob.value
    };
    if (data[hobby]=='기타'){
      data[etchobby]= etchobby.value
    };
    if (data[food]=='기타'){
      data[etcfood]= etcfood.value
    };
    if (data[music]=='기타'){
      data[etcmusic]= etcmusic.value
    };
    return (
      <form onSubmit={"/chatbotUpdate"} method="post">
        <div style={{ width: "100%" }}>                                                        
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>교통수단 : </qq>{transport.value == '기타' ? etctransport.value : transport.value}<br></br>
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>직업 : </qq>{job.value == '기타' ? etcjob.value : job.value}<br></br>
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>취미 : </qq>{hobby.value == '기타' ? etchobby.value : hobby.value}  <br></br>
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>좋아하는 음식 : </qq>{food.value == '기타' ? etcfood.value : food.value}<br></br>
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>좋아하는 음악 : </qq>{music.value == '기타' ? etcmusic.value : music.value}<br></br>
          <button type="submit" style={{border : '5px solid' ,borderRadius: '60px 60px 20px',borderColor:'#f39c12',color: 'white',background: '#f39c12',marginTop: '8px'}}> 네 </button>
          <button type="submit" style={{border : '5px solid' ,borderRadius: '60px 60px 20px',borderColor:'#f39c12',color: 'white',background: '#f39c12',marginTop: '8px'}}> 아니오 </button>
        </div>
      </form>
    );
  }
}
ChatbotReview.propTypes = {
  steps: PropTypes.object,
};
ChatbotReview.defaultProps = {
  steps: undefined,
};
export default ChatbotReview;