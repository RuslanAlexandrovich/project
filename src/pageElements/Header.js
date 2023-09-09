import React, { Component } from "react";
import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { Link, Route, Routes } from "react-router-dom";
import logo from "./logo192.png";
import AuthService from "../services/AuthService";
import parseJWT from "../helpers/JWTService";
import HOME_URL from "../helpers/homeURL";

// ======Вихід з кабінету LOGOUT======

const logOut = () => {
  AuthService.logout();
  window.location.reload();
  window.location.href = HOME_URL;
};
// ======Перевірка наявності користувача в системі. Відображення залежностей USER/ADMIN======
const token = localStorage.getItem("token");
const userData = parseJWT(token);
console.log(userData);
let show = token ? true : false;
console.log("token", show);
let isAdmin;
if (
  userData &&
  userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
) {
  let roles =
    userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  isAdmin = roles && roles.includes("admin");
} else {
  // Якщо userData  мають значення null або undefined, встановити isAdmin в false.
  isAdmin = false;
  console.log("Admin... ", isAdmin);
}
export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
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
            <NavbarToggle aria-controls="responsive-navbar-nav" />
            <NavbarCollapse id="responsive-navbar-nav">
              <Nav className="me-auto header_button">
                <Link to="/">Home</Link>
                {!show ? <Link to="/registration">Registration</Link> : null}
                {!show ? <Link to="/login">LogIn</Link> : null}
                {show ? <Link to="/aboutuser">AboutUser</Link> : null}
                {isAdmin ? <Link to="/adminpage">AdminPage</Link> : null}
              </Nav>
            </NavbarCollapse>
            {show ? <Button onClick={logOut}>Exit</Button> : null}
          </Container>
        </Navbar>
      </>
    );
  }
}
