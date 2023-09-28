import React, { Component, useEffect, useState } from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { Link, Route, Routes } from "react-router-dom";
import doc from "../images/doc.svg";
import AuthService from "../services/AuthService";
import parseJWT from "../helpers/JWTService";
import HOME_URL from "../helpers/homeURL";
import { isAdmin, isUser, isShow } from "../helpers/isAdmin";
import isTokenValid from "../tokenTime/tokenValidTime";
import { useLocation } from "react-router-dom";
import example from "../images/example.png";

export default function Header() {
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [mailUser, setmailUser] = useState("");
  const [nameUser, setnameUser] = useState("");
  const [surnameUser, setsurnameUser] = useState("");
  const [activeLink, setActiveLink] = useState(""); // Стан для активного посилання
  const [styleSideMenu, setStyleSideMenu] = useState(false); // Стан для активного посилання

  const setActive = (link) => {
    setActiveLink(link);
  };

  const toggleSideMenuStyle = () => {
    setStyleSideMenu(!styleSideMenu);
  };

  const sideMenuStyle = {
    height: "fit-content",
    width: "fit-content",
  };

  const location = useLocation();

  const headerMail = () => {
    const token = localStorage.getItem("token");
    const parsedTok = parseJWT(token);
    if (parsedTok) {
      setmailUser(parsedTok.email);
      setnameUser(
        parsedTok[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
        ]
      );
      setsurnameUser(
        parsedTok[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
        ]
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const tokenIsValid = isTokenValid();
      setShow(tokenIsValid ? isShow() : false);
      setUser(tokenIsValid ? isUser() : false);
      setAdmin(tokenIsValid ? isAdmin() : false);
      headerMail();
      // console.log("раз");
      if (!tokenIsValid) {
        setButton();
      }
      // Отримуємо поточний шлях сторінки при завантаженні
      setActive(location.pathname);
    };

    fetchData();
  }, [location]);

  // ======Вихід з кабінету LOGOUT======
  const setButton = async () => {
    // Спершу оновлюємо стани, а потім викликаємо AuthService.logout()
    setShow(false);
    setAdmin(false);
    setUser(false);
    AuthService.logout();
  };

  const logOut = () => {
    setmailUser("");
    AuthService.logout();
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        className="headerStyle"
        variant="dark"
      >
        <Container className="headerContainer m-0">
          <NavbarBrand href="/home" className="">
            <img
              src={doc}
              height="30"
              width="180"
              className="d-inline-block"
              alt="Logo"
            />
          </NavbarBrand>
          <NavbarToggle aria-controls="responsive-navbar-nav" />
          <NavbarCollapse id="responsive-navbar-nav">
            
            <Nav className=" header_button">
              {show ? (
                <Link
                  to="/home"
                  className={activeLink === "/home" ? "active" : ""}
                >
                  Головна
                </Link>
              ) : null}
              {/* {!show ? (
                <Link
                  to="/registration"
                  className={activeLink === "/registration" ? "active" : ""}
                >
                  Реєстрація
                </Link>
              ) : null} */}
              {!show ? (
                <Link
                  to="/login"
                  className={
                    activeLink === "/login"
                      ? "active ms-auto btn enterStyle"
                      : "ms-auto btn enterStyle"
                  }
                >
                  Вхід
                </Link>
              ) : null}

              {show ? (
                <div className="exitMailWrap">
                  <NavDropdown
                    title={`${nameUser} ${surnameUser}`}
                    className="dropSelect"
                  >
                    <span className="mailUser">{mailUser}</span>
                    {show ? (
                      <Link
                        to="/aboutuser"
                        className={activeLink === "/aboutuser" ? "active" : ""}
                      >
                        Налаштування
                      </Link>
                    ) : null}
                    {admin ? (
                      <Link
                        to="/adminpage"
                        className={activeLink === "/adminpage" ? "active" : ""}
                      >
                        Адміністратор
                      </Link>
                    ) : null}
                  </NavDropdown>
                </div>
              ) : null}
            </Nav>
            {show ? (
            <div className="leftSideMenu"
            style={styleSideMenu ? sideMenuStyle : {}}>
              <span className="sideMenuName"
                  onClick={toggleSideMenuStyle}
              >Side Menu {styleSideMenu ? <span className="sideMenuRowDown">&#9650;</span> : <span className="sideMenuRowDown">&#9660;</span>}</span>
              <a className="sideMenuRow">
                <img 
                className="me-3 iconSideMenu"
                src={example}
                width="30"
                height="30"
                ></img>
                example
              </a>
              <a className="sideMenuRow">
                <img 
                className="me-3 iconSideMenu"
                src={example}
                width="30"
                height="30"
                ></img>
                example
              </a>
              <a className="sideMenuRow">
                <img 
                className="me-3 iconSideMenu"
                src={example}
                width="30"
                height="30"
                ></img>
                example
              </a>
              <a className="sideMenuRow">
                <img 
                className="me-3 iconSideMenu"
                src={example}
                width="30"
                height="30"
                ></img>
                example
              </a>
              <a className="sideMenuRow">
                <img 
                className="me-3 iconSideMenu"
                src={example}
                width="30"
                height="30"
                ></img>
                example
              </a>
            </div>
             ) : null}
              {show ? (
            <span className="exitBtn btn enterStyle" onClick={logOut}>
                    Вийти
                  </span>
                   ) : null}
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}
