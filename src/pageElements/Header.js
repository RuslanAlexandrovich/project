import React, { Component, useEffect, useState, useRef } from "react";
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

  // Бокове меню в хідері ===========================================================

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dropMenuLiContacts, setDropMenuLiContacts] = useState(false); // Стан відображення Li в SideMenu
  const [dropMenuLiComunication, setDropMenuLiComunication] = useState(false); // Стан відображення Li в SideMenu
  const [dropMenuLiDirectory, setDropMenuLiDirectory] = useState(false); // Стан відображення Li в SideMenu

  const toggleDropLiContacts = () => {
    setDropMenuLiContacts(!dropMenuLiContacts);
  };
  const toggleDropLiComunication = () => {
    setDropMenuLiComunication(!dropMenuLiComunication);
  };
  const toggleDropLiDirectory = () => {
    setDropMenuLiDirectory(!dropMenuLiDirectory);
  };

  useEffect(() => {
    // Функція для відслідковування зміни розміру вікна
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // setStyleSideMenu(window.innerWidth > 768);
    };
    // Додаємо слухача подій для зміни розміру вікна
    window.addEventListener("resize", handleResize);

    // Прибираємо слухача подій при розмонтуванні компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =====================Обробник кліку за межами бокового меню в хідері=============================

  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      // Клік здійснений поза wrapperForSideInHeader
      // Закриваємо всі меню
      setDropMenuLiContacts(false);
      setDropMenuLiComunication(false);
      setDropMenuLiDirectory(false);
    }
  };

  // Додаємо обробник кліку при монтуванні компонента
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Хідер ===========================================================

  const setActive = (link) => {
    setActiveLink(link);
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
              className="d-inline-block headerLogo"
              alt="Logo"
            />
          </NavbarBrand>
          <NavbarToggle aria-controls="responsive-navbar-nav" />
          <NavbarCollapse id="responsive-navbar-nav">
            <Nav className=" header_button">
              {show ? (
                <div className={activeLink === "/home" ? "active" : "noActive"}>
                  <Link
                    to="/home"
                    // className={activeLink === "/home" ? "active" : ""}
                  >
                    Головна
                  </Link>
                </div>
              ) : null}
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
                      <div
                        className={
                          activeLink === "/aboutuser" ? "active" : "noActive"
                        }
                      >
                        <Link
                          to="/aboutuser"
                          // className={
                          //   activeLink === "/aboutuser" ? "active" : ""
                          // }
                        >
                          Налаштування
                        </Link>
                      </div>
                    ) : null}
                    {admin ? (
                      <div
                        className={
                          activeLink === "/adminpage" ? "active" : "noActive"
                        }
                      >
                        <Link
                          to="/adminpage"
                          // className={
                          //   activeLink === "/adminpage" ? "active" : ""
                          // }
                        >
                          Користувачі
                        </Link>
                      </div>
                    ) : null}
                  </NavDropdown>
                  {windowWidth < 768 ? (
                    <div
                      className="
                    wrapperForSideInHeader"
                      ref={wrapperRef}
                    >
                        {admin ? (
                      <ul className="sideMenuUl">
                        <div
                          className="d-flex sideMenuDivRow"
                          onClick={toggleDropLiContacts}
                        >
                          Контакти
                          <span className="sideMenuRowDown">&#9660;</span>
                        </div>
                        <li
                          className={
                            dropMenuLiContacts ? "openDropLi" : "inSideMenuLi"
                          }
                        >
                          <Link
                              to="/contacts"
                              className={
                                activeLink === "/contacts"
                                  ? "activeSideBtn"
                                  : "notActiveSideBtn"
                              }
                            >
                              Контактні особи
                            </Link>
                        </li>
                      </ul>
                       ) : null}
                      <ul className="sideMenuUl">
                        <div
                          className="d-flex sideMenuDivRow"
                          onClick={toggleDropLiComunication}
                        >
                          Комунікації
                          <span className="sideMenuRowDown">&#9660;</span>
                        </div>
                        <li
                          className={
                            dropMenuLiComunication
                              ? "openDropLi"
                              : "inSideMenuLi"
                          }
                        >
                          <a>Приклад</a>
                        </li>
                      </ul>
                      {admin ? (
                        <ul className="sideMenuUl">
                          <div
                            className="d-flex sideMenuDivRow"
                            onClick={toggleDropLiDirectory}
                          >
                            Довідники
                            <span className="sideMenuRowDown">&#9660;</span>
                          </div>
                          <li
                            className={
                              dropMenuLiDirectory
                                ? "openDropLi"
                                : "inSideMenuLi"
                            }
                          >
                            <Link
                              to="/regions"
                              className={
                                activeLink === "/regions"
                                  ? "activeSideBtn"
                                  : "notActiveSideBtn"
                              }
                            >
                              Регіони
                            </Link>
                          </li>
                          <li
                            className={
                              dropMenuLiDirectory
                                ? "openDropLi"
                                : "inSideMenuLi"
                            }
                          >
                            <Link
                              to="/regionalmanager"
                              className={
                                activeLink === "/regionalmanager"
                                  ? "activeSideBtn"
                                  : "notActiveSideBtn"
                              }
                            >
                              Регіональні менеджери
                            </Link>
                          </li>
                          <li
                            className={
                              dropMenuLiDirectory
                                ? "openDropLi"
                                : "inSideMenuLi"
                            }
                          >
                            <Link
                              to="/contactgroup"
                              className={
                                activeLink === "/contactgroup"
                                  ? "activeSideBtn"
                                  : "notActiveSideBtn"
                              }
                            >
                              Групи контактних осіб
                            </Link>
                          </li>
                          <li
                            className={
                              dropMenuLiDirectory
                                ? "openDropLi"
                                : "inSideMenuLi"
                            }
                          >
                            <Link
                              to="/eventstype"
                              className={
                                activeLink === "/eventstype"
                                  ? "activeSideBtn"
                                  : "notActiveSideBtn"
                              }
                            >
                              Типи заходів
                            </Link>
                          </li>
                        </ul>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {show ? (
                <span className="exitBtn btn enterStyle" onClick={logOut}>
                  Вийти
                </span>
              ) : null}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}
