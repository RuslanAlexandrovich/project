import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import authHeader from "../helpers/auth-header";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../helpers/Config";
import { emailCheck } from "../pattern/allPattern";

function SendEmailComp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordReset = async (data) => {
    try {
      let email = data.email;
      console.log(email);
      if (!email) {
        // Перевірити, чи токен доступний
        throw new Error("No token available");
      }

      try {
        const response = await axios.post(
          SERVER_URL + "Account/password_reset",
          { email },
          {
            headers: authHeader(),
          }
        );
        // Перевіряємо статус відповіді
        if (response.status === 200) {
          // Обробка успішної відповіді
          console.log("Тимчасовий пароль надіслано");
          // navigate("/login");
        } else {
          throw new Error("Помилка при обробці запиту");
        }
      } catch (error) {
        // Обробка помилки
        console.error("Not answer:", error);
      }
    } catch (error) {
      // Обробка помилки, якщо токен недоступний
      console.error("Token error:", error);
    }
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await passwordReset(data);
      // window.location.reload(); // Перезавантажити сторінку тільки в разі успіху
    } catch (error) {
      // Обробка помилок, якщо дані не були успішно надіслані
      console.error("Помилка при відправці:", error);
    }
    console.log("Email: " + data.email);
  };

  return (
    <>
      <div className="App">
        <Container>
          <Row>
            <Col className="wrapper">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="form_reg form_login"
              >
                <h3 className="title_form mb-4">
                  Отримання тимчасового паролю
                </h3>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label className="App-label">
                    Пароль буде надіслано на пошту яку ви вказали при реєстрації
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      validate: (value) => emailCheck(value),
                    })}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      Пошта має бути в схожому форматі, Email@email.ua
                    </Form.Text>
                  )}
                </Form.Group>
                <Button type="submit" id="submit">
                  Отримати пароль
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SendEmailComp;
