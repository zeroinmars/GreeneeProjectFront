import React from "react"; 
import {Toast,ToastContainer} from 'react-bootstrap'
import Footer from './Footer'
import a2 from "../../../img/greenee.png";
function Main(props) {
  return (
      <main className = "main-container">
          
          <ToastContainer bsPrefix = "toast-main-container">
            {
                props.message.map((item) => (
                    item.from ? (
                        /* bg:버블컬러 */
                        <Toast     bg = 'warning' className = "my-message">

                            <Toast.Body>{item.msg}</Toast.Body>
                        </Toast>
                    )
                    : (
                        
                     
 

                        <Toast     className = "other-message">
                          
                     
                            <Toast.Body><img
                        src={a2}
                        className={"a2"}
                        style={{ width: "70px", padding: "20px"}}
                      />{item.msg}</Toast.Body>
                        </Toast>
                    )
                ))
                
            }
                  </ToastContainer>
      </main>
  );
}

export default Main;