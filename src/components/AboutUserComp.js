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
    setIsEditingName(false);
    setShowFormName(false);
    setIsEditingSurName(false);
    setShowFormSurName(false);
    setIsEditingEmail(false);
    setShowFormEmail(false);
    setIsEditingPhone(false);
    setShowFormPhone(false);
    setIsEditingPassword(false);
    setShowFormPassword(false);
  };
  const toggleFormName = () => {
    setShowFormName(!showFormName);
    setIsEditingUserName(false);
    setShowFormUserName(false);
    setIsEditingSurName(false);
    setShowFormSurName(false);
    setIsEditingEmail(false);
    setShowFormEmail(false);
    setIsEditingPhone(false);
    setShowFormPhone(false);
    setIsEditingPassword(false);
    setShowFormPassword(false);
  };
  const toggleFormSurName = () => {
    setShowFormSurName(!showFormSurName);
    setIsEditingUserName(false);
    setShowFormUserName(false);
    setIsEditingName(false);
    setShowFormName(false);
    setIsEditingEmail(false);
    setShowFormEmail(false);
    setIsEditingPhone(false);
    setShowFormPhone(false);
    setIsEditingPassword(false);
    setShowFormPassword(false);
  };
  const toggleFormEmail = () => {
    setShowFormEmail(!showFormEmail);
    setIsEditingUserName(false);
    setShowFormUserName(false);
    setIsEditingName(false);
    setShowFormName(false);
    setIsEditingSurName(false);
    setShowFormSurName(false);
    setIsEditingPhone(false);
    setShowFormPhone(false);
    setIsEditingPassword(false);
    setShowFormPassword(false);
  };
  const toggleFormPhone = () => {
    setShowFormPhone(!showFormPhone);
    setIsEditingUserName(false);
    setShowFormUserName(false);
    setIsEditingName(false);
    setShowFormName(false);
    setIsEditingSurName(false);
    setShowFormSurName(false);
    setIsEditingEmail(false);
    setShowFormEmail(false);
    setIsEditingPassword(false);
    setShowFormPassword(false);
  };
  const toggleFormPassword = () => {
    setShowFormPassword(!showFormPassword);
    setIsEditingUserName(false);
    setShowFormUserName(false);
    setIsEditingName(false);
    setShowFormName(false);
    setIsEditingSurName(false);
    setShowFormSurName(false);
    setIsEditingEmail(false);
    setShowFormEmail(false);
    setIsEditingPhone(false);
    setShowFormPhone(false);
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
      <Container className="AbUsInfoCont mt-3 mb-3">
        <h2 className="mt-3">Особистий кабінет</h2>
        <hr></hr>
        <Row className="row-cols-xl-2 row-cols-md-2 row-cols-sm-1 mt-2">
          <Col className="userInfo col-12 col-xl-6 col-md-6 col-sm-12">
            <div className="wrapperAboutUserInfo">
              <span className="nameRow">
                Логін: <span className="nameObject">{userName}</span>
                <span
                  className="iconWrapper"
                  onClick={() => {
                    toggleEditingUserName();
                    toggleFormUserName();
                  }}
                >
                  {isEditingUserName ? (
                    <span className="icon">&#10006;</span>
                  ) : (
                    <span className="icon">&#9998;</span>
                  )}
                </span>
              </span>
              <span className="nameRow">
                Ім'я: <span className="nameObject">{name}</span>
                <span
                  className="iconWrapper"
                  onClick={() => {
                    toggleEditingName();
                    toggleFormName();
                  }}
                >
                  {isEditingName ? (
                    <span className="icon">&#10006;</span>
                  ) : (
                    <span className="icon">&#9998;</span>
                  )}
                </span>
              </span>
              <span className="nameRow">
                Прізвище: <span className="nameObject">{surname}</span>
                <span
                  className="iconWrapper"
                  onClick={() => {
                    toggleEditingSurName();
                    toggleFormSurName();
                  }}
                >
                  {isEditingSurName ? (
                    <span className="icon">&#10006;</span>
                  ) : (
                    <span className="icon">&#9998;</span>
                  )}
                </span>
              </span>
              <span className="nameRow">
                Пошта: <span className="nameObject">{email}</span>
                <span
                  className="iconWrapper"
                  onClick={() => {
                    toggleEditingEmail();
                    toggleFormEmail();
                  }}
                >
                  {isEditingEmail ? (
                    <span className="icon">&#10006;</span>
                  ) : (
                    <span className="icon">&#9998;</span>
                  )}
                </span>
              </span>
              <span className="nameRow">
                Телефон: <span className="nameObject">{phoneNumber}</span>
                <span
                  className="iconWrapper"
                  onClick={() => {
                    toggleEditingPhone();
                    toggleFormPhone();
                  }}
                >
                  {isEditingPhone ? (
                    <span className="icon">&#10006;</span>
                  ) : (
                    <span className="icon">&#9998;</span>
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
          <Col className="wrappAbEdUsForm col-12 col-xl-6 col-md-6 col-sm-12">
            {showFormUserName && (
              <Form
                className="AboutUserForm editForm"
                onSubmit={handleSubmit(onSubmitUserName)}
              >
                <h2 className="title_form">Редагування</h2>
                <Form.Group className=" mb-2" controlId="formBasicLogin">
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
                      Логін повинен починатися з великої літери, від 3 до 15
                      символів, лише літери та цифри. рештою малих літер.
                    </Form.Text>
                  )}
                </Form.Group>
                <Button type="submit">Зберегти</Button>
              </Form>
            )}
            {showFormName && (
              <Form className="editForm" onSubmit={handleSubmit(onSubmitName)}>
                <h2 className="title_form">Редагування</h2>
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
                className="editForm"
                onSubmit={handleSubmit(onSubmitSurName)}
              >
                <h2 className="title_form">Редагування</h2>
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
                className="editForm editEmail"
                onSubmit={handleSubmit(onSubmitPhone)}
              >
                <h2 className="title_form">Редагування</h2>
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
                className="editForm editPhone"
              >
                <h2 className="title_form">Редагування</h2>
                <Form.Group className="mb-2">
                  <Form.Label className="App-label">Номер телефону</Form.Label>
                  <Form.Control
                    type="text"
                    id="phone"
                    placeholder="380 (необов'язково)"
                    {...register("phone", {
                      required: true,
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
              <Form
                onSubmit={handleSubmit(onSubmitPassword)}
                className="editForm editPhone"
              >
                <h2 className="title_form">Редагування</h2>
                <Form.Group className="mb-2">
                  <Form.Label className="App-label">Пароль *</Form.Label>
                  <Form.Control
                    type="text"
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
