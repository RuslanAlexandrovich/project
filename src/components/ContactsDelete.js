import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { phoneCheck } from "../pattern/allPattern";
import { nameCheck } from "../pattern/allPattern";
import { surNameCheck } from "../pattern/allPattern";
import { emailCheck } from "../pattern/allPattern";
import loading from "../images/loading.gif";
import axios from "axios";
import SERVER_URL from "../helpers/Config";
import authHeader from "../helpers/auth-header";

function ContactsDelete(props) {
  const [Regions, setRegions] = useState([]);
  const [Users, setUsers] = useState([]);
  const [ContactGroups, setContactGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const submitDeleteButtonRef = props.submitDeleteButtonRef;
  const contactValue = props.selectedContactValue;
  // const closeModal = props.onCloseModal;

  const [serverAnswer, setserverAnswer] = useState();

  //   const [showPassword, setShowPassword] = useState(false);

  const deleteContact = async (data) => {
    try {
      console.log("Delete Contact Row.......", data);
      const response = await axios.delete(
        SERVER_URL + `Contact/Contact?contactId=${data.id}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("RESPONSE DATA:", response);
      if (response.status === 200) {
        console.log("Delete Contact.....OK......!");
        const confirmServer = response.statusText;
        setserverAnswer(confirmServer);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Дані для видалення надіслано...   ", data);
    const result = await deleteContact(data);
    console.log(result);
    if (result.success) {
      if (result.success !== true) {
        setserverAnswer(result.error);
        return;
      }
    } else {
      // Обробка помилки
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
              <Form.Group className="mb-2" controlId="formBasicDeleteId">
                <Form.Control
                  type="text"
                  placeholder="id"
                  readOnly
                  value={contactValue.id}
                  {...register("id", {
                    required: false,
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicDeleteCode">
                <Form.Control
                  type="text"
                  placeholder="Код контакту"
                  value={contactValue.contactCode}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicDeleteName">
                <Form.Control
                  type="text"
                  placeholder="Ім'я"
                  value={contactValue.contactF}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicDeleteSurname">
                <Form.Control
                  type="text"
                  placeholder="Прізвище"
                  value={contactValue.contactI}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicDeleteSurname2">
                <Form.Control
                  type="text"
                  placeholder="По-батькові"
                  value={contactValue.contactO}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicDeleteEmail">
                <Form.Control
                  type="text"
                  placeholder="Email *"
                  value={contactValue.contactEmail}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicDeleteNumber">
                <Form.Control
                  type="text"
                  placeholder="Телефон *"
                  value={contactValue.contactPhone}
                  readOnly
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

export default ContactsDelete;
