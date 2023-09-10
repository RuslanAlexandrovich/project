import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { emailCheck } from "../pattern/allPattern";
import { passwordCheck } from "../pattern/allPattern";

function LoginComp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  // const [token, setToken] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await AuthService.login(data);
      window.location.href = "/";
      // navigate("/");
      // window.location.reload(); // Перезавантажити сторінку тільки в разі успіху
    } catch (error) {
      // Обробка помилок, якщо дані не були успішно надіслані
      console.error("Помилка входу...");
    }
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
                <h1 className="title_form mb-4">Авторизація</h1>
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
                      // validate: (value) => passwordCheck(value),
                    })}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      Пароль має містити не менше 6 символів латинського
                      алфавіту, 1 велику літеру, 1 цифру.
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
                <Nav className="mb-4">
                  <Link to="/sendemail">Забули пароль?</Link>
                </Nav>
                <Button type="submit" id="submit">
                  Авторизуватися
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default LoginComp;
