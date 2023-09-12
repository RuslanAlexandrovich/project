import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import authHeader from "../helpers/auth-header";
import EditUser from "../editUser/EditUser";
import AdminEditForm from "../components/AdminEditForm";
import SERVER_URL from "../helpers/Config";

function AboutAllUser() {
  const [users, setUsers] = useState([]);
  const [showAdminEditForm, setShowAdminEditForm] = useState([]);

  const allUser = async (data) => {
    try {
      const response = await axios.get(SERVER_URL + "User/all", {
        // params: data,
        headers: authHeader(),
      });
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const usersData = responseData.users;

        setUsers(usersData); // Зберігаємо всіх користувачів в стані
        // Обробка успішної відповіді
        console.log("Successful:", responseData);
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  useEffect(() => {
    allUser({}); // Можливо, вам потрібно передати необов'язкові дані
    setShowAdminEditForm(new Array(users.length).fill(false));
  }, []); // Пустий масив залежностей

  const deleteUser = async (data) => {
    try {
      await EditUser.AdminDeleteUser(data);
      // console.log(data);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== data));
    } catch (error) {
      console.error("Помилка Запиту на видалення:", error);
    }
  };

  // const editUser = async (data) => {
  //   try {
  //     await EditUser.AdminEditUser(data);
  //     // console.log(data);
  //     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== data));
  //     // window.location.reload(); // Перезавантажити сторінку тільки в разі успіху
  //   } catch (error) {
  //     // Обробка помилок, якщо дані не були успішно надіслані
  //     console.error("Помилка Запиту на видалення:", error);
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {};
  return (
    <div className="App">
      {/* ==============Форма пошуку користувача============== */}

      <Container>
        <Row>
          <Col className="searchWrapper">
            {/* <div className="searchBlock"> */}
            <Form onSubmit={handleSubmit(onSubmit)} className="searchForm">
              <Form.Group controlId="formBasicSearch">
                {/* <Form.Label className="App-label">Знайти</Form.Label> */}
                <Form.Control
                  className="searchInput"
                  type="text"
                  placeholder="Знайти користувача"
                  {...register("searchUser", {
                    required: true,
                  })}
                />
                {errors.name && (
                  <Form.Text className="text-danger">
                    Ім'я має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <Button type="submit" id="submitSearch" className="searchUserBtn">
                Пошук
              </Button>
            </Form>
            {/* </div> */}
          </Col>
        </Row>

        {/* ==============Картка відображення користувача(ВСІХ)============== */}

        <div className="allUsersBlock mt-4 mb-2">
          {users.map((user, index) => (
            <Row key={user.id}>
              <Col className="userInfoAdmin mb-4 col-6">
                <span className="nameRowCard">
                  Логін: <span className="valueRowCard">{user.userName}</span>
                </span>
                <span className="nameRowCard">
                  Ім'я: <span className="valueRowCard">{user.name}</span>
                </span>
                <span className="nameRowCard">
                  Прізвище:<span className="valueRowCard"> {user.surname}</span>
                </span>
                <span className="nameRowCard">
                  Пошта:<span className="valueRowCard"> {user.email}</span>
                </span>
                <span className="nameRowCard">
                  Телефон:{" "}
                  <span className="valueRowCard">{user.phoneNumber}</span>
                </span>
                <span className="nameRowCard">
                  Id: <span className="valueRowCard">{user.id}</span>
                </span>
                <span className="nameRowCard">
                  Роль:{" "}
                  <span className="valueRowCard">{user.roles[0].name}</span>
                </span>
                <div className="adminBtnWrapper">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="DelUserAdmin"
                  >
                    Видалити
                  </button>
                  <button
                    className="EditUserAdmin"
                    onClick={() =>
                      // Викликаємо форму для потрібного користувача
                      setShowAdminEditForm((prevForms) => {
                        const newForms = [...prevForms];
                        newForms[index] = !newForms[index]; // Перемикаємо стан для користувача за індексом
                        return newForms;
                      })
                    }
                  >
                    {showAdminEditForm[index] ? "Відмінити" : "Редагувати"}
                  </button>
                </div>
              </Col>
              <Col className="col-6">
                {/* Передаємо userId разом з даними форми */}
                {showAdminEditForm[index] ? (
                  <AdminEditForm userId={user.id} />
                ) : (
                  <Col></Col>
                )}
              </Col>
            </Row>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AboutAllUser;
