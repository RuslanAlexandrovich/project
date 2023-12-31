import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EventTypeAdd from "../components/EventTypeAdd";
import EventTypeEdit from "../components/EventTypeEdit";
import EventTypeDelete from "../components/EventTypeDelete";
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

function EventComp(props) {
  // const servStatus = props.onEditRegionStatusChange;

  const [servStatus, setServStatus] = useState(null);
  const [EventList, setEventList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalEventList, setOriginalEventList] = useState([]);
  const [searchEvent, setSearchEvent] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventIdForEdit, setSelectedEventIdForEdit] = useState(null);
  const [eventValue, setEventValue] = useState({});
  const [filterSearch, setFilterSearch] = useState("");

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const submitAddButtonRef = useRef(null);

  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const submitEditButtonRef = useRef(null);

  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const submitDeleteButtonRef = useRef(null);

  const [numberPagePagin, setNumberPagePagin] = useState(1);
  const [indicateSearchForm, setIndicateSearchForm] = useState(false);

  useEffect(() => {
    GetAllEventType();
  }, []);

  const GetAllEventType = async (Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(false);
    setFilterSearch("");
    setSelectedEvent(null);
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;

      const response = await axios.get(
        SERVER_URL + `Event/EventType/All?Page=${numPaginPage}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful EventAll:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const Events = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setEventList(Events); // Зберігаємо всі регіони в стані
        setOriginalEventList(Events);
        // Обробка успішної відповіді
        console.log("Successful EventAll=200:", response);
        console.log("Successful pages:", pageNumber);
        return Events;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  const SearchAllEvent = async (searchWord, Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(true);
    setSelectedEvent(null);
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;
      let searchWords = searchWord !== "" ? searchWord : "";

      const response = await axios.get(
        SERVER_URL +
          `Event/EventType/All?Page=${numPaginPage}&SearchWords=${searchWords}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful EventAllSearch:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const Events = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setEventList(Events); // Зберігаємо всі регіони в стані
        setOriginalEventList(Events);
        // Обробка успішної відповіді
        console.log("Successful EventAllSearch:", response);
        console.log("Successful pages:", pageNumber);
        return Events;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  //====================================Робота з модалкою Add=================

  const openAddModalForSelectedEvent = () => {
    if (selectedEvent !== null) {
      setSelectedEventIdForEdit(selectedEvent);
      setShowAddEventModal(true);
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
      setSelectedEvent(null);
      GetAllEventType(currentPage);
    }, 1000);
  };

  //====================================Робота з модалкою  Edit =================

  const closeModal = () => {
    setTimeout(() => {
      setShowAddEventModal(false);
      setShowEditEventModal(false);
      setShowDeleteEventModal(false);
    }, 1500);
  };

  const openEditModalForSelectedEvent = () => {
    if (selectedEvent !== null) {
      setSelectedEventIdForEdit(selectedEvent);
      setShowEditEventModal(true);
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
      setSelectedEvent(null);
      GetAllEventType(currentPage);
    }, 1000);
  };

  //====================================Робота з модалкою  Delete =================

  const openDeleteModalForSelectedEvent = () => {
    if (selectedEvent !== null) {
      setSelectedEventIdForEdit(selectedEvent);
      setShowDeleteEventModal(true);
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
      setSelectedEvent(null);
      if (EventList.length - 1 === 0) {
        setCurrentPage(currentPage - 1);
        GetAllEventType(currentPage - 1);
      } else {
        GetAllEventType(currentPage);
      }
    }, 1000);
  };

  const onSubmit = async () => {
    console.log("дані форми пошуку...", searchEvent);
    if (searchEvent.trim() === "") {
      // Якщо поле пошуку порожнє, встановлюємо список користувачів в початковий стан
      setEventList(originalEventList);
    } else {
      // Викликаємо функцію пошуку та передаємо стартову сторінку
      SearchAllEvent(searchEvent, 1);
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
                    value={searchEvent}
                    onChange={(e) => setSearchEvent(e.target.value)}
                  />
                </Form.Group>
                <div className="searchBtnWrapp">
                  <img
                    className=" deleteTextIcon"
                    src={deleteText}
                    width="33"
                    height="33"
                    onClick={() => {
                      GetAllEventType({});
                      // setnotFoundMessage(false);
                      setPageNumber(1);
                      setTotalPages(1);
                      setSearchEvent("");
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
                    onClick={() => setShowAddEventModal(true)}
                    className="btnAfter768 "
                  ></img>
                  {!selectedEvent ? (
                    <img
                      src={editUserNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={editUser}
                      onClick={openEditModalForSelectedEvent}
                      width="40"
                      className="btnAfter768"
                    ></img>
                  )}
                  {!selectedEvent ? (
                    <img
                      src={deleteUserBtnNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={deleteUserBtn}
                      onClick={openDeleteModalForSelectedEvent}
                      width="40"
                      className="btnAfter768"
                    ></img>
                  )}
                </div>

                {/* =======================Вікно Додавання ========================== */}

                <Modal
                  show={showAddEventModal}
                  onHide={() => setShowAddEventModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Додавання</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EventTypeAdd
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
                          setShowAddEventModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* =======================Вікно Редагування ========================== */}

                <Modal
                  show={showEditEventModal}
                  onHide={() => setShowEditEventModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Редагування</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EventTypeEdit
                      eventValue={eventValue}
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
                          setShowEditEventModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* =======================Вікно Видалення ========================== */}

                <Modal
                  show={showDeleteEventModal}
                  onHide={() => setShowDeleteEventModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Ви хочете видалити захід?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EventTypeDelete
                      eventValue={eventValue}
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
                          setShowDeleteEventModal(false);
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
                    {EventList.map((event, index) => (
                      <tr
                        key={event.id}
                        className={selectedEvent === event.id ? "selected" : ""}
                        onClick={() => {
                          setSelectedEvent(event.id);
                          setEventValue(event);
                          console.log(selectedEvent);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{event.eventTypeCode}</td>
                        <td>{event.eventTypeName}</td>
                        <td>{event.eventTypeNote}</td>
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
                      SearchAllEvent(searchEvent, 1);
                    } else {
                      GetAllEventType(1);
                    }
                    setCurrentPage(1);
                    setSelectedEventIdForEdit(null);
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
                          SearchAllEvent(searchEvent, index + 1);
                        } else {
                          GetAllEventType(index + 1);
                        }
                        setCurrentPage(index + 1);
                        setSelectedEventIdForEdit(null);
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
                      SearchAllEvent(searchEvent, totalPages);
                    } else {
                      GetAllEventType(totalPages);
                    }
                    setCurrentPage(totalPages);
                    setSelectedEventIdForEdit(null);
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

export default EventComp;
