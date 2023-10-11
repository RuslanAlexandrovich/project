import React, { useState, useEffect, useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { isAdmin, isUser, isShow } from "../helpers/isAdmin";
import { useLocation } from "react-router-dom";
import example from "../images/example.png";
import rightrow from "../images/rightrow.png";
import leftrow from "../images/leftrow.png";
import burger from "../images/burger.png";
import doc from "../images/doc.svg";

export default function LeftSideMenu() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [visibleMenu, setVisibleMenu] = useState(false);
  const [styleSideMenu, setStyleSideMenu] = useState(false); // Стан для активного посилання ЗМІНА КЛАСУ leftSideMenu
  const [dropMenuLiContacts, setDropMenuLiContacts] = useState(false); // Стан відображення Li в SideMenu
  const [dropMenuLiComunication, setDropMenuLiComunication] = useState(false); // Стан відображення Li в SideMenu
  const [dropMenuLiDirectory, setDropMenuLiDirectory] = useState(false); // Стан відображення Li в SideMenu
  const sideMenuRef = useRef(null);
  const [activeLink, setActiveLink] = useState(""); // Стан для активного посилання

  //============================Відстеження активного посилання=============================
  const setActive = (link) => {
    setActiveLink(link);
  };
  const location = useLocation();

  useEffect(() => {
    // Отримуємо поточний шлях сторінки при завантаженні
    setActive(location.pathname);
  }, [location]);

  const toggleSideMenuStyle = () => {
    setStyleSideMenu(!styleSideMenu);
  };
  const toggleDropLiContacts = () => {
    if (styleSideMenu) {
      setDropMenuLiContacts(!dropMenuLiContacts);
    }
  };
  const toggleDropLiComunication = () => {
    if (styleSideMenu) {
      setDropMenuLiComunication(!dropMenuLiComunication);
    }
  };
  const toggleDropLiDirectory = () => {
    if (styleSideMenu) {
      setDropMenuLiDirectory(!dropMenuLiDirectory);
    }
  };

  const visibleSideMenu = isShow();
  const Admin = isAdmin();

  // =====================Відстеження ширини екрану=============================

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

  useEffect(() => {
    if (!styleSideMenu) {
      setDropMenuLiContacts(false);
      setDropMenuLiComunication(false);
      setDropMenuLiDirectory(false);
    } else {
    }
  }, [styleSideMenu]);

  // =====================Обробник кліку за межами бокового меню=============================

  const handleClickOutside = (event) => {
    if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
      setStyleSideMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {visibleSideMenu ? (
        <div
          className={`leftSideMenu ${styleSideMenu ? "showSide" : ""}`}
          ref={sideMenuRef}
        >
          <span className="sideMenuName" onClick={toggleSideMenuStyle}>
            {windowWidth < 768 ? (
              <img
                className={`iconBurger ${styleSideMenu ? "activeBurger" : ""}`}
                src={burger}
                width="40"
                height="40"
                alt="Бургер"
              ></img>
            ) : styleSideMenu ? (
              <img
                src={leftrow}
                width="30"
                height="30"
                className="closerow"
                alt="Стрілка"
              ></img>
            ) : (
              <img
                src={rightrow}
                width="30"
                height="30"
                className="openrow"
                alt="Стрілка"
              ></img>
            )}
          </span>
          {windowWidth < 768 ? (
            <img
              src={doc}
              height="30"
              width="180"
              className={`d-inline-block headerLogo  ms-auto ${
                styleSideMenu ? "sideLogo" : "hiddenlogo"
              }`}
              alt="Logo"
            />
          ) : null}
          <ul className="sideMenuUl">
            <div
              className="d-flex sideMenuDivRow"
              onClick={toggleDropLiContacts}
            >
              <img
                className="me-3 iconSideMenu"
                src={example}
                width="30"
                height="30"
              ></img>
              Контакти<span className="sideMenuRowDown">&#9660;</span>
            </div>
            <li className={dropMenuLiContacts ? "openDropLi" : "inSideMenuLi"}>
              <a>Контактні особи</a>
            </li>
          </ul>
          <ul className="sideMenuUl">
            <div
              className="d-flex sideMenuDivRow"
              onClick={toggleDropLiComunication}
            >
              <img
                className="me-3 iconSideMenu"
                src={example}
                width="30"
                height="30"
              ></img>
              Комунікації<span className="sideMenuRowDown">&#9660;</span>
            </div>
            <li
              className={dropMenuLiComunication ? "openDropLi" : "inSideMenuLi"}
            >
              <a>Приклад</a>
            </li>
          </ul>
          {Admin ? (
            <ul className="sideMenuUl">
              <div
                className="d-flex sideMenuDivRow"
                onClick={toggleDropLiDirectory}
              >
                <img
                  className="me-3 iconSideMenu"
                  src={example}
                  width="30"
                  height="30"
                ></img>
                Довідники<span className="sideMenuRowDown">&#9660;</span>
              </div>
              <li
                className={dropMenuLiDirectory ? "openDropLi" : "inSideMenuLi"}
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
                className={dropMenuLiDirectory ? "openDropLi" : "inSideMenuLi"}
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
                className={dropMenuLiDirectory ? "openDropLi" : "inSideMenuLi"}
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
                className={dropMenuLiDirectory ? "openDropLi" : "inSideMenuLi"}
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
    </>
  );
}
