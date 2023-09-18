import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import authHeader from "../helpers/auth-header";
import EditUser from "../editUser/EditUser";
import AdminEditForm from "../components/AdminEditForm";
import AdminAddForm from "../components/AdminAddForm";
import SERVER_URL from "../helpers/Config";
import { Modal } from "react-bootstrap";
import { CloseCircleOutlined } from "@ant-design/icons"; // Імпорт іконки "X"
import { Navigate } from "react-router";

function AboutAllUser() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null); //для передачі пропсів AdminEditForm
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Стан для відображення модального вікна редагування
  const [showAddUserModal, setshowAddUserModal] = useState(false); // Стан для відображення модального вікна редагування
  const [selectedUserIdForEdit, setSelectedUserIdForEdit] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null); //для передачі пропсів AdminEditForm
  const [originalUsers, setOriginalUsers] = useState([]);
  const [notFoundMessage, setnotFoundMessage] = useState(false);
  const submitButtonRef = useRef(null); // Створюємо реф для кнопки "Надіслати" в іншому компоненті
  const submitAddButtonRef = useRef(null); // Створюємо реф для кнопки "Додати" в іншому компоненті
  const [searchUser, setSearchUser] = useState("");

  const allUser = async (Page) => {
    console.log("INDEX PAGE:", Page);
    try {
      const pageQueryParam = typeof Page === "number" ? Page : 1;
      const response = await axios.get(
        SERVER_URL + `User/all?Page=${pageQueryParam}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const usersData = responseData.users;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setUsers(usersData); // Зберігаємо всіх користувачів в стані
        setOriginalUsers(usersData);
        // Обробка успішної відповіді
        console.log("Successful userAll:", responseData);
        console.log("Successful pages:", pageNumber);
        return usersData;
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
  }, []); // Пустий масив залежностей

  // ===============Видалення користувачів=======================
  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const openAddUserModal = () => {
    setshowAddUserModal(true);
  };

  const deleteUser = async () => {
    try {
      await EditUser.AdminDeleteUser(selectedUser);
      // console.log("ADMINPAGECOMP", data);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUser)
      );
    } catch (error) {
      console.error("Помилка Запиту на видалення:", error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser);
      setSelectedUser(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // ======================Вікно редагування користувача========================

  const openEditModalForSelectedUser = () => {
    if (selectedUser !== null) {
      setSelectedUserIdForEdit(selectedUser);
      setShowEditModal(true);
    }
  };

  const handleSubmitButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitButtonRef.current) {
      submitButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
  };
  const handleSubmitAddUserButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitAddButtonRef.current) {
      submitAddButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // ======================Форма пошуку Search користувача========================

  const onSubmit = async () => {
    // console.log("DATA SEARCH...." + data);
    try {
      if (searchUser.trim() === "") {
        // Якщо поле пошуку порожнє, встановлюємо список користувачів в початковий стан
        setUsers(originalUsers);
        setPageNumber(1);
      } else {
        {
          /* ====================Повертаємо дані запиту з компоненту EditUser========================= */
        }

        const { usersData, totalPages, pageNumber } =
          await EditUser.AdminSearchallUser(searchUser);
        if (usersData && usersData.length > 0) {
          setUsers(usersData); // Зберігаємо всіх користувачів в стані
          setnotFoundMessage(false); // Результати пошуку є
        } else {
          setUsers(originalUsers);
          setnotFoundMessage(true); // Пошук нічого не знайшов, вивести повідомлення
        }
        setPageNumber(pageNumber);
        setTotalPages(totalPages);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
                {searchUser && ( // Показуємо символ "X" лише якщо є введений текст
                  <CloseCircleOutlined
                    className="clear-search"
                    onClick={() => {
                      setSearchUser(""); // Скидуємо значення поля пошуку
                    }}
                  />
                )}
              </Form.Group>
              <Button
                className="returnAllUsers btn-secondary"
                onClick={() => {
                  allUser({});
                  setnotFoundMessage(false);
                  setPageNumber(1);
                  setTotalPages(1);
                }}
              >
                Скинути
              </Button>
              <Button type="submit" id="submitSearch" className="searchUserBtn">
                Пошук
              </Button>
            </Form>
            {/* </div> */}
          </Col>
        </Row>

        {/* =======================Попередження про видалення========================== */}

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Підтвердіть видалення</Modal.Title>
          </Modal.Header>
          <Modal.Body>Ви впевнені, що хочете видалити користувача?</Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Скасувати
            </button>
            <button className="btn btn-danger" onClick={handleDeleteUser}>
              Видалити
            </button>
          </Modal.Footer>
        </Modal>

        {/* ==============Картка відображення користувача(ВСІХ)============== */}

        <div className="allUsersBlock mt-4 mb-2">
          <div className="adminBtnWrapper">
            <button
              className="btn btn-success AddBtn"
              onClick={openAddUserModal}
            >
              Додати
            </button>
            <button
              className={`btn btn-warning EditBtn ${
                !selectedUser ? "disabled" : ""
              }`}
              onClick={openEditModalForSelectedUser}
            >
              Редагувати
            </button>

            <button
              className={`btn btn-danger DeleteBtn ${
                !selectedUser ? "disabled" : ""
              }`}
              onClick={selectedUser ? openDeleteModal : null}
              disabled={!selectedUser}
            >
              Видалити
            </button>
          </div>
          <table className="tableUsers">
            <thead className="headTable">
              <tr className="headRow">
                <th>№</th>
                <th>Логін</th>
                <th>Ім'я</th>
                <th>Прізвище</th>
                <th>Пошта</th>
                <th>Телефон</th>
                <th>Id</th>
                <th>Роль</th>
              </tr>
              <tr>
                <th colSpan="8" style={{ padding: "5px" }}></th>
              </tr>
            </thead>
            <tbody className="tBody">
              <tr>
                <td colSpan="8" style={{ padding: "3px" }}></td>
              </tr>
              {notFoundMessage ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{ padding: "3px" }}
                    className="notFoundUserMessage"
                  >
                    По запиту нічого не знайдено...
                  </td>
                </tr>
              ) : null}

              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={selectedUser === user.id ? "selected" : ""}
                  onClick={() => {
                    setSelectedUser(user.id);
                    setSelectedUserData(user);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.id}</td>
                  <td>{user.roles[0].name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ====================Блок пагінатора========================= */}

        <div className="paging">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                allUser(index + 1);
              }}
              className={
                pageNumber === index + 1 ? "activePagin" : "notActivePagin"
              }
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* =======================Вікно редагування користувача========================== */}

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Редагування користувача</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUserIdForEdit !== null && (
              <AdminEditForm
                userId={selectedUserIdForEdit}
                user={selectedUserData}
                submitButtonRef={submitButtonRef}
              />
            )}

            {/* <Modal.Footer> */}
            <button
              onClick={handleSubmitButtonClick}
              className="btn btn-primary modalSendForm"
            >
              Надіслати
            </button>
            <button
              className="btn btn-secondary modalCancel"
              onClick={() => {
                setShowEditModal(false);
                setSelectedUserIdForEdit(null); // Скидання обраного користувача при закритті модального вікна
              }}
            >
              Відмінити
            </button>
          </Modal.Body>
          {/* </Modal.Footer> */}
        </Modal>

        {/* =======================Вікно Додавання Адміном користувача========================== */}

        <Modal
          show={showAddUserModal}
          onHide={() => setshowAddUserModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Додавання користувача</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AdminAddForm
              // user={selectedUserData}
              submitAddButtonRef={submitAddButtonRef}
            />
            {/* <Modal.Footer> */}
            <button
              onClick={handleSubmitAddUserButtonClick}
              className="btn btn-primary modalSendForm"
            >
              Надіслати
            </button>
            <button
              className="btn btn-secondary modalCancel"
              onClick={() => {
                setshowAddUserModal(false);
              }}
            >
              Відмінити
            </button>
          </Modal.Body>
          {/* </Modal.Footer> */}
        </Modal>
      </Container>
    </div>
  );
}

export default AboutAllUser;
