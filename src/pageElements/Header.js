import React, { Component, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { Link, Route, Routes } from "react-router-dom";
import logo from "./logo192.png";
import AuthService from "../services/AuthService";
import parseJWT from "../helpers/JWTService";
import HOME_URL from "../helpers/homeURL";
import { isAdmin, isUser, isShow } from "../helpers/isAdmin";
import isTokenValid from "../tokenTime/tokenValidTime";

// const logOut = () => {
//   AuthService.logout();
//   window.location.reload();
//   window.location.href = HOME_URL;
// };

// const token = localStorage.getItem("token");
// const userData = parseJWT(token);
// console.log("Токен кнопки", userData);
// let show = token ? true : false;
// console.log("token", show);
// let isAdmin;
// if (
//   userData && userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
// ) {
//   let roles =
//     userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
//   isAdmin = roles && roles.includes("admin");
// } else {
//   // Якщо userData  мають значення null або undefined, встановити isAdmin в false.
//   isAdmin = false;
//   console.log("Admin... ", isAdmin);
// }
export default function Header() {
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const tokenIsValid = isTokenValid();
      setShow(tokenIsValid ? isShow() : false);
      setUser(tokenIsValid ? isUser() : false);
      setAdmin(tokenIsValid ? isAdmin() : false);
      // console.log("раз");
      if (!tokenIsValid) {
        setButton();
      }
    };

    fetchData();
  }, []);

  // ======Вихід з кабінету LOGOUT======
  const setButton = async () => {
    // Спершу оновлюємо стани, а потім викликаємо AuthService.logout()
    setShow(false);
    setAdmin(false);
    setUser(false);
    AuthService.logout();
  };

  const logOut = () => {
    AuthService.logout();
    window.location.href = HOME_URL;
  };

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
              {admin ? <Link to="/adminpage">AdminPage</Link> : null}
              {show ? (
                <span className="exitBtn" onClick={logOut}>
                  Exit
                </span>
              ) : null}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}
