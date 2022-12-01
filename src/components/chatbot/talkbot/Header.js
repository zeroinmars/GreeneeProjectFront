import {Navbar} from 'react-bootstrap'

function Header() {
  return (
    <Navbar   variant="dark" className = "header-container">
        <Navbar.Brand className = "header-title-container">
            <h3> Greenee</h3>
        </Navbar.Brand>
    </Navbar>
  );
}

export default Header;