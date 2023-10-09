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

function ManagerEditRegion(props) {
  const region = props.regionValue;
  const regionId = region.id;

  const [isLoading, setIsLoading] = useState(false);
  const submitEditButtonRef = props.submitEditButtonRef;
  // const closeModal = props.onCloseModal;

  const [serverAnswer, setserverAnswer] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editRegion = async (data) => {
    try {
      console.log("Add Regions Row.......", data);
      const response = await axios.put(
        SERVER_URL + `Region/Region?regionId=${regionId}`,
        data,
        {
          // params: data,
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
    const result = await editRegion(data);
    console.log(result);
    if (result.success) {
      if (result.success !== true) {
        setserverAnswer(result.error);
        return;
      }
      // console.log("Отримані дані від сервера:", result.data.message);
      setserverAnswer(result.message);
      console.log("Дані надіслано...   ", data);
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
              <Form.Group className="mb-2" controlId="formBasicEditRegion">
                <Form.Control
                  type="text"
                  placeholder="Код регіону"
                  defaultValue={region.regionCode}
                  {...register("regionCode", {
                    required: false,
                    // validate: (value) => loginCheck(value),
                  })}
                />
                {errors.regionCode && (
                  <Form.Text className="text-danger">
                    Код має містити тільки цифри, не більше 6.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Control
                  type="text"
                  placeholder="Назва регіону"
                  defaultValue={region.regionName}
                  {...register("regionName", {
                    required: false,
                    // validate: (value) => nameCheck(value),
                  })}
                />
                {errors.regionName && (
                  <Form.Text className="text-danger">
                    Назва має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicSurname">
                <Form.Control
                  type="text"
                  placeholder="Примітки"
                  defaultValue={region.regionNote}
                  {...register("regionNote", {
                    required: false,
                    // validate: (value) => surNameCheck(value),
                  })}
                />
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

export default ManagerEditRegion;
