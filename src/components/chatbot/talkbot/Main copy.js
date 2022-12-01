import {Toast,ToastContainer} from 'react-bootstrap'

function Main(props) {
  return (
      <main className = "main-container">
          <ToastContainer bsPrefix = "toast-main-container">
            {
                props.message.map((item) => (
                    item.from ? (
                        <Toast bg = 'info' className = "my-message">
                            <Toast.Body>{item.msg}</Toast.Body>
                        </Toast>
                    )
                    : (
                        <Toast bg = 'light' className = "other-message">
                            <Toast.Body>{item.msg}</Toast.Body>
                        </Toast>
                    )
                ))
                
            }
          </ToastContainer>
      </main>
  );
}

export default Main;