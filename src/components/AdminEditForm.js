import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import EditUser from "../editUser/EditUser";
import { useNavigate } from "react-router-dom";
import { loginCheck } from "../pattern/allPattern";
import { nameCheck } from "../pattern/allPattern";
import { surNameCheck } from "../pattern/allPattern";
import { emailCheck } from "../pattern/allPattern";
import { phoneCheck } from "../pattern/allPattern";
import { passwordCheck } from "../pattern/allPattern";
import loading from "../images/loading.gif";

//Отримуємо userId з AdminPageComp через props

function AdminEditUserForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const userId = props.userId; // Отримати userId з пропс
  const userObj = props.user; // Отримати userId з пропс
  const closeModal = props.onCloseModal;
  const submitButtonRef = props.submitButtonRef; // Отримати submitButtonRef з пропс

  const [serverAnswer, setserverAnswer] = useState();

  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [isAtLeastOneChecked, setIsAtLeastOneChecked] = useState(false); // Перевірка чи обраний чекбокс

  // ==================Відстеження та перевірка ролі користувача============================

  useEffect(() => {
    if (userObj.roles.some((role) => role.name === "admin")) {
      setIsAdminChecked(true);
      setIsAtLeastOneChecked(true);
    }
    if (userObj.roles.some((role) => role.name === "user")) {
      setIsUserChecked(true);
      setIsAtLeastOneChecked(true);
    }
  }, [userObj]);

  // ==================Ролі для користувача============================

  const handleAdminChange = () => {
    setIsAdminChecked(true);
    setIsUserChecked(false); // Знімаємо позначку з чекбоксу "User"
    setIsAtLeastOneChecked(true); // Один з чекбоксів обраний, встановлюємо на true
  };

  const handleUserChange = () => {
    setIsUserChecked(true);
    setIsAdminChecked(false); // Знімаємо позначку з чекбоксу "Admin"
    setIsAtLeastOneChecked(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    if (isAtLeastOneChecked) {
      try {
        console.log("ПЕРЕДАНІ ПРОПСИ", props);
        setIsLoading(true); // Встановіть isLoading в true перед відправкою запиту

        if (isAdminChecked) {
          data.roles = [
            {
              id: "c9c69579-f04d-4e8f-ac46-c9160859b759",
              name: "admin",
            },
          ];
        } else if (isUserChecked) {
          data.roles = [
            {
              id: "3c3ba716-9cd1-45cf-b594-650692531952",
              name: "user",
            },
          ];
        } else {
          // Якщо жоден чекбокс не обрано, очищаємо roles
          data.roles = [
            {
              id: "3c3ba716-9cd1-45cf-b594-650692531952",
              name: "user",
            },
          ];
        }
        const result = await EditUser.AdminEditUser(data);

        // Перевірка успішної відповіді
        if (result.success) {

          if (result.success !== true){
            setserverAnswer(result.message);
            console.log("Результат запиту:", result.success);
            return;
          }
          
          console.log("Отримані дані від сервера:", result.message);
          setserverAnswer(result.message);
          console.log("Дані надіслано...   ", data);
          console.log("UserId...   ", userId);
          setTimeout(() => closeModal(), 1500);
        } else {
          // Обробка помилки
          console.error("Помилка:", result.error);
          setserverAnswer(result.error);
        }
      } catch (error) {
        // Обробка помилок, якщо дані не були успішно надіслані
        console.log("Помилка відправки даних...", error);
        setIsLoading(false); // Встановіть isLoading в false після завершення операції
      } finally {
        setIsLoading(false); // Встановіть isLoading в false після завершення операції
      }
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
              <Form.Group className="mb-2 inputId" controlId="formBasicId" >
                {/* <Form.Label className="App-label">Id</Form.Label> */}
                <Form.Control
                  type="text"
                  value={userId}
                  readOnly
                  {...register("id", {
                    required: true,
                    // validate: (value) => nameCheck(value),
                  })}
                />
                {/* {errors.name && (
                  <Form.Text className="text-danger">
                    Ім'я має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )} */}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicLogin">
                {/* <Form.Label className="App-label">Логін</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Логін"
                  defaultValue={userObj.userName}
                  {...register("userName", {
                    required: true,
                    validate: (value) => loginCheck(value),
                  })}
                />
                {errors.userName && (
                  <Form.Text className="text-danger">
                    Логін повинен починатися з великої літери, від 3 до 15
                    символів, лише літери та цифри.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicName">
                {/* <Form.Label className="App-label">Ім'я</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Ім'я"
                  defaultValue={userObj.name}
                  {...register("name", {
                    required: false,
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
                {/* <Form.Label className="App-label">Прізвище</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Прізвище"
                  defaultValue={userObj.surname}
                  {...register("surname", {
                    required: false,
                    validate: (value) => surNameCheck(value),
                  })}
                />
                {errors.surname && (
                  <Form.Text className="text-danger">
                    Прізвище має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                {/* <Form.Label className="App-label">Пошта</Form.Label> */}
                <Form.Control
                  type="email"
                  placeholder="Email"
                  defaultValue={userObj.email}
                  {...register("email", {
                    required: false,
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
                {/* <Form.Label className="App-label">Номер телефону</Form.Label> */}
                <Form.Control
                  type="text"
                  id="phone"
                  placeholder="Телефон"
                  defaultValue={userObj.phoneNumber}
                  {...register("phoneNumber", {
                    required: false,
                    validate: (value) => phoneCheck(value),
                  })}
                />
                {errors.phone && (
                  <Form.Text className="text-danger">
                    Будь ласка, введіть номер телефону у форматі 380 і 9 цифр
                    вашого телефону.
                  </Form.Text>
                )}
              </Form.Group>
              <div className="rolesCheck">
                <Form.Group
                  className="mb-3 d-flex"
                  controlId="formBasicCheckboxRoles"
                >
                  <Form.Check
                    className="wrappCheckAdmin"
                    type="checkbox"
                    id="adminChekB"
                    label="Admin"
                    checked={isAdminChecked}
                    onChange={handleAdminChange}
                  />

                  <Form.Check
                    type="checkbox"
                    id="userCheckB"
                    label="User"
                    checked={isUserChecked}
                    onChange={handleUserChange}
                  />
                  {isAtLeastOneChecked ? null : (
                    <span className="ms-auto errorRoles">Оберіть роль</span>
                  )}
                </Form.Group>
              </div>
              <span className="confirmEdit">{serverAnswer}</span>
              {isLoading ? (
                <div className="loadingSpinner d-flex">
                  <img
                    src={loading}
                    height="40"
                    width="40"
                    alt="Завантаження..."
                    className="loading-spinner"
                  />
                </div>
              ) : (
                <Button
                  type="submit"
                  id="submitNewDataBtn"
                  ref={submitButtonRef}
                ></Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminEditUserForm;
