import React, { Component } from "react";
import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import logo from "./logo192.png";

export default class Footer extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container className="Footer">
            <NavbarBrand href="/">
              <img
                src={logo}
                height="30"
                width="30"
                className="d-inline-block"
                alt="Logo"
              />
            </NavbarBrand>
            <div className="infoFooterContainer">
              <span className="footerText">KAI</span>
            </div>
          </Container>
        </Navbar>
      </>
    );
  }
}
