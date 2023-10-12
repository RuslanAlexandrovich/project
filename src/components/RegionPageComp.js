import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ManagerAddRegion from "../components/ManagerAddRegion";
import ManagerEditRegion from "../components/ManagerEditRegion";
import ManagerDeleteRegion from "../components/ManagerDeleteRegion";
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

function RegionPageComp(props) {
  // const servStatus = props.onEditRegionStatusChange;

  const [servStatus, setServStatus] = useState(null);
  const [RegionsList, setRegionsList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalRegionList, setOriginalRegionList] = useState([]);
  const [searchRegion, setSearchRegion] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedRegionIdForEdit, setSelectedRegionIdForEdit] = useState(null);
  const [regionValue, setRegionValue] = useState({});
  const [filterSearch, setFilterSearch] = useState("");

  const [showAddRegionModal, setShowAddRegionModal] = useState(false);
  const submitAddButtonRef = useRef(null);

  const [showEditRegionModal, setShowEditRegionModal] = useState(false);
  const submitEditButtonRef = useRef(null);

  const [showDeleteRegionModal, setShowDeleteRegionModal] = useState(false);
  const submitDeleteButtonRef = useRef(null);

  const [numberPagePagin, setNumberPagePagin] = useState(1);
  const [indicateSearchForm, setIndicateSearchForm] = useState(false);

  useEffect(() => {
    GetAllRegions();
  }, []);

  const GetAllRegions = async (Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(false);
    setFilterSearch("");
    setSelectedRegion(null);
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;

      const response = await axios.get(
        SERVER_URL + `Region/Region/All?Page=${numPaginPage}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful regionsAll:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const Regions = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setRegionsList(Regions); // Зберігаємо всі регіони в стані
        setOriginalRegionList(Regions);
        // Обробка успішної відповіді
        console.log("TotlaPages:", totalPages);
        console.log("Successful pages:", pageNumber);
        return Regions;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  const SearchAllRegions = async (searchWord, Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(true);
    setSelectedRegion(null);
    try {
      let numPaginPage = typeof Page === "number" ? Page : 1;
      let searchWords = searchWord !== "" ? searchWord : "";

      const response = await axios.get(
        SERVER_URL +
          `Region/Region/All?Page=${numPaginPage}&SearchWords=${searchWords}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful regionsAllSearch:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const Regions = responseData.entries;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;

        setPageNumber(pageNumber);
        setTotalPages(totalPages); // Зберігаємо загальну кількість сторінок
        setRegionsList(Regions); // Зберігаємо всі регіони в стані
        setOriginalRegionList(Regions);
        // Обробка успішної відповіді
        // console.log("Successful regionsAllSearch:", response);
        console.log("Successful pages:", pageNumber);
        return Regions;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  //====================================Робота з модалкою AddRegion=================

  const openAddModalForSelectedRegion = () => {
    if (selectedRegion !== null) {
      setSelectedRegionIdForEdit(selectedRegion);
      setShowAddRegionModal(true);
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
      setSelectedRegion(null);
      GetAllRegions(currentPage);
    }, 1000);
  };

  //====================================Робота з модалкою Edit Region=================

  const closeModal = () => {
    setShowAddRegionModal(false);
    setShowEditRegionModal(false);
    setShowDeleteRegionModal(false);
  };

  const openEditModalForSelectedRegion = () => {
    if (selectedRegion !== null) {
      setSelectedRegionIdForEdit(selectedRegion);
      setShowEditRegionModal(true);
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
      setSelectedRegion(null);
      GetAllRegions(currentPage);
    }, 1000);
  };

  //====================================Робота з модалкою Delete Region=================

  const openDeleteModalForSelectedRegion = () => {
    if (selectedRegion !== null) {
      setSelectedRegionIdForEdit(selectedRegion);
      setShowDeleteRegionModal(true);
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
      setSelectedRegion(null);
      if (RegionsList.length - 1 === 0) {
        setCurrentPage(currentPage - 1);
        GetAllRegions(currentPage - 1);
      } else {
        GetAllRegions(currentPage);
      }
    }, 1000);
  };

  const onSubmit = async () => {
    console.log("дані форми пошуку...", searchRegion);
    if (searchRegion.trim() === "") {
      // Якщо поле пошуку порожнє, встановлюємо список користувачів в початковий стан
      setRegionsList(originalRegionList);
    } else {
      // Викликаємо функцію пошуку та передаємо стартову сторінку
      SearchAllRegions(searchRegion, 1);
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
                    placeholder="Знайти користувача"
                    value={searchRegion}
                    onChange={(e) => setSearchRegion(e.target.value)}
                  />
                </Form.Group>
                <div className="searchBtnWrapp">
                  <img
                    className=" deleteTextIcon"
                    src={deleteText}
                    width="33"
                    height="33"
                    onClick={() => {
                      GetAllRegions({});
                      // setnotFoundMessage(false);
                      setPageNumber(1);
                      setTotalPages(1);
                      setSearchRegion("");
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
                    onClick={() => setShowAddRegionModal(true)}
                    className="btnAfter768 "
                  ></img>
                  {!selectedRegion ? (
                    <img
                      src={editUserNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={editUser}
                      onClick={openEditModalForSelectedRegion}
                      width="40"
                      className="btnAfter768"
                    ></img>
                  )}
                  {!selectedRegion ? (
                    <img
                      src={deleteUserBtnNotActive}
                      width="40"
                      className="notActiveEdit"
                    ></img>
                  ) : (
                    <img
                      src={deleteUserBtn}
                      onClick={openDeleteModalForSelectedRegion}
                      width="40"
                      className="btnAfter768"
                    ></img>
                  )}
                </div>

                {/* =======================Вікно Додавання Регіону========================== */}

                <Modal
                  show={showAddRegionModal}
                  onHide={() => setShowAddRegionModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Додавання регіону</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ManagerAddRegion
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
                          setShowAddRegionModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* =======================Вікно Редагування Регіону========================== */}

                <Modal
                  show={showEditRegionModal}
                  onHide={() => setShowEditRegionModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Редагування регіону</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ManagerEditRegion
                      regionValue={regionValue}
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
                          setShowEditRegionModal(false);
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </Modal.Footer>
                </Modal>

                {/* =======================Вікно Видалення Регіону========================== */}

                <Modal
                  show={showDeleteRegionModal}
                  onHide={() => setShowDeleteRegionModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Ви хочете видалити регіон?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ManagerDeleteRegion
                      regionValue={regionValue}
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
                          setShowDeleteRegionModal(false);
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
                      <th>Регіон</th>
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
                    {RegionsList.map((region, index) => (
                      <tr
                        key={region.id}
                        className={
                          selectedRegion === region.id ? "selected" : ""
                        }
                        onClick={() => {
                          setSelectedRegion(region.id);
                          setRegionValue(region);
                          console.log(selectedRegion);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{region.regionCode}</td>
                        <td>{region.regionName}</td>
                        <td>{region.regionNote}</td>
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
                      SearchAllRegions(searchRegion, 1);
                    } else {
                      GetAllRegions(1);
                    }
                    setCurrentPage(1);
                    setSelectedRegionIdForEdit(null);
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
                          SearchAllRegions(searchRegion, index + 1);
                        } else {
                          GetAllRegions(index + 1);
                        }
                        setCurrentPage(index + 1);
                        setSelectedRegionIdForEdit(null);
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
                      SearchAllRegions(searchRegion, totalPages);
                    } else {
                      GetAllRegions(totalPages);
                    }
                    setCurrentPage(totalPages);
                    setSelectedRegionIdForEdit(null);
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

export default RegionPageComp;
