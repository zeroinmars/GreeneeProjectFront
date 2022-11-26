import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
/* import { fontWeight } from "@mui/system";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Eventcalendar, toast, getJson } from '@mobiscroll/react'; */
class ChatbotReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transport: "",
      job: "",
      hobby: "",
      food: "",
      music: "",
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { transport, job, hobby, food, music } = steps;

    this.setState({ transport, job, hobby, food, music });
  }

  render() {
    let { transport, job, hobby, food, music } = this.state;

    let data = {
      transport: transport.value,
      job: job.value,
      hobby: hobby.value,
      food: food.value,
      music: music.value,
    };

    axios
      .post("/chatbotUpdate", data)
      .then((res) => {
        console.log("라우터다녀옴");
      })
      .catch((res) => {
        console.log("error");
      });

    /*     const title = {
        style:"border-bottom: 3px solid;",
        background: "teal",
        padding: ".375rem .75rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,  
      }; */

    return (
      <form onSubmit={"/chatbotUpdate"} method="post">
        <div style={{ width: "100%" }}>
          {/* <table style={{ borderTop: "solid", borderBottom: "solid" }}> */}
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>교통수단 : </qq>{transport.value}<br></br>
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>직업 : </qq>{job.value}<br></br>
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>취미 : </qq>{hobby.value} <br></br>
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>좋아하는 음식 : </qq>{food.value} <br></br>
                <qq style={{ fontSize: '15px',fontWeight: "bold",color: "white",}}>좋아하는 음악 : </qq>{music.value}  <br></br>
        {/*   <table>
            <tbody>
              <tr>
                <td>교통수단 :</td>
                <td>{transport.value}</td>
              </tr>
              <tr>
                <td>직업 : </td>
                <td>{job.value}</td>
              </tr>
              <tr>
                <td>취미 : </td>
                <td>{hobby.value}</td>
              </tr>
              <tr>
                <td>좋아하는 음식 : </td>
                <td>{food.value}</td>
              </tr>
              <tr>
                <td>좋아하는 음악 : </td>
                <td>{music.value}</td>
              </tr>
            </tbody>
          </table> */}


          <button type="submit" style={{border : '5px solid' ,borderRadius: '60px 60px 20px',borderColor:'#f39c12',color: 'white',background: '#f39c12',marginTop: '8px'}}>네, 홈으로 가겠습니다</button>
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
