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

function ContactGroupEdit(props) {
  const [isLoading, setIsLoading] = useState(false);
  const submitEditButtonRef = props.submitEditButtonRef;
  const ContactGroupValue = props.ContactGroupValue;

  const [serverAnswer, setserverAnswer] = useState();
  const [Events, setEvents] = useState([]);
  //   const [Managers, setManagers] = useState([]);

  useEffect(() => {}, []);

  const editGroup = async (data) => {
    try {
      console.log("Add event Row.......", data);
      const response = await axios.put(
        SERVER_URL + `Contact/ContactGroup?contactGroupId=${data.id}`,
        data,
        {
          headers: authHeader(),
        }
      );
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        console.log("Edit ContactGroup.....OK......!", response);
        const confirmServer = response.data.messages;
        setTimeout(() => {
          props.closeModal();
        }, 1000);
        return { success: true, message: confirmServer };
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
      const errorServer = error.message;
      return { success: false, error: errorServer };
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await editGroup(data);
    console.log("onSubmit data...", result);
    if (result.success) {
      if (result.success !== true) {
        setserverAnswer(result.error);
        return;
      }
      // console.log("Отримані дані від сервера:", result.data.message);
      setserverAnswer(result.message);
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
              <Form.Group className="mb-2" controlId="formBasicId">
                {/* <Form.Label className="App-label">Код</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Id"
                  value={ContactGroupValue.id}
                  hidden
                  {...register("id", {
                    required: false,
                    // validate: (value) => surNameCheck(value),
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicCode">
                {/* <Form.Label className="App-label">Код</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Код"
                  defaultValue={ContactGroupValue.groupCode}
                  {...register("groupCode", {
                    required: false,
                    // validate: (value) => surNameCheck(value),
                  })}
                />
                {errors.groupCode && (
                  <Form.Text className="text-danger">
                    Прізвище має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicName">
                {/* <Form.Label className="App-label">Код</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Назва"
                  defaultValue={ContactGroupValue.groupName}
                  {...register("groupName", {
                    required: true,
                    // validate: (value) => surNameCheck(value),
                  })}
                />
                {errors.groupName && (
                  <Form.Text className="text-danger">
                    Прізвище має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicNote">
                {/* <Form.Label className="App-label">Код</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Примітки"
                  defaultValue={ContactGroupValue.groupNote}
                  {...register("groupNote", {
                    required: false,
                    // validate: (value) => surNameCheck(value),
                  })}
                />
                {errors.groupNote && (
                  <Form.Text className="text-danger">
                    Прізвище має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <span className="confirmEdit">{serverAnswer}</span>
              <Button
                type="submit"
                id="submitNewDataBtn"
                ref={submitEditButtonRef}
              ></Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactGroupEdit;
