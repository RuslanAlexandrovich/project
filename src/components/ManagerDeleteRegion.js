import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import loading from "../images/loading.gif";
import axios from "axios";
import SERVER_URL from "../helpers/Config";
import authHeader from "../helpers/auth-header";

function ManagerDeleteRegion(props) {
  const region = props.regionValue;
  const regionId = region.id;
  console.log("Видалення регіону пропси", regionId);

  const [isLoading, setIsLoading] = useState(false);
  const submitDeleteButtonRef = props.submitDeleteButtonRef;

  const [serverAnswer, setserverAnswer] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const deleteRegion = async (dataId) => {
    try {
      console.log("Delete Regions Row.......", dataId);
      const response = await axios.delete(
        SERVER_URL + `Region/Region?regionId=${dataId}`,
        {
          headers: authHeader(),
        }
      );
      console.log("RESPONSE DATA:", response);
      if (response.status === 200) {
        console.log("Created new Region.....OK......!");
        const confirmServer = response.data.messages;
        props.closeModal();
        return { success: true, message: confirmServer };
        // return usersData;
      }
    } catch (error) {
      console.error("Not answer:", error.response.data.errors.RegionCode[0]);
      const errorServer = error.response.data.errors.RegionCode[0];
      return { success: false, error: errorServer };
    }
  };

  const onSubmit = async (data) => {
    const result = await deleteRegion(data.id);
    console.log(result);
    if (result.success) {
      if (result.success !== true) {
        setserverAnswer(result.error);
        return;
      }
      // console.log("Отримані дані від сервера:", result.data.message);
      setserverAnswer(result.message);
      console.log("Дані надіслано ID...   ", regionId);
      // setTimeout(() => window.location.reload(), 1500);
    } else {
      // Обробка помилки
      // console.error("Помилка:", result.error);
      setserverAnswer(result.error);
    }
  };

  return (
    <div className="App">
      <Container>
        <Row className="">
          <Col className="wrapperEditForm px-0 mb-1">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="form_EditForAdmin"
            >
              <Form.Group className="mb-2" controlId="formBasicDeleteRegion">
                <Form.Control
                  type="text"
                  placeholder="Код регіону"
                  value={region.id}
                  readOnly
                  hidden
                  {...register("id", {
                    required: false,
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicAddUser">
                <Form.Control
                  type="text"
                  placeholder="Код регіону"
                  value={region.regionCode}
                  readOnly
                  {...register("regionCode", {
                    required: false,
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Control
                  type="text"
                  placeholder="Назва регіону"
                  value={region.regionName}
                  readOnly
                  {...register("regionName", {
                    required: false,
                  })}
                />
              </Form.Group>
              <span className="confirmEdit">{serverAnswer}</span>
              <Button
                type="submit"
                id="submitNewDataBtn"
                ref={submitDeleteButtonRef}
              ></Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ManagerDeleteRegion;
