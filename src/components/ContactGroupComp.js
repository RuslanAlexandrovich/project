import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactGroupAdd from "../components/ContactGroupAdd";
import ContactGroupEdit from "../components/ContactGroupEdit";
import ContactGroupDelete from "../components/ContactGroupDelete";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import authHeader from "../helpers/auth-header";
import SERVER_URL from "../helpers/Config";
import { Modal } from "react-bootstrap";
import addUser from "../images/addUser.svg";
import editUser from "../images/editUser.svg";
import deleteUserBtn from "../images/deleteUserBtn.svg";
import deleteUserBtnNotActive from "../images/deleteUserBtnNotActive.svg";
import editUserNotActive from "../images/editUserNotActive.svg";
import deleteText from "../images/deleteText.png";
import searchGlass from "../images/searchGlass.png";

function ContactGroupComp(props) {
  // const servStatus = props.onEditRegionStatusChange;

  const [servStatus, setServStatus] = useState(null);
  const [contactGroupList, setContactGroupList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalContactGroupList, setOriginalContactGroupList] = useState([]);
  const [searchContactGroup, setSearchContactGroup] = useState("");
  const [selectedContactGroup, setSelectedContactGroup] = useState(null);
  const [selectedContactGroupIdForEdit, setSelectedContactGroupIdForEdit] =
    useState(null);
  const [contactGroupValue, setContactGroupValue] = useState({});
  const [filterSearch, setFilterSearch] = useState("");

  const [showAddContactGroupModal, setShowAddContactGroupModal] =
    useState(false);
  const submitAddButtonRef = useRef(null);

  const [showEditContactGroupModal, setShowEditContactGroupModal] =
    useState(false);
  const submitEditButtonRef = useRef(null);

  const [showDeleteContactGroupModal, setShowDeleteContactGroupModal] =
    useState(false);
  const submitDeleteButtonRef = useRef(null);

  const [numberPagePagin, setNumberPagePagin] = useState(1);
  const [indicateSearchForm, setIndicateSearchForm] = useState(false);

  useEffect(() => {
    const storedPage = localStorage.getItem("paginPage");
    if (storedPage) {
      const Page = parseInt(storedPage, 10);
      console.log("СТОРІНКА.....", Page);
      GetAllContactGroup();
    } else {
      GetAllContactGroup({});
    }
  }, []);

  const GetAllContactGroup = async (Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(false);
    setFilterSearch("");
    setSelectedContactGroup(null);
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;

      const response = await axios.get(
        SERVER_URL + `Contact/ContactGroup/All?Page=${numPaginPage}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful regionsAll:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const ContactGroup = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setContactGroupList(ContactGroup); // Зберігаємо всі регіони в стані
        setOriginalContactGroupList(ContactGroup);
        // Обробка успішної відповіді
        console.log("Successful ContactGroupAll:", response);
        console.log("Successful pages:", pageNumber);
        return ContactGroup;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  const SearchAllContactGroup = async (searchWord, Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(true);
    setSelectedContactGroup(null);
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;
      let searchWords = searchWord !== "" ? searchWord : "";

      const response = await axios.get(
        SERVER_URL +
          `Contact/ContactGroup/All?Page=${numPaginPage}&SearchWords=${searchWords}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful regionsAll:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const ContactGroup = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setContactGroupList(ContactGroup); // Зберігаємо всі регіони в стані
        setOriginalContactGroupList(ContactGroup);
        // Обробка успішної відповіді
        console.log("Successful ContactGroupAll:", response);
        console.log("Successful pages:", pageNumber);
        return ContactGroup;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  //====================================Робота з модалкою Add=================

  const openAddModalForSelectedContactGroup = () => {
    if (selectedContactGroup !== null) {
      setSelectedContactGroupIdForEdit(selectedContactGroup);
      setShowAddContactGroupModal(true);
    }
  };

  const handleSubmitAddButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitAddButtonRef.current) {
      submitAddButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
  };
  const updateAfterAdd = async () => {
    setTimeout(() => {
      setSelectedContactGroup(null);
      GetAllContactGroup(currentPage);
    }, 1000);
  };

  //====================================Робота з модалкою  Edit =================

  const closeModal = () => {
    setTimeout(() => {
      setShowAddContactGroupModal(false);
      setShowEditContactGroupModal(false);
      setShowDeleteContactGroupModal(false);
    }, 1500);
  };

  const openEditModalForSelectedContactGroup = () => {
    if (selectedContactGroup !== null) {
      setSelectedContactGroupIdForEdit(selectedContactGroup);
      setShowEditContactGroupModal(true);
    }
  };

  const handleSubmitEditButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitEditButtonRef.current) {
      submitEditButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
  };
  const updateAfterEdit = async () => {
    setTimeout(() => {
      setSelectedContactGroup(null);
      GetAllContactGroup(currentPage);
    }, 1000);
  };

  //====================================Робота з модалкою  Delete =================

  const openDeleteModalForSelectedContactGroup = () => {
    if (selectedContactGroup !== null) {
      setSelectedContactGroupIdForEdit(selectedContactGroup);
      setShowDeleteContactGroupModal(true);
    }
  };

  const handleSubmitDeleteButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitDeleteButtonRef.current) {
      submitDeleteButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
  };
  const updateAfterDelete = async () => {
    setTimeout(() => {
      setSelectedContactGroup(null);
      if (contactGroupList.length - 1 === 0) {
        setCurrentPage(currentPage - 1);
        GetAllContactGroup(currentPage - 1);
      } else {
        GetAllContactGroup(currentPage);
      }
    }, 1000);
  };

  const onSubmit = async () => {
    console.log("дані форми пошуку...", searchContactGroup);
    if (searchContactGroup.trim() === "") {
      // Якщо поле пошуку порожнє, встановлюємо список користувачів в початковий стан
      setContactGroupList(originalContactGroupList);
    } else {
      // Викликаємо функцію пошуку та передаємо стартову сторінку
      SearchAllContactGroup(searchContactGroup, 1);
    }
  };

  //====================================Робота з блоком паігнатора =================

  const controlBtnPagingRef = useRef(null);

  // Функція для обробки кліків на кнопки сторінок
  const handleButtonClick = (buttonIndex) => {
    const containerWidth = controlBtnPagingRef.current.clientWidth;
    const contentWidth = controlBtnPagingRef.current.scrollWidth;

    const scrollPosition =
      buttonIndex *
        (contentWidth / controlBtnPagingRef.current.children.length) -
      containerWidth / 2;

    controlBtnPagingRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  return (
    <>
      <div className="App">
        <Container className="wrappAdmPage wrappRegionBlock">
          {/* ===========================Блок пошуку============================ */}

          <Row>
            <Col className="searchRegionWrapp searchWrapper">
              <Form className="searchForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicSearch">
                  <Form.Control
                    className="searchInput"
                    type="text"
                    placeholder="Знайти захід"
                    value={searchContactGroup}
                    onChange={(e) => setSearchContactGroup(e.target.value)}
                  />
                </Form.Group>
                <div className="searchBtnWrapp">
                  <img
                    className=" deleteTextIcon"
                    src={deleteText}
                    width="33"
                    height="33"
                    onClick={() => {
                      GetAllContactGroup({});
                      // setnotFoundMessage(false);
                      setPageNumber(1);
                      setTotalPages(1);
                      setSearchContactGroup("");
                    }}
                  ></img>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="allUsersBlock RegionsBlock mt-3 mb-2">
                <div className="adminBtnWrapper">
                  <img
                    src={addUser}
                    width="40"
                    onClick={() => setShowAddContactGroupModal(true)}
                    className="btnAfter768 "
                  ></img>
                  {!selectedContactGroup ? (
                    <img
                      src={editUserNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={editUser}
                      onClick={openEditModalForSelectedContactGroup}
                      width="40"
                      className="btnAfter768"
                    ></img>
                  )}
                  {!selectedContactGroup ? (
                    <img
                      src={deleteUserBtnNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={deleteUserBtn}
                      onClick={openDeleteModalForSelectedContactGroup}
                      width="40"
                      className="btnAfter768"
                    ></img>
                  )}
                </div>

                {/* =======================Вікно Додавання ========================== */}

                <Modal
                  show={showAddContactGroupModal}
                  onHide={() => setShowAddContactGroupModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Додавання</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ContactGroupAdd
                      submitAddButtonRef={submitAddButtonRef}
                      closeModal={closeModal}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="addFormBtns">
                      <button
                        type="submit"
                        className="btn btn-primary modalSendForm me-2"
                        onClick={() => {
                          handleSubmitAddButtonClick();
                          updateAfterAdd();
                        }}
                      >
                        Додати
                      </button>
                      <button
                        className="btn btn-secondary modalCancel ms-2"
                        onClick={() => {
                          setShowAddContactGroupModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* =======================Вікно Редагування ========================== */}

                <Modal
                  show={showEditContactGroupModal}
                  onHide={() => setShowEditContactGroupModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Редагування</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ContactGroupEdit
                      ContactGroupValue={contactGroupValue}
                      submitEditButtonRef={submitEditButtonRef}
                      closeModal={closeModal}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="addFormBtns">
                      <button
                        type="submit"
                        className="btn btn-primary modalSendForm me-2"
                        onClick={() => {
                          handleSubmitEditButtonClick();
                          updateAfterEdit(currentPage);
                          console.log("current page...", currentPage);
                        }}
                      >
                        Змінити
                      </button>
                      <button
                        className="btn btn-secondary modalCancel ms-2"
                        onClick={() => {
                          setShowEditContactGroupModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* =======================Вікно Видалення ========================== */}

                <Modal
                  show={showDeleteContactGroupModal}
                  onHide={() => setShowDeleteContactGroupModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Ви хочете видалити групу?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ContactGroupDelete
                      ContactGroupValue={contactGroupValue}
                      submitDeleteButtonRef={submitDeleteButtonRef}
                      closeModal={closeModal}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="addFormBtns">
                      <button
                        type="submit"
                        className="btn btn-primary modalSendForm me-2"
                        onClick={() => {
                          handleSubmitDeleteButtonClick();
                          updateAfterDelete(currentPage);
                        }}
                      >
                        Видалити
                      </button>
                      <button
                        className="btn btn-secondary modalCancel ms-2"
                        onClick={() => {
                          setShowDeleteContactGroupModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                <table className="tableUsers tableRegions tableEvents">
                  <thead className="headTable headTableRegions">
                    <tr className="headRow">
                      <th>№</th>
                      <th>Код</th>
                      <th>Тип</th>
                      <th>Примітки</th>
                    </tr>
                    <tr>
                      <th colSpan="8" style={{ padding: "5px" }}></th>
                    </tr>
                  </thead>
                  <tbody className="tBody tBodyRegions">
                    <tr>
                      <td colSpan="8" style={{ padding: "3px" }}></td>
                    </tr>
                    {contactGroupList.map((group, index) => (
                      <tr
                        key={group.id}
                        className={
                          selectedContactGroup === group.id ? "selected" : ""
                        }
                        onClick={() => {
                          setSelectedContactGroup(group.id);
                          setContactGroupValue(group);
                          console.log(selectedContactGroup);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{group.groupCode}</td>
                        <td>{group.groupName}</td>
                        <td>{group.groupNote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ====================Блок пагінатора========================= */}

              <div className="paging">
                <button
                  onClick={() => {
                    if (indicateSearchForm) {
                      SearchAllContactGroup(searchContactGroup, 1);
                    } else {
                      GetAllContactGroup(1);
                    }
                    setCurrentPage(1);
                    setSelectedContactGroupIdForEdit(null);
                    handleButtonClick(0); // Додайте обробку кліка на кнопці
                  }}
                  className={
                    pageNumber === 1 ? "activePagin" : "notActivePagin"
                  }
                >
                  1 ст.
                </button>
                <div className="controlBtnPaging" ref={controlBtnPagingRef}>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onChange={() => {
                        setNumberPagePagin(index + 1);
                      }}
                      onClick={() => {
                        if (indicateSearchForm) {
                          SearchAllContactGroup(searchContactGroup, index + 1);
                        } else {
                          GetAllContactGroup(index + 1);
                        }
                        setCurrentPage(index + 1);
                        setSelectedContactGroupIdForEdit(null);
                        handleButtonClick(index); // Додайте обробку кліка на кнопці
                      }}
                      className={
                        pageNumber === index + 1
                          ? "activePagin"
                          : "notActivePagin"
                      }
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <button
                  className={
                    pageNumber === totalPages ? "activePagin" : "notActivePagin"
                  }
                  onClick={() => {
                    if (indicateSearchForm) {
                      SearchAllContactGroup(searchContactGroup, totalPages);
                    } else {
                      GetAllContactGroup(totalPages);
                    }
                    setCurrentPage(totalPages);
                    setSelectedContactGroupIdForEdit(null);
                    handleButtonClick(totalPages - 1); // Додайте обробку кліка на кнопці
                  }}
                >
                  {totalPages} ст.
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ContactGroupComp;
