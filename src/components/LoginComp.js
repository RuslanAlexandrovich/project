import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import AuthService from "../services/AuthService";
// import { useNavigate } from "react-router-dom";
import { emailCheck } from "../pattern/allPattern";
import { passwordCheck } from "../pattern/allPattern";
import loading from "../images/loading.gif";

function LoginComp() {
  const [ServerMessage, setServerMessage] = useState(""); // Визначення стану ServerMessage
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  // const [token, setToken] = useState("");

  // const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const resp = await AuthService.login(data, (errorMessage) => {
        console.error("Повернуті дані ...", errorMessage);
        setServerMessage(errorMessage); // Оновлення стану ServerMessage з текстом помилки
        if (resp === 200) {
          setIsLoading(false);
        }
      });
    } catch (error) {
      // Обробка помилок, якщо дані не були успішно надіслані
      console.error("Помилка входу...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="App">
        <Container className="h-100">
          <Row className="h-100">
            <Col className="wrapper">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="form_reg form_login"
              >
                <h1 className="title_form mb-4">Вхід</h1>
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
                  <Form.Label className="App-label">Пароль *</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="******"
                    {...register("password", {
                      required: true,
                      validate: (value) => passwordCheck(value),
                    })}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      Пароль має містити: Не менше 8 символів латинського
                      алфавіту, 1 велику та малу літери, 1 цифру, 1 спеціальний
                      символ.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    id="showPass"
                    label="Показати пароль"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                </Form.Group>
                <Nav className="mb-4 d-flex justify-content-between">
                  <Link to="/sendemail">Забули пароль?</Link>
                  <Link to="/registration">Реєстрація</Link>
                </Nav>
                {isLoading ? (
                  <img
                    src={loading}
                    height="30"
                    width="30"
                    alt="Завантаження..."
                    className="loading-spinner"
                  />
                ) : (
                  <Button type="submit" id="submit">
                    Увійти
                  </Button>
                )}
                <span className="errorMessage">{ServerMessage}</span>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default LoginComp;
