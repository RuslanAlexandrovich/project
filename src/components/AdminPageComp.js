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
import addUser from "../images/addUser.png";
import editUser from "../images/editUser.png";
import deleteUserBtn from "../images/deleteUserBtn.png";
import deleteText from "../images/deleteText.png";
import searchGlass from "../images/searchGlass.png";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [asnwerServDel, setAnswerServDel] = useState("");
  const [indicateSearchForm, setIndicateSearchForm] = useState(false);
  // const [numberPagePagin, setNumberPagePagin] = useState(1);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const storedPage = localStorage.getItem("paginPage");
    if (storedPage) {
      const Page = parseInt(storedPage, 10);
      console.log("СТОРІНКА.....", Page);
      allUser();
    } else {
      allUser({});
    }
  }, []);

  useEffect(() => {
    // Функція для відслідковування зміни розміру вікна
    const handleResize = () => {
      // setWindowWidth(window.innerWidth);
    };
    // Додаємо слухача подій для зміни розміру вікна
    window.addEventListener("resize", handleResize);

    // Прибираємо слухача подій при розмонтуванні компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const allUser = async (Page) => {
    // console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(false);
    try {
      let pageQueryParam = typeof Page === "number" ? Page : 1;

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
        // console.log("Successful userAll:", responseData);
        // console.log("Successful pages:", pageNumber);
        return usersData;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  const afterEditUser = async (Page) => {
    console.log("Нова сторінка оновлених користувачів:", Page);
    try {
      const response = await axios.get(SERVER_URL + `User/all?Page=${Page}`, {
        headers: authHeader(),
      });
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
        console.log("Всі оновлені користувачі:", response);
        console.log("Номер:", pageNumber);
        return usersData;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };
  const handleEditUser = async () => {
    try {
      // Ваш код для редагування користувача тут
      setTimeout(async () => {
        await afterEditUser(currentPage);
        setSelectedUser(null);
      }, 1500);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const AdminSearchFormUser = async (data, pageNumber) => {
    setIndicateSearchForm(true);
    try {
      console.log("AdminSearchFormUser DATA.......", data);
      console.log("AdminSearchFormUser NUMBER.......", pageNumber);
      const response = await axios.get(
        SERVER_URL + `User/all?Page=${pageNumber}&SearchWords=${data}`,
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
        const NewpageNumber = responseData.paging.page_number;
        // Обробка успішної відповіді
        console.log("Successful new USERS.....:", responseData);

        if (usersData && usersData.length > 0) {
          setUsers(usersData); // Зберігаємо всіх користувачів в стані
          setnotFoundMessage(false); // Результати пошуку є
          // setCurrentPage(1); //====================================================Почати з цього=========================================
          setPageNumber(NewpageNumber);
          setOriginalUsers(usersData);
        setTotalPages(totalPages);
        } else {
          setUsers(originalUsers);
          setnotFoundMessage(true); // Пошук нічого не знайшов, вивести повідомлення
        }

      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  // ===============Видалення користувачів=======================
  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const openAddUserModal = () => {
    setshowAddUserModal(true);
  };

  const deleteUser = async () => {
    try {
      const response = await EditUser.AdminDeleteUser(selectedUser);
      if (response.success !== true) {
        setAnswerServDel(response.error);
        setTimeout(() => {
          setSelectedUser(null);
          setShowDeleteModal(false);
          setAnswerServDel("");
        }, 3000);
        return;
      } else {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUser)
        );
        setAnswerServDel(response.message);
        await afterEditUser(currentPage);
        setTimeout(() => {
          setSelectedUser(null);
          setShowDeleteModal(false);
          setAnswerServDel("");
        }, 1500);
      }
    } catch (error) {
      console.error("Помилка Запиту на видалення:", error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser);
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
console.log ("дані форми пошуку...", searchUser);
    if (searchUser.trim() === "") {
            // Якщо поле пошуку порожнє, встановлюємо список користувачів в початковий стан
            setUsers(originalUsers);
            // setPageNumber(1);
          } else {
            AdminSearchFormUser(searchUser, pageNumber);
          }

  //   try {
  //     if (searchUser.trim() === "") {
  //       // Якщо поле пошуку порожнє, встановлюємо список користувачів в початковий стан
  //       setUsers(originalUsers);
  //       setPageNumber(1);
  //       setIndicateSearchForm(true);
  //     } else {
  //       {
  //         /* ====================Повертаємо дані запиту з компоненту EditUser AdminSearchallUser========================= */
  //       }

  //       const { usersData, totalPages, pageNumber } =
  //         await EditUser.AdminSearchallUser(searchUser);
  //       if (usersData && usersData.length > 0) {
  //         setUsers(usersData); // Зберігаємо всіх користувачів в стані
  //         // setOriginalUsers(usersData);//====================================================Почати з цього=========================================
  //         setnotFoundMessage(false); // Результати пошуку є
  //         setCurrentPage(1); //====================================================Почати з цього=========================================
  //         setPageNumber(pageNumber);
  //       setTotalPages(totalPages);
  //       } else {
  //         setUsers(originalUsers);
  //         setnotFoundMessage(true); // Пошук нічого не знайшов, вивести повідомлення
  //       }
        
  //     }
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  };

  return (
    <div className="App">
      {/* ==============Форма пошуку користувача============== */}

      <Container className="wrappAdmPage">
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
                {/* {searchUser && ( // Показуємо символ "X" лише якщо є введений текст
                  <CloseCircleOutlined
                    className="clear-search"
                    onClick={() => {
                      setSearchUser(""); // Скидуємо значення поля пошуку
                    }}
                  />
                )} */}
              </Form.Group>
              <div className="searchBtnWrapp">
                <img
                  className=" deleteTextIcon"
                  src={deleteText}
                  width="33"
                  height="33"
                  onClick={() => {
                    allUser({});
                    setnotFoundMessage(false);
                    setPageNumber(1);
                    setTotalPages(1);
                    setSearchUser("");
                  }}
                ></img>
                {/* <Button
                  className="returnAllUsers btn-secondary"
                  onClick={() => {
                    allUser({});
                    setnotFoundMessage(false);
                    setPageNumber(1);
                    setTotalPages(1);
                    setSearchUser("");
                  }}
                >
                  Скинути
                </Button> */}
                <Button
                  type="submit"
                  id="submitSearch"
                  className="searchUserBtn"
                >
                  <img
                    className="searchUserIcon"
                    src={searchGlass}
                    width="22"
                    height="22"
                  ></img>
                </Button>
              </div>
            </Form>
            {/* </div> */}
          </Col>
        </Row>

        {/* =======================Попередження про видалення========================== */}

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Підтвердіть видалення</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {asnwerServDel ? (
              <span style={{ color: "orange" }}>{asnwerServDel}</span>
            ) : (
              "Ви впевнені, що хочете видалити користувача?"
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary cancelDeleteBtn"
              onClick={() => setShowDeleteModal(false)}
            >
              Скасувати
            </button>
            <button
              className="btn btn-danger confirmDeleteBtn"
              onClick={handleDeleteUser}
            >
              Видалити
            </button>
          </Modal.Footer>
        </Modal>

        {/* ==============Картка відображення користувача(ВСІХ)============== */}

        <div className="allUsersBlock mt-3 mb-2">
          <div className="adminBtnWrapper">
            {/* {windowWidth < 768 ? ( */}
            <img
              src={addUser}
              width="40"
              onClick={openAddUserModal}
              className="btnAfter768 addGreenCircle"
            ></img>
            {/* ) : (
              <button
                className="btn btn-success AddBtn"
                onClick={openAddUserModal}
              >
                Додати
              </button> */}
            {/* )}
            {windowWidth < 768 ? ( */}
            <img
              src={editUser}
              width="40"
              onClick={openEditModalForSelectedUser}
              className={`btnAfter768 ${
                !selectedUser ? "" : "activeCircleEdit"
              }`}
            ></img>
            {/* ) : (
              <button
                className={`btn btn-warning EditBtn ${
                  !selectedUser ? "disabled" : ""
                }`}
                onClick={openEditModalForSelectedUser}
              >
                Редагувати
              </button>
            )} */}
            {/* {windowWidth < 768 ? ( */}
            <img
              src={deleteUserBtn}
              width="40"
              onClick={selectedUser ? openDeleteModal : null}
              disabled={!selectedUser}
              className={`btnAfter768 ${
                !selectedUser ? "" : "activeCircleDelete"
              }`}
            ></img>
            {/* ) : (
               <button
                className={`btn btn-danger DeleteBtn ${
                  !selectedUser ? "disabled" : ""
                }`}
                onClick={selectedUser ? openDeleteModal : null}
                disabled={!selectedUser}
              >
                Видалити
              </button>
            )} */}
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
                if(indicateSearchForm){
                  AdminSearchFormUser(searchUser, index + 1);
                } else {
                  allUser(index + 1);
                }
                setCurrentPage(index + 1);
                setSelectedUserIdForEdit(null);
                // setNumberPagePagin(index + 1);
                // {indicateSearchForm ? AdminSearchFormUser(numberPagePagin) : allUser(index + 1);}

                // setCurrentPage(index + 1);
                // setSelectedUserIdForEdit(null);
                
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
                onCloseModal={() => {
                  setShowEditModal(false); // Закриття модального вікна
                }}
              />
            )}

            {/* <Modal.Footer> */}
            <div className="editFormBtns">
              <button
                onClick={() => {
                  handleSubmitButtonClick();
                  handleEditUser();
                }}
                className="btn btn-primary modalSendForm me-2"
              >
                Застосувати
              </button>
              <button
                className="btn btn-secondary modalCancel ms-2"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUserIdForEdit(null); // Скидання обраного користувача при закритті модального вікна
                }}
              >
                Скасувати
              </button>
            </div>
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
              onCloseModal={() => {
                setshowAddUserModal(false); // Закриття модального вікна
              }}
              submitAddButtonRef={submitAddButtonRef}
            />
            {/* <Modal.Footer> */}
            <div className="addFormBtns">
              <button
                onClick={handleSubmitAddUserButtonClick}
                className="btn btn-primary modalSendForm me-2"
              >
                Додати
              </button>
              <button
                className="btn btn-secondary modalCancel ms-2"
                onClick={() => {
                  setshowAddUserModal(false);
                }}
              >
                Скасувати
              </button>
            </div>
          </Modal.Body>
          {/* </Modal.Footer> */}
        </Modal>
      </Container>
    </div>
  );
}

export default AboutAllUser;
