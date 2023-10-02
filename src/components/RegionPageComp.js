import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "react-bootstrap";
import addUser from "../images/addUser.png";
import editUser from "../images/editUser.png";

function RegionPageComp() {
  return (
    <>
      <div className="App">
        <Container className="wrappAdmPage wrappRegionBlock">
          <Row>
            <Col>
              <div className="allUsersBlock RegionsBlock mt-3 mb-2">
                <div className="adminBtnWrapper">
                  <img
                    src={addUser}
                    width="40"
                    // onClick={openAddUserModal}
                    className="btnAfter768 addGreenCircle"
                  ></img>
                  <img
                    src={editUser}
                    width="40"
                    // onClick={openEditModalForSelectedUser}
                    className="btnAfter768"
                    // className={`btnAfter768 ${
                    //   !selectedUser ? "" : "activeCircleEdit"
                    // }`}
                  ></img>
                </div>
                <table className="tableUsers tableRegions">
                  <thead className="headTable headTableRegions">
                    <tr className="headRow">
                      <th>Код</th>
                      <th>Регіон</th>
                      <th>Примітки</th>
                    </tr>
                    <tr>
                      <th colSpan="8" style={{ padding: "5px" }}></th>
                    </tr>
                  </thead>
                  <tbody className="tBody tBodyRegions">
                    <tr>
                      <td colSpan="8" style={{ padding: "3px" }}></td>
                    </tr>
                    <tr>
                      <td>1234567890</td>
                      <td>Region State Town</td>
                      <td>
                        Примітки, опис регіону, зауваження та інші пропозиції
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default RegionPageComp;
