import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import authHeader from "../helpers/auth-header";
import EditUser from "../editUser/EditUser";
import SERVER_URL from "../helpers/Config";
function AboutAllUser() {
  const [users, setUsers] = useState([]);

  const allUser = async (data) => {
    try {
      const response = await axios.get(SERVER_URL + "User/all", {
        // params: data,
        headers: authHeader(),
      });
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді

        setUsers(responseData); // Зберігаємо всіх користувачів в стані
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
  }, []); // Пустий масив залежностей означає, що це

  const deleteUser = async (data) => {
    try {
      await EditUser.DeleteUser(data);
      // console.log(data);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== data));
      // window.location.reload(); // Перезавантажити сторінку тільки в разі успіху
    } catch (error) {
      // Обробка помилок, якщо дані не були успішно надіслані
      console.error("Помилка Запиту на видалення:", error);
    }
  };

  return (
    <div className="App">
      <Container>
        {users.map((user) => (
          <Row key={user.id}>
            <Col className="userInfo d-flex flex-column mb-4 col-12">
              <span>Логін: {user.userName}</span>
              <span>Ім'я: {user.name}</span>
              <span>Прізвище: {user.surname}</span>
              <span>Пошта: {user.email}</span>
              <span>Телефон: {user.phoneNumber}</span>
              <span>Id: {user.id}</span>
              <span>Роль: {user.roles[0]}</span>
              <button onClick={() => deleteUser(user.id)}>Видалити</button>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default AboutAllUser;
