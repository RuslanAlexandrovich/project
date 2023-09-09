import React, { Component } from "react";
import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import logo from "./logo192.png";

export default class Footer extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <NavbarBrand href="/">
              <img
                src={logo}
                height="30"
                width="30"
                className="d-inline-block"
                alt="Logo"
              />
            </NavbarBrand>
          </Container>
        </Navbar>
      </>
    );
  }
}
