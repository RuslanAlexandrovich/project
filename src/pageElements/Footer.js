import React, { Component } from "react";
import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import logo from "./logo192.png";
import kyivstar from "../images/kyivstar.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (
      <>
        <Container fluid className="footerStyle">
          <Container className="Footer">
            <Row className="rowFooter w-100 row-cols-1 row-cols-xl-4 row-cols-lg-4 row-cols-md-2 row-cols-sm-2">
              <Col className="colStyle col-12 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="callMe">
                  <h6 className="mb-3">Зателефонуйте нам:</h6>
                  <div className="kyivstar">
                    <img
                      src={kyivstar}
                      height="25"
                      width="25"
                      className="d-inline-block me-1"
                      alt="Logo"
                    />
                    <span className="footNumber">+38 067 569 4987</span>
                  </div>
                  <div className="kyivstar">
                    <img
                      src={kyivstar}
                      height="25"
                      width="25"
                      className="d-inline-block me-1"
                      alt="Logo"
                    />
                    <span className="footNumber">+38 067 569 8771</span>
                  </div>
                  <span className="workTime">(Пн-Пт 10:00-17:00)</span>
                  <span className="workMail">
                    Напишіть:&nbsp;
                    <strong>
                      <em>doc@kai.ua</em>
                    </strong>
                  </span>
                </div>
              </Col>
              <Col className="colStyle col-12 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="questionBlock">
                  <a className="questionLink">Довідка</a>
                  <a className="questionLink">Часті питання</a>
                </div>
              </Col>
              <Col className="colStyle col-12 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="warningPost">
                  <a className="questionLink">Правила користування</a>
                  <a className="questionLink">Оферта KAI</a>
                </div>
              </Col>
              <Col className="colStyle col-12 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="Programs">
                  <h6 className="mb-2">Програми:</h6>
                  <a className="questionLink">Example</a>
                  <a className="questionLink">Example</a>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    );
  }
}
