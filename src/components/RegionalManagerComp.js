import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RegionalManagerAdd from "../components/RegionalManagerAdd";
import RegionalManagerDelete from "../components/RegionalManagerDelete";
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

function RegionalManagerComp(props) {
  const [managerList, setManagerList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalManagerList, setOriginalManagerList] = useState([]);
  const [searchManager, setSearchManager] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedManagerValue, setSelectedManagerValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");

  const [numberPagePagin, setNumberPagePagin] = useState(1);
  const [indicateSearchForm, setIndicateSearchForm] = useState(false);

  const [showAddedManagerModal, setShowAddedManagerModal] = useState(false);
  const submitAddButtonRef = useRef(null);

  const [showDeleteManagerModal, setShowDeleteManagerModal] = useState(false);
  const submitDeleteButtonRef = useRef(null);

  useEffect(() => {
    GetAllManager();
  }, []);

  const GetAllManager = async (Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(false);
    setFilterSearch("");
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;

      const response = await axios.get(
        SERVER_URL + `Region/RegionalManager/All?Page=${numPaginPage}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful regionalManagerresponse:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const Manager = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setManagerList(Manager); // Зберігаємо всі регіони в стані
        setOriginalManagerList(Manager);
        // Обробка успішної відповіді
        console.log("Successful regionalManager:", Manager);
        console.log("Successful pages:", pageNumber);
        return Manager;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  const SearchAllManager = async (searchWord, Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(true);
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;
      let searchWords = searchWord !== "" ? searchWord : "";

      const response = await axios.get(
        SERVER_URL +
          `/Region/RegionalManager/All?Page=${numPaginPage}&SearchWords=${searchWords}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful regionsAll:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const Manager = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setManagerList(Manager); // Зберігаємо всі регіони в стані
        setOriginalManagerList(Manager);
        // Обробка успішної відповіді
        console.log("Successful regionsAll:", response);
        console.log("Successful pages:", pageNumber);
        return Manager;
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
      setShowAddedManagerModal(false);
      // setShowEditRegionModal(false);
      setShowDeleteManagerModal(false);
    }, 1500);
  };

  const handleSubmitAddButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitAddButtonRef.current) {
      submitAddButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
    setTimeout(() => {
      GetAllManager(currentPage);
    }, 1000);
  };
  const handleSubmitDeleteButtonClick = () => {
    // Клацання на кнопці "modalConfirm" в модальному вікні
    if (submitDeleteButtonRef.current) {
      submitDeleteButtonRef.current.click(); // Симулюємо клік на кнопці "Надіслати" в іншому компоненті
    }
    setTimeout(() => {
      setSelectedManager(null);
      if (managerList.length - 1 === 0) {
        setCurrentPage(currentPage - 1);
        GetAllManager(currentPage - 1);
      } else {
        GetAllManager(currentPage);
      }
    }, 1000);
  };

  const AddedRegionWidow = () => {
    setShowAddedManagerModal(true);
  };
  const DeleteRegionWidow = () => {
    setShowDeleteManagerModal(true);
  };

  const onSubmit = async () => {
    console.log("дані форми пошуку...", searchManager);
    if (searchManager.trim() === "") {
      // Якщо поле пошуку порожнє, встановлюємо список користувачів в початковий стан
      setManagerList(originalManagerList);
    } else {
      // Викликаємо функцію пошуку та передаємо стартову сторінку
      SearchAllManager(searchManager, 1);
    }
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
                    value={searchManager}
                    onChange={(e) => setSearchManager(e.target.value)}
                  />
                </Form.Group>
                <div className="searchBtnWrapp">
                  <img
                    className=" deleteTextIcon"
                    src={deleteText}
                    width="33"
                    height="33"
                    onClick={() => {
                      GetAllManager({});
                      // setnotFoundMessage(false);
                      setPageNumber(1);
                      setTotalPages(1);
                      setSearchManager("");
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
                    onClick={AddedRegionWidow}
                    className="btnAfter768"
                  ></img>
                  {/* {!selectedManager ? (
                    <img
                      src={editUserNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={editUser}
                      width="40"
                      // onClick={openEditModalForSelectedUser}
                      className="btnAfter768"
                    ></img>
                  )} */}
                  {!selectedManager ? (
                    <img
                      src={deleteUserBtnNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={deleteUserBtn}
                      width="40"
                      onClick={DeleteRegionWidow}
                      className="btnAfter768"
                    ></img>
                  )}
                </div>

                {/* =======================Вікно Додавання Регіонального менеджера========================== */}

                <Modal
                  show={showAddedManagerModal}
                  onHide={() => setShowAddedManagerModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Додавання Менеджер\Регіон</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <RegionalManagerAdd
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
                          setShowAddedManagerModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* =======================Вікно видалення регіонального менеджера========================== */}

                <Modal
                  show={showDeleteManagerModal}
                  onHide={() => setShowDeleteManagerModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Видалення Менеджер\Регіон</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <RegionalManagerDelete
                      selectedManagerValue={selectedManagerValue}
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
                          setShowDeleteManagerModal(false);
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
                      <th>RegionId</th>
                      <th>RegionName</th>
                      <th>UserId</th>
                      <th>UserName</th>
                    </tr>
                    <tr>
                      <th colSpan="8" style={{ padding: "5px" }}></th>
                    </tr>
                  </thead>
                  <tbody className="tBody tBodyRegions">
                    <tr>
                      <td colSpan="8" style={{ padding: "3px" }}></td>
                    </tr>
                    {Array.from(managerList).map((object, index) => (
                      <tr
                        key={object.id}
                        className={
                          selectedManager === object.id ? "selected" : ""
                        }
                        onClick={() => {
                          setSelectedManager(object.id);
                          setSelectedManagerValue(object);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{object.region.id}</td>
                        <td>{object.region.name}</td>
                        <td>{object.user.id}</td>
                        <td>{object.user.name}</td>
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
                    onChange={() => {
                      setNumberPagePagin(index + 1);
                    }}
                    onClick={() => {
                      if (indicateSearchForm) {
                        SearchAllManager(searchManager, index + 1);
                      } else {
                        GetAllManager(index + 1);
                      }
                      setCurrentPage(index + 1);
                      setSelectedManager(null);
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default RegionalManagerComp;
