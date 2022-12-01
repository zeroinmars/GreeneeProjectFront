import { Form, Button } from "react-bootstrap";
import sendImage from "../../../img/send-icon.png";
import React, { useState } from "react";

function Footer(props) {
  /*  */
  const [inputform, setinputform] = useState("");
  const handleChange = ({ target: { value } }) => setinputform(value);
  /*  */
  const handleSubmit = (event) => {
    /* 라우트이동방지 */
    event.preventDefault();
    /* 인풋 */
    props.setMessage(inputform, true);
    //alert(`변경된 패스워드: ${inputform}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <footer>
        <Form.Control
          onChange={handleChange}
          type="inputform"
          name="inputform"
          value={inputform}
          placeholder=" 무엇이든 물어보세요."
          className="input-form"
        />
        <Button variant="#fff" type="submit" className="input-button">
          <img className="send-icon" src={sendImage} />
        </Button>
      </footer>
    </Form>
  );
}
export default Footer;
