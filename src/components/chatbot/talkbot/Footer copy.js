import {Form,Button} from 'react-bootstrap'
import sendImage from '../../../img/send-icon.png'


function Footer() {
  return (
      <footer>
        <Form.Control placeholder=" 그리니가 상담해 드리겠습니다." className="input-form"/>
        <Button variant="#fff" type="submit" className="input-button">
        {/* <Button variant="primary" type="submit" className="input-button"> */}
            <img className = "send-icon" src={sendImage} />
        </Button>
      </footer>
  );
}

export default Footer;