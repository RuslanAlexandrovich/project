import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactsAdd from "../components/ContactsAdd";
import ContactsEdit from "../components/ContactsEdit";
import ContactsDelete from "../components/ContactsDelete";
// import RegionalManagerDelete from "../components/RegionalManagerDelete";
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
import addUserNotActive from "../images/addUserNotActve.svg";
import deleteText from "../images/deleteText.png";
import searchGlass from "../images/searchGlass.png";
import loading from "../images/loading.gif";

function ContactsComp(props) {
  const [contactsList, setContactsList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalContactsList, setOriginalContactsList] = useState([]);
  const [searchContact, setSearchContact] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContactValue, setSelectedContactValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");

  const [numberPagePagin, setNumberPagePagin] = useState(1);
  const [indicateSearchForm, setIndicateSearchForm] = useState(false);

  const [showAddedContactModal, setShowAddedContactModal] = useState(false);
  const submitAddButtonRef = useRef(null);

  const [showEditContactModal, setShowEditContactModal] = useState(false);
  const submitEditButtonRef = useRef(null);

  const [showDeleteContactModal, setShowDeleteContactModal] = useState(false);
  const submitDeleteButtonRef = useRef(null);

  useEffect(() => {
    GetAllContacts();
  }, []);

  const GetAllContacts = async (Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(false);
    setFilterSearch("");
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;

      const response = await axios.get(
        SERVER_URL + `Contact/Contact/All?Page=${numPaginPage}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful Contacts response:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const Contacts = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setContactsList(Contacts); // Зберігаємо всі регіони в стані
        setOriginalContactsList(Contacts);
        // Обробка успішної відповіді
        console.log("Successful Contacts List:", Contacts);
        console.log("Successful pages:", pageNumber);
        return Contacts;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  const SearchAllContacts = async (searchWord, Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(true);
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;
      let searchWords = searchWord !== "" ? searchWord : "";

      const response = await axios.get(
        SERVER_URL +
          `Contact/Contact/All?Page=${numPaginPage}&SearchWords=${searchWords}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful Contacts All:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const Contacts = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setContactsList(Contacts); // Зберігаємо всі регіони в стані
        setOriginalContactsList(Contacts);
        // Обробка успішної відповіді
        console.log("Successful Contacts list:", Contacts);
        console.log("Successful pages:", pageNumber);
        return Contacts;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  //===============================================Робота з модалками============================

  const closeModal = () => {
    setTimeout(() => {
      setShowAddedContactModal(false);
      setShowEditContactModal(false);
      setShowDeleteContactModal(false);
    }, 1500);
  };

  const handleSubmitAddButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitAddButtonRef.current) {
      submitAddButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
    setTimeout(() => {
      setSelectedContact(null);
      GetAllContacts(currentPage);
    }, 1000);
  };
  const handleSubmitEditButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitEditButtonRef.current) {
      submitEditButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
    setTimeout(() => {
      setSelectedContact(null);
      GetAllContacts(currentPage);
    }, 1000);
  };
  const handleSubmitDeleteButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitDeleteButtonRef.current) {
      submitDeleteButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
    setTimeout(() => {
      setSelectedContact(null);
      if (contactsList.length - 1 === 0) {
        setCurrentPage(currentPage - 1);
        GetAllContacts(currentPage - 1);
      } else {
        GetAllContacts(currentPage);
      }
    }, 1000);
  };

  const AddedContactWidow = () => {
    setShowAddedContactModal(true);
  };
  const EditContactWidow = () => {
    setShowEditContactModal(true);
  };
  const DeleteContactWidow = () => {
    setShowDeleteContactModal(true);
  };

  const onSubmit = async () => {
    console.log("дані форми пошуку...", searchContact);
    if (searchContact.trim() === "") {
      // Якщо поле пошуку порожнє, встановлюємо список користувачів в початковий стан
      setContactsList(originalContactsList);
    } else {
      // Викликаємо функцію пошуку та передаємо стартову сторінку
      SearchAllContacts(searchContact, 1);
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
          <Row>
            <Col className="searchRegionWrapp searchWrapper">
              <Form onSubmit={handleSubmit(onSubmit)} className="searchForm">
                <Form.Group controlId="formBasicSearch">
                  <Form.Control
                    className="searchInput"
                    type="text"
                    placeholder="Знайти менеджера"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />
                </Form.Group>
                <div className="searchBtnWrapp">
                  <img
                    className=" deleteTextIcon"
                    src={deleteText}
                    width="33"
                    height="33"
                    onClick={() => {
                      GetAllContacts({});
                      // setnotFoundMessage(false);
                      setPageNumber(1);
                      setTotalPages(1);
                      setSearchContact("");
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
                    onClick={AddedContactWidow}
                    className="btnAfter768"
                  ></img>
                  {!selectedContact ? (
                    <img
                      src={editUserNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={editUser}
                      width="40"
                      onClick={EditContactWidow}
                      className="btnAfter768"
                    ></img>
                  )}
                  {!selectedContact ? (
                    <img
                      src={deleteUserBtnNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={deleteUserBtn}
                      width="40"
                      onClick={DeleteContactWidow}
                      className="btnAfter768"
                    ></img>
                  )}
                </div>

                {/* =======================Вікно Додавання контакту========================== */}

                <Modal
                  show={showAddedContactModal}
                  onHide={() => setShowAddedContactModal(false)}
                  // dialogClassName="modal-fullscreen "
                  size="lg"
                  backdrop="static"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Додавання контакту</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ContactsAdd
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
                        }}
                      >
                        Додати
                      </button>
                      <button
                        className="btn btn-secondary modalCancel ms-2"
                        onClick={() => {
                          setShowAddedContactModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* =======================Вікно редагування контакту========================== */}

                <Modal
                  show={showEditContactModal}
                  onHide={() => setShowEditContactModal(false)}
                  backdrop="static"
                  size="lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Редагування контакту</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ContactsEdit
                      selectedContactValue={selectedContactValue}
                      submitEditButtonRef={submitEditButtonRef}
                      closeModal={closeModal}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="addFormBtns">
                      <button
                        type="submit"
                        className="btn btn-primary modalSendForm me-2"
                        onClick={handleSubmitEditButtonClick}
                      >
                        Змінити
                      </button>
                      <button
                        className="btn btn-secondary modalCancel ms-2"
                        onClick={() => {
                          setShowEditContactModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* =======================Вікно видалення контакту========================== */}

                <Modal
                  show={showDeleteContactModal}
                  onHide={() => setShowDeleteContactModal(false)}
                  backdrop="static"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Видалення контакту</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ContactsDelete
                      selectedContactValue={selectedContactValue}
                      submitDeleteButtonRef={submitDeleteButtonRef}
                      closeModal={closeModal}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="addFormBtns">
                      <button
                        type="submit"
                        className="btn btn-primary modalSendForm me-2"
                        onClick={handleSubmitDeleteButtonClick}
                      >
                        Видалити
                      </button>
                      <button
                        className="btn btn-secondary modalCancel ms-2"
                        onClick={() => {
                          setShowDeleteContactModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>
                <table className="tableUsers tableRegions">
                  <thead className="headTable headTableRegions">
                    <tr className="headRow">
                      <th>№</th>
                      <th>Код</th>
                      <th>П.І.Б</th>
                      <th>Телефон</th>
                      <th>Email</th>
                      <th>Регіон</th>
                      <th>Група</th>
                      <th>Адреса</th>
                      {/* <th>UserName</th> */}
                    </tr>
                    <tr>
                      <th colSpan="8" style={{ padding: "5px" }}></th>
                    </tr>
                  </thead>
                  <tbody className="tBody tBodyContacts">
                    <tr>
                      <td colSpan="8" style={{ padding: "3px" }}></td>
                    </tr>
                    {Array.from(contactsList).map((contact, index) => (
                      <tr
                        key={contact.id}
                        className={
                          selectedContact === contact.id ? "selected" : ""
                        }
                        onClick={() => {
                          setSelectedContact(contact.id);
                          setSelectedContactValue(contact);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{contact.contactCode}</td>
                        <td>{contact.contactName}</td>
                        <td>{contact.contactPhones && contact.contactPhones.length > 0 ?
                        contact.contactPhones.find(phone => phone.isMain === true)?.phone || "" : ""}</td>
                        <td>{contact.contactEmails && contact.contactEmails.length > 0 ?
                        contact.contactEmails.find(email => email.isMain === true)?.email || "" : ""}</td>
                        <td>{contact.region.name}</td>
                        <td>{contact.contactGroup.name}</td>
                        <td>{contact.contactAddresses && contact.contactAddresses.length > 0 ?
                        contact.contactAddresses.find(adress => adress.addressType === 0)?.address || "" : ""}</td>
                        {/* <td>{contact.user.name}</td> */}
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
                      SearchAllContacts(searchContact, 1);
                    } else {
                      GetAllContacts(1);
                    }
                    setCurrentPage(1);
                    setSelectedContact(null);
                    setSelectedContactValue(null);
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
                          SearchAllContacts(searchContact, index + 1);
                        } else {
                          GetAllContacts(index + 1);
                        }
                        setCurrentPage(index + 1);
                        setSelectedContact(null);
                        setSelectedContactValue(null);
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
                      SearchAllContacts(searchContact, totalPages);
                    } else {
                      GetAllContacts(totalPages);
                    }
                    setCurrentPage(totalPages);
                    setSelectedContact(null);
                    setSelectedContactValue(null);
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

export default ContactsComp;
