import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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

function RegionalManagerComp() {
  const [managerList, setManagerList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalManagerList, setOriginalManagerList] = useState([]);
  const [searchManager, setSearchManager] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddedManagerModal, setShowAddedManagerModal] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");

  const [numberPagePagin, setNumberPagePagin] = useState(1);
  const [indicateSearchForm, setIndicateSearchForm] = useState(false);

  useEffect(() => {
    const storedPage = localStorage.getItem("paginPage");
    if (storedPage) {
      const Page = parseInt(storedPage, 10);
      console.log("СТОРІНКА.....", Page);
      GetAllManager();
    } else {
      GetAllManager({});
    }
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

  const addManager = async (data) => {
    try {
      console.log("Add Regions Row.......", data);
      const response = await axios.post(
        SERVER_URL + "Region/RegionalManager",
        data,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        // const responseData = response.data; // Отримуємо дані відповіді
        // const usersData = responseData.users;
        // Обробка успішної відповіді
        console.log("Created new Region.....OK......!");
        const confirmServer = response.data.messages;
        return { success: true, message: confirmServer };
        // return usersData;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
      const errorServer = error.response.data.messages;
      return { success: false, error: errorServer };
    }
  };

  const AddedRegionWidow = () => {
    setShowAddedManagerModal(true);
  };

  //   const editRegion = async (data) => {

  //   };

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
                  {!selectedManager ? (
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
                  )}
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
                      // onClick={openEditModalForSelectedUser}
                      className="btnAfter768"
                    ></img>
                  )}
                </div>

                {/* =======================Вікно Додавання Регіону========================== */}

                <Modal
                  show={showAddedManagerModal}
                  onHide={() => setShowAddedManagerModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Додавання Менеджер\Регіон</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      onSubmit={handleSubmit(onSubmit)}
                      className="form_EditForAdmin"
                    >
                      <Form.Group className="mb-2" controlId="formBasicAddUser">
                        <Form.Control
                          type="text"
                          placeholder="Код регіону"
                          {...register("regionCode", {
                            required: false,
                            // validate: (value) => loginCheck(value),
                          })}
                        />
                        {errors.regionCode && (
                          <Form.Text className="text-danger">
                            Код має містити тільки цифри, не більше 6.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="formBasicName">
                        <Form.Control
                          type="text"
                          placeholder="Назва регіону"
                          {...register("regionName", {
                            required: false,
                            // validate: (value) => nameCheck(value),
                          })}
                        />
                        {errors.regionName && (
                          <Form.Text className="text-danger">
                            Назва має містити мінімум дві літери, з першою
                            великою і рештою малих літер.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="formBasicSurname">
                        <Form.Control
                          type="text"
                          placeholder="Примітки"
                          {...register("regionNote", {
                            required: false,
                            // validate: (value) => surNameCheck(value),
                          })}
                        />
                      </Form.Group>
                      {/* <span className="confirmEdit">{serverAnswer}</span> */}
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="addFormBtns">
                      <button
                        type="submit"
                        className="btn btn-primary modalSendForm me-2"
                        onClick={handleSubmit(addManager)}
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

export default RegionalManagerComp;
