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

function RegionalManagerDelete(props) {
  const [isLoading, setIsLoading] = useState(false);
  const submitDeleteButtonRef = props.submitDeleteButtonRef;
  const selectedManagerValue = props.selectedManagerValue;

  console.log("Передані пропси регіоМенеджер...", selectedManagerValue);

  const [serverAnswer, setserverAnswer] = useState();

  const deleteRegionalManager = async (data) => {
    try {
      console.log("Delete RegionsManager Row.......", data);
      const response = await axios.delete(
        SERVER_URL + `Region/RegionalManager?regionalManagerId=${data}`,
        {
          headers: authHeader(),
        }
      );
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        console.log("Delete RegionalManager.....OK......!");
        const confirmServer = response.data.messages;
        return { success: true, message: confirmServer };
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
      const errorServer = error.response.data.messages;
      return { success: false, error: errorServer };
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formId = data.id;
    const result = await deleteRegionalManager(formId);
    console.log("Result delete form", formId);
    if (result.success) {
      if (result.success !== true) {
        setserverAnswer(result.error);
        return;
      }
      // console.log("Отримані дані від сервера:", result.data.message);
      setserverAnswer(result.message);
      props.closeModal();
      console.log("Дані надіслано...   ", data);
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
              <Form.Group controlId="formBasicDeleteRegion">
                <Form.Control
                  className="mb-2"
                  value={selectedManagerValue.region.name}
                  readOnly
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicDeleteRegionalManage">
                <Form.Control
                  value={selectedManagerValue.user.name}
                  readOnly
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicDeleteManagerId">
                <Form.Control
                  value={selectedManagerValue.id}
                  readOnly
                  hidden
                  {...register("id", {
                    required: false,
                  })}
                ></Form.Control>
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

export default RegionalManagerDelete;
