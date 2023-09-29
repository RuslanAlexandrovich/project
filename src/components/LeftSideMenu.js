import React from "react";
import example from "../images/example.png";

export default function LeftSideMenu() {
  return (
    <>
      <div className="leftSideMenu">
        <span className="sideMenuName">
          Side Menu <span className="sideMenuRowDown">&#9650;</span>
        </span>
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
    </>
  );
}
