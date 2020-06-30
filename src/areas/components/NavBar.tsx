import React from 'react';
import { Navbar} from "react-bootstrap";


export default function NavBar() {
    return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Cats App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
      </Navbar>
        </div>
    )
}
