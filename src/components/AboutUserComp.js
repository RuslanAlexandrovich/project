import "../App.css";
import Form from "react-bootstrap/Form";
import { Button, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import authHeader from "../helpers/auth-header";
import EditUser from "../editUser/EditUser";
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../helpers/Config";
import { loginCheck } from "../pattern/allPattern";
import { nameCheck } from "../pattern/allPattern";
import { surNameCheck } from "../pattern/allPattern";
import { emailCheck } from "../pattern/allPattern";
import { phoneCheck } from "../pattern/allPattern";
import { passwordCheck } from "../pattern/allPattern";

function AboutUserComp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Створюємо стан для зберігання імені

  const [userName, setUser] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");

  //Запит ===================================================
  const UserInfo = async (data) => {
    try {
      const response = await axios.get(SERVER_URL + "User", {
        params: data,
        headers: authHeader(),
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSdXNsYW4iLCJlbWFpbCI6IncwcmtwMHN0Zmlyc3RAZ21haWwuY29tIiwianRpIjoiOTQ0MDYxNzktZDFjYy00MzU2LWE0NzMtY2RiZTE1N2FjMWQ0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsIm5iZiI6MTY5MzgyOTk4MywiZXhwIjoxNjkzODQ3OTgzLCJpc3MiOiJTZXJ2aWNlQXV0aFNlcnZlciIsImF1ZCI6IlNlcnZpY2VBdXRoQ2xpZW50In0.3UOUh6QBHSI9kGkjbENEgk7IVYpI22aozBN-jiTU09s",
      });
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        // Обробка успішної відповіді
        console.log("Successful:", responseData);

        // Створюємо інформацію про користувача

        const userName = responseData.userName;
        const name = responseData.name;
        const surname = responseData.surname;
        const email = responseData.email;
        const phoneNumber = responseData.phoneNumber;

        setUser(userName);
        setName(name);
        setSurName(surname);
        setEmail(email);
        setPhone(phoneNumber);
        // console.log(userName);
        // console.log(name);
        // console.log(surname);
        // console.log(email);
        // console.log(phoneNumber);
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  // const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Виконати запит при завантаженні сторінки
    UserInfo({}); // Можливо, вам потрібно передати необов'язкові дані
  }, []); // Пустий масив залежностей означає, що цей ефект виконається тільки при монтажі компонента

  // Додаємо стан для відображення/приховування форми =========================

  const [showFormUserName, setShowFormUserName] = useState(false);
  const [showFormName, setShowFormName] = useState(false);
  const [showFormSurName, setShowFormSurName] = useState(false);
  const [showFormEmail, setShowFormEmail] = useState(false);
  const [showFormPhone, setShowFormPhone] = useState(false);
  const [showFormPassword, setShowFormPassword] = useState(false);

  // Перемикач для відображення/приховування форми=============================

  const toggleFormUserName = () => {
    setShowFormUserName(!showFormUserName);
  };
  const toggleFormName = () => {
    setShowFormName(!showFormName);
  };
  const toggleFormSurName = () => {
    setShowFormSurName(!showFormSurName);
  };
  const toggleFormEmail = () => {
    setShowFormEmail(!showFormEmail);
  };
  const toggleFormPhone = () => {
    setShowFormPhone(!showFormPhone);
  };
  const toggleFormPassword = () => {
    setShowFormPassword(!showFormPassword);
  };

  // Створення змінної стану для відстеження поточного стану значка
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingSurName, setIsEditingSurName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Функція для перемикання стану значка при натисканні
  const toggleEditingUserName = () => {
    setIsEditingUserName(!isEditingUserName);
  };
  const toggleEditingName = () => {
    setIsEditingName(!isEditingName);
  };
  const toggleEditingSurName = () => {
    setIsEditingSurName(!isEditingSurName);
  };
  const toggleEditingEmail = () => {
    setIsEditingEmail(!isEditingEmail);
  };
  const toggleEditingPhone = () => {
    setIsEditingPhone(!isEditingPhone);
  };
  const toggleEditingPassword = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  const onSubmitUserName = async (data) => {
    try {
      await EditUser.EditUserName(data);
      console.log(data);
      setUser(data.login);
      setIsEditingUserName(!isEditingUserName);
      setShowFormUserName(!showFormUserName);
    } catch (error) {
      // Обробка помилок, якщо дані не були успішно надіслані
      console.error("Помилка при збереженні:", error);
    }
    console.log("New Login:", data.login);
  };
  const onSubmitName = async (data) => {
    try {
      await EditUser.EditName(data);
      setName(data.name);
      setShowFormName(!showFormName);
      setIsEditingName(!isEditingName);
    } catch (error) {
      // Обробка помилок, якщо дані не були успішно надіслані
      console.error("Помилка при збереженні:", error);
    }
    // console.log("Name" + data.name);
  };
  const onSubmitSurName = async (data) => {
    try {
      await EditUser.EditSurName(data);
      setSurName(data.surname);
      setIsEditingSurName(!isEditingSurName);
      setShowFormSurName(!showFormSurName);
    } catch (error) {
      // Обробка помилок, якщо дані не були успішно надіслані
      console.error("Помилка при збереженні:", error);
    }
    console.log("phone" + data.surname);
  };
  const onSubmitPhone = async (data) => {
    try {
      EditUser.EditPhone(data);
      setPhone(data.phone);
      setIsEditingPhone(!isEditingPhone);
      setShowFormPhone(!showFormPhone);
    } catch (error) {
      console.error("Помилка при збереженні:", error);
    }
    console.log("phone" + data.phone);
  };
  const onSubmitPassword = async (data) => {
    try {
      EditUser.EditPassRes(data);
      window.location.reload();
    } catch (error) {
      console.error("Помилка при збереженні:", error);
    }
    console.log("password=>" + data.password);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="userInfo col-6">
            <div className="wrapperAboutUserInfo">
              <span>
                Логін: {userName}{" "}
                <span
                  className="login"
                  onClick={() => {
                    toggleEditingUserName();
                    toggleFormUserName();
                  }}
                >
                  {isEditingUserName ? (
                    <span>&#10006;</span>
                  ) : (
                    <span>&#9998;</span>
                  )}
                </span>
              </span>
              <span className="name">
                Ім'я: {name}{" "}
                <span
                  className="newName"
                  onClick={() => {
                    toggleEditingName();
                    toggleFormName();
                  }}
                >
                  {isEditingName ? <span>&#10006;</span> : <span>&#9998;</span>}
                </span>
              </span>
              <span className="surname">
                Прізвище: {surname}{" "}
                <span
                  className="newSurname"
                  onClick={() => {
                    toggleEditingSurName();
                    toggleFormSurName();
                  }}
                >
                  {isEditingSurName ? (
                    <span>&#10006;</span>
                  ) : (
                    <span>&#9998;</span>
                  )}
                </span>
              </span>
              <span className="mail">
                Пошта: {email}{" "}
                <span
                  className="newEmail"
                  onClick={() => {
                    toggleEditingEmail();
                    toggleFormEmail();
                  }}
                >
                  {isEditingEmail ? (
                    <span>&#10006;</span>
                  ) : (
                    <span>&#9998;</span>
                  )}
                </span>
              </span>
              <span className="phone">
                Телефон: {phoneNumber}{" "}
                <span
                  className="newPhone"
                  onClick={() => {
                    toggleEditingPhone();
                    toggleFormPhone();
                  }}
                >
                  {isEditingPhone ? (
                    <span>&#10006;</span>
                  ) : (
                    <span>&#9998;</span>
                  )}
                </span>
              </span>
              <span>
                <button
                  className="newPassBtn"
                  onClick={() => {
                    toggleEditingPassword();
                    toggleFormPassword();
                  }}
                >
                  {isEditingPassword ? "Відмінити" : "Змінити пароль"}
                </button>
              </span>
            </div>
          </Col>
          <Col className="col-6">
            {showFormUserName && (
              <Form
                className="editName"
                onSubmit={handleSubmit(onSubmitUserName)}
              >
                <h1 className="title_form">Редагування</h1>
                <Form.Group className="mb-2" controlId="formBasicName">
                  <Form.Label className="App-label">Логін</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Логін"
                    {...register("login", {
                      required: true,
                      validate: (value) => loginCheck(value),
                    })}
                  />
                  {errors.login && (
                    <Form.Text className="text-danger">
                      Ім'я має містити мінімум дві літери, з першою великою і
                      рештою малих літер.
                    </Form.Text>
                  )}
                </Form.Group>
                <Button type="submit">Зберегти</Button>
              </Form>
            )}
            {showFormName && (
              <Form className="editName" onSubmit={handleSubmit(onSubmitName)}>
                <h1 className="title_form">Редагування</h1>
                <Form.Group className="mb-2" controlId="formBasicName">
                  <Form.Label className="App-label">Ім'я</Form.Label>
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
                <Button type="submit">Зберегти</Button>
              </Form>
            )}
            {showFormSurName && (
              <Form
                className="editName"
                onSubmit={handleSubmit(onSubmitSurName)}
              >
                <h1 className="title_form">Редагування</h1>
                <Form.Group className="mb-2" controlId="formBasicName">
                  <Form.Label className="App-label">Прізвище</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Прізвище"
                    {...register("surname", {
                      required: true,
                      validate: (value) => surNameCheck(value),
                    })}
                  />
                  {errors.surname && (
                    <Form.Text className="text-danger">
                      Ім'я має містити мінімум дві літери, з першою великою і
                      рештою малих літер.
                    </Form.Text>
                  )}
                </Form.Group>
                <Button type="submit">Зберегти</Button>
              </Form>
            )}
            {showFormEmail && (
              <Form
                className="editName editEmail"
                onSubmit={handleSubmit(onSubmitPhone)}
              >
                <h1 className="title_form">Редагування</h1>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label className="App-label">Пошта</Form.Label>
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
                <Button type="submit">Зберегти</Button>
              </Form>
            )}
            {showFormPhone && (
              <Form
                onSubmit={handleSubmit(onSubmitPhone)}
                className="editName editPhone"
              >
                <h1 className="title_form">Редагування</h1>
                <Form.Group className="mb-2">
                  <Form.Label className="App-label">Номер телефону</Form.Label>
                  <Form.Control
                    type="text"
                    id="phone"
                    placeholder="380 (необов'язково)"
                    {...register("phone", {
                      validate: (value) => phoneCheck(value),
                    })}
                  />
                  {errors.phone && (
                    <Form.Text className="text-danger">
                      Будь ласка, введіть номер телефону у форматі +380 і 9 цифр
                      вашого телефону.
                    </Form.Text>
                  )}
                </Form.Group>
                <Button type="submit">Зберегти</Button>
              </Form>
            )}
            {showFormPassword && (
              <Form onSubmit={handleSubmit(onSubmitPassword)}>
                <h1 className="title_form">Редагування</h1>
                <Form.Group className="mb-2">
                  <Form.Label className="App-label">Пароль *</Form.Label>
                  <Form.Control
                    type="text"
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
                <Button type="submit">Зберегти</Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUserComp;
