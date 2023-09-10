import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { loginCheck } from "../pattern/allPattern";
import { nameCheck } from "../pattern/allPattern";
import { surNameCheck } from "../pattern/allPattern";
import { emailCheck } from "../pattern/allPattern";
import { phoneCheck } from "../pattern/allPattern";
import { passwordCheck } from "../pattern/allPattern";
import loading from "../images/loading.gif";

function RegisterComp() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  // const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true); // Встановіть isLoading в true перед відправкою запиту
      await AuthService.register(data);
      console.log("Дані надіслано...   ", data);
      // navigate("/userconfirm");
    } catch (error) {
      // Обробка помилок, якщо дані не були успішно надіслані
      console.log("Помилка відправки даних...", error);
      setIsLoading(false); // Встановіть isLoading в false після завершення операції
    } finally {
      setIsLoading(false); // Встановіть isLoading в false після завершення операції
    }
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="wrapper mb-4">
            <Form onSubmit={handleSubmit(onSubmit)} className="form_reg">
              <h1 className="title_form">Реєстрація</h1>
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Label className="App-label">Ім'я *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ім'я"
                  {...register("name", {
                    required: true,
                    validate: (value) => nameCheck(value),
                  })}
                />
                {errors.name && (
                  <Form.Text className="text-danger">
                    Ім'я має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicSurname">
                <Form.Label className="App-label">Прізвище *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Прізвище"
                  {...register("surname", {
                    required: true,
                    validate: (value) => surNameCheck(value),
                  })}
                />
                {errors.surName && (
                  <Form.Text className="text-danger">
                    Прізвище має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label className="App-label">Пошта *</Form.Label>
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
              <Form.Group className="mb-2">
                <Form.Label className="App-label">Номер телефону</Form.Label>
                <Form.Control
                  type="text"
                  id="phone"
                  placeholder="+380 (необов'язково)"
                  {...register("phone", {
                    // validate: (value) => phoneCheck(value),
                  })}
                />
                {errors.phone && (
                  <Form.Text className="text-danger">
                    Будь ласка, введіть номер телефону у форматі +380 і 9 цифр
                    вашого телефону.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="App-label">Пароль *</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="******"
                  {...register("password", {
                    required: true,
                    // validate: (value) => passwordCheck(value),
                  })}
                />
                {errors.password && (
                  <Form.Text className="text-danger">
                    Пароль має містити не менше 6 символів латинського алфавіту,
                    1 велику літеру, 1 цифру.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  id="showPass"
                  label="Видимий пароль"
                  onChange={() => setShowPassword(!showPassword)}
                />
              </Form.Group>
              {isLoading ? (
                <img
                  src={loading}
                  height="60"
                  width="60"
                  alt="Завантаження..."
                  className="loading-spinner"
                />
              ) : (
                <Button type="submit" id="submit">
                  Зареєструвати
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterComp;
