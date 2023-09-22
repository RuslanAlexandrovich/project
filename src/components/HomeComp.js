import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import doc from "../images/doc.svg";
// import React, { useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { Nav } from "react-bootstrap";
// import AuthService from "../services/AuthService";
// // import { useNavigate } from "react-router-dom";
// import { emailCheck } from "../pattern/allPattern";
// import { passwordCheck } from "../pattern/allPattern";

function HomeComponent() {
  return (
    <>
      <div className="App">
        <img
          src={doc}
          height="100%"
          width="100%"
          className="d-inline-block"
          alt="Logo"
        />
      </div>
    </>
  );
}

export default HomeComponent;
