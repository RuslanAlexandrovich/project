import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ManagerAddRegion from "../components/ManagerAddRegion";
import ManagerEditRegion from "../components/ManagerEditRegion";
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

  const [numberPagePagin, setNumberPagePagin] = useState(1);
  const [indicateSearchForm, setIndicateSearchForm] = useState(false);

  useEffect(() => {
    const storedPage = localStorage.getItem("paginPage");
    if (storedPage) {
      const Page = parseInt(storedPage, 10);
      console.log("СТОРІНКА.....", Page);
      GetAllRegions();
    } else {
      GetAllRegions({});
    }
  }, []);

  const GetAllRegions = async (Page) => {
    console.log("INDEX PAGE:", Page);
    setIndicateSearchForm(false);
    setFilterSearch("");
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
        console.log("Successful regionsAll:", response);
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
        console.log("Successful regionsAll:", response);
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

  
  //====================================Робота з модалкою ManagerAddRegion=================

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


  //====================================Робота з модалкою Manager Edit Region=================

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
                      width="40"
                      // onClick={openEditModalForSelectedUser}
                      className="btnAfter768"
                    ></img>
                  )}
                </div>

          {/* =======================Вікно Додавання Регіону========================== */}

                <Modal
                  show={showAddRegionModal} onHide={() => setShowAddRegionModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Додавання регіону</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ManagerAddRegion 
                    // regionValue={regionValue}
                    submitAddButtonRef={submitAddButtonRef}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="addFormBtns">
                      <button
                        type="submit"
                        className="btn btn-primary modalSendForm me-2"
                        onClick={handleSubmitAddButtonClick}
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
                  show={showEditRegionModal} onHide={() => setShowEditRegionModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Редагування регіону</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ManagerEditRegion 
                    regionValue={regionValue}
                    submitEditButtonRef={submitEditButtonRef}
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
                          setShowEditRegionModal(false);
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
                        console.log(selectedRegion)
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
                      // setSelectedUserIdForEdit(null);
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

export default RegionPageComp;
