import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { phoneCheck } from "../pattern/allPattern";
import { nameCheck } from "../pattern/allPattern";
import { surNameCheck } from "../pattern/allPattern";
import { emailCheck } from "../pattern/allPattern";
import loading from "../images/loading.gif";
import axios from "axios";
import SERVER_URL from "../helpers/Config";
import authHeader from "../helpers/auth-header";

function ContactsEdit(props) {
  const [Regions, setRegions] = useState([]);
  const [ContactGroups, setContactGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [adressIndicator, setAdressIndicator] = useState(false);
  const [numberIndicator, setNumberIndicator] = useState(false);
  const submitEditButtonRef = props.submitEditButtonRef;
  const contactValue = props.selectedContactValue;
  console.log("props region VALUE", contactValue);
  const [serverAnswer, setserverAnswer] = useState();

  const closeModalError = () => {
    setModalError(false);
    setAdressIndicator(false);
    setNumberIndicator(false);
  };

  const adressError = "Перевірте обов'язкові поля на вкладці 'Адреса'";
  const numberError =
    "Перевірте обов'язкові поля на вкладці 'Телефон та пошта'";


    const [emails, setEmails] = useState([]);

    const addEmailRow = () => {
      const newEmails = [...emails, { email: "" }];
      setEmails(newEmails);
    };
    const removeEmailRow = (index) => {
      const arrayTest = [{email : "1"}, {email : "2"}, {email : "3"}, {email : "4"}];
      console.log("array before", arrayTest);
      arrayTest.splice(index, 1);
      console.log("array after", arrayTest);
      if (emails.length > 1) {
        const newEmails = [...emails];
        newEmails.splice(index, 1);
        setEmails(newEmails);
      }
      
    };

  const [phones, setPhones] = useState([{ phone: "" }]);

  const addPhoneRow = () => {
    const newPhones = [...phones, { phone: "" }];
    setPhones(newPhones);
  };
  const removePhoneRow = (index) => {
    if (phones.length > 1) {
      const newPhones = [...phones];
      newPhones.splice(index, 1);
      setPhones(newPhones);
    }
  };

  const [showMailPhone, setShowMailPhone] = useState(true);
  const [showAdress, setShowAdress] = useState(false);
  const [moreInfo, setShowMoreInfo] = useState(false);

  const clickShowMailPhone = () => {
    setShowMailPhone(true);
    setShowAdress(false);
    setShowMoreInfo(false);
  };
  const clickShowAdress = () => {
    setShowAdress(true);
    setShowMailPhone(false);
    setShowMoreInfo(false);
  };
  const clickShowMoreInfo = () => {
    setShowMoreInfo(true);
    setShowAdress(false);
    setShowMailPhone(false);
  };

  useEffect(() => {
    GetAllRegionsId();
    // GetAllUsersId();
    GetAllContactGroupId();
  }, []);

  const editContact = async (data) => {
    try {
      console.log("Edit Contact Row.......", data);
      const response = await axios.put(
        SERVER_URL + `Contact/Contact?contactId=${data.id}`,
        data,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("RESPONSE DATA:", response);
      if (response.status === 200) {
        console.log("Edit Contact.....OK......!");
        const confirmServer = response.data.statusText;
        props.closeModal();
        return { success: true, message: confirmServer };
        // return usersData;
      }
    } catch (error) {
      console.error("Not answer:", error.response.data.statusText);
      const errorServer = error.response.data.statusText;
      return { success: false, error: errorServer };
    }
  };

  const GetAllRegionsId = async () => {
    try {
      const response = await axios.get(
        SERVER_URL + `Region/Region/All?PageSize=${5000}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful regionsAll:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const Regiones = responseData.entries;
        // console.log("Successful regionsAll:", Regiones);
        setRegions(Regiones);

        return Regions;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  // const GetAllUsersId = async () => {
  //   try {
  //     const response = await axios.get(
  //       SERVER_URL + `User/all?PageSize=${5000}`,
  //       {
  //         // params: data,
  //         headers: authHeader(),
  //       }
  //     );
  //     console.log("Successful UsersAll response:", response);
  //     // Перевіряємо статус відповіді
  //     if (response.status === 200) {
  //       const responseData = response.data; // Отримуємо дані відповіді
  //       const usersData = responseData.users;
  //       setUsers(usersData);
  //       console.log("Successful UsersAll data:", usersData);

  //       return Regions;
  //     } else {
  //       throw new Error("Failed data");
  //     }
  //   } catch (error) {
  //     // Обробка помилки
  //     console.error("Not answer:", error);
  //   }
  // };

  const GetAllContactGroupId = async () => {
    try {
      const response = await axios.get(
        SERVER_URL + `Contact/ContactGroup/All?PageSize=${5000}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful ContactGroupAll response:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const ContactGroup = responseData.entries;
        setContactGroups(ContactGroup);
        console.log("Successful ContactGroupAll data:", ContactGroup);

        return Regions;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Формуємо масив об'єктів `contactEmail та contactPhones` зі станів

    if (!data[`contactEmailRow${0}`] || !data[`contactPhoneRow${0}`]) {
      setModalError(true);
      setNumberIndicator(true);
      // alert("Заповніть обов'язкові поля на вкладці 'Телефон та пошта'");
      return;
    }

    const contactEmails = emails.map((email, index) => ({
      [`email`]: data[`contactEmailRow${index}`],
      [`isMain`]: data[`isMain${index}`],
    }));

    for (let i = 0; i <= emails.length; i++) {
      delete data[`contactEmailRow${i}`];
      delete data[`isMain${i}`];
    }
    data.contactEmails = contactEmails;

    const contactPhones = phones.map((phone, index) => ({
      [`phone`]: data[`contactPhoneRow${index}`],
      [`isMain`]: data[`isMainPhone${index}`],
      [`isViber`]: data[`isViberNumb${index}`],
      [`isTelegram`]: data[`isTelegramNumb${index}`],
      [`phoneType`]: parseInt(data[`phoneType${index}`], 10),
    }));

    for (let i = 0; i <= phones.length; i++) {
      delete data[`contactPhoneRow${i}`];
      delete data[`isMainPhone${i}`];
      delete data[`isViberNumb${i}`];
      delete data[`isTelegramNumb${i}`];
      delete data[`phoneType${i}`];
    }
    data.contactPhones = contactPhones;
    console.log("Тип змінної", typeof contactPhones[0].phoneType);

    // =============================================Створюю масив адрес=======================

    const contactAddresses = [];

    for (let i = 1; i <= 4; i++) {
      // є 4 групи адрес, проходимо по їх ідентифікаторах
      const addressData = {
        addressType: parseInt(data[`addressType${i}`], 10), // Отримуємо тип адреси
        address: data[`contactAdressRow${i}`], // Отримуємо адресу
        zip: data[`contactZipRow${i}`], // Отримуємо поштовий код
        country: data[`contactCountryRow${i}`], // Отримуємо країну
      };

      if (
        !data[`contactAdressRow${1}`] ||
        !data[`contactZipRow${1}`] ||
        !data[`contactCountryRow${1}`]
      ) {
        setModalError(true);
        setAdressIndicator(true);
        // alert("Заповніть обов'язкові поля на вкладці 'Адреса'");
        return;
      }

      if (addressData.address && addressData.zip && addressData.country) {
        contactAddresses.push(addressData);
      }
    }
    for (let i = 0; i <= 4; i++) {
      delete data[`addressType${i}`];
      delete data[`contactAdressRow${i}`];
      delete data[`contactZipRow${i}`];
      delete data[`contactCountryRow${i}`];
    }

    data.contactAddresses = contactAddresses;

    console.log("Дані надіслано...   ", data);
    const result = await editContact(data);
    console.log(result);
    if (result.success) {
      if (result.success !== true) {
        setserverAnswer(result.error);
        return;
      }
      setserverAnswer(result.message);
    } else {
      setserverAnswer(result.error);
    }
  };

  return (
    <div className="App">
      <Container>
        <Row className="">
          <Col className="wrapperEditForm px-0 mb-1">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="form_EditForAdmin"
            >
              {/* =================================Modal Error===================================== */}

              <Modal
                show={modalError}
                onHide={closeModalError}
                backdrop="static"
                keyboard={false}
                className="bg-dark"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Помилка заповнення форми</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {adressIndicator ? adressError : ""}
                  {numberIndicator ? numberError : ""}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModalError}>
                    Зрозуміло
                  </Button>
                </Modal.Footer>
              </Modal>
              <Form.Group className="mb-2" controlId="formBasicEditId">
                <Form.Control
                  type="text"
                  value={contactValue.id}
                  hidden
                  {...register("id", {
                    required: false,
                    // validate: (value) => nameCheck(value),
                  })}
                />
              </Form.Group>
              <div className="headFormContactAdd">
                <div className="w-50 me-2">
                  <Form.Group className="mb-2" controlId="formBasicAddSurname">
                    <Form.Control
                      type="text"
                      placeholder="Прізвище *"
                      defaultValue={contactValue.contactF}
                      {...register("contactI", {
                        required: true,
                        validate: (value) => surNameCheck(value),
                      })}
                    />
                    {errors.contactI && (
                      <Form.Text className="text-danger">
                        Код має містити тільки цифри, не більше 6.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formBasicAddName">
                    <Form.Control
                      type="text"
                      placeholder="Ім'я *"
                      defaultValue={contactValue.contactI}
                      {...register("contactF", {
                        required: true,
                        validate: (value) => nameCheck(value),
                      })}
                    />
                    {errors.contactF && (
                      <Form.Text className="text-danger">
                        Код має містити тільки цифри, не більше 6.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formBasicAddSurname2">
                    <Form.Control
                      type="text"
                      placeholder="По-батькові"
                      defaultValue={contactValue.contactO}
                      {...register("contactO", {
                        required: false,
                        validate: (value) => surNameCheck(value),
                      })}
                    />
                    {errors.contactO && (
                      <Form.Text className="text-danger">
                        Код має містити тільки цифри, не більше 6.
                      </Form.Text>
                    )}
                  </Form.Group>
                </div>
                <div className="w-50">
                  <Form.Group className="mb-2" controlId="formBasicAddCode">
                    <Form.Control
                      type="text"
                      placeholder="Код контакту"
                      defaultValue={contactValue.contactCode}
                      {...register("contactCode", {
                        required: false,
                        // validate: (value) => nameCheck(value),
                      })}
                    />
                    {errors.contactCode && (
                      <Form.Text className="text-danger">
                        Код має містити тільки цифри, не більше 6.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formBasicAddregionId" className="mb-2">
                    {/* <Form.Label>Оберіть регіон *</Form.Label> */}
                    <Form.Select
                      {...register("regionId", {
                        required: true,
                      })}
                    >
                      <option
                        selected
                        value={contactValue.region.id}
                        className="text-secondary small"
                      >
                        {contactValue.region.name}
                      </option>
                      {Regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.regionName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="formBasicAddcontactGroupId">
                    {/* <Form.Label>Оберіть контактну групу *</Form.Label> */}
                    <Form.Select
                      className="selectGroup"
                      {...register("contactGroupId", {
                        required: true,
                      })}
                    >
                      <option
                        selected
                        value={contactValue.contactGroup.id}
                        className="text-secondary small"
                      >
                        {contactValue.contactGroup.name}
                      </option>
                      {ContactGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.groupName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              <div className="selectBtnShowMenu">
                <span
                  className={`btnShowContactAdd ${
                    showMailPhone ? "btnShowPhoneMail" : ""
                  }`}
                  onClick={clickShowMailPhone}
                >
                  Телефон та пошта
                </span>
                <span
                  className={`btnShowContactAdd ${
                    showAdress ? "btnShowAdress" : ""
                  }`}
                  onClick={clickShowAdress}
                >
                  Адреса
                </span>
                <span
                  className={`btnShowContactAdd ${
                    moreInfo ? "btnShowMoreInfo" : ""
                  }`}
                  onClick={clickShowMoreInfo}
                >
                  Додаткова інформація
                </span>
              </div>
              {/* ===========================================Пошти================================================== */}
              {showMailPhone && (
                <div className="numberMailFormContact">
                  <div className="wrapperEmailLayer">
                    {emails.map((email, index) => (
                      <div key={index} className="d-flex w-100">
                        <Form.Group
                          className="mb-2 w-100 emailAddContact"
                          controlId={`formBasicEmail${index}`}
                        >
                          <Form.Control
                            type="text"
                            defaultValue={
                              contactValue.contactEmails &&
                              contactValue.contactEmails.length > 0
                                ? contactValue.contactEmails[index]?.email : ""}
                            placeholder={
                              index > 0
                                ? "Додатковий Email"
                                : "Email * (основний)"
                            }
                            {...register(`contactEmailRow${index}`, {
                              required: index === 0, // Перше поле email обов'язкове
                              validate: (value) => emailCheck(value),
                            })}
                          />
                          {errors[`contactEmailRow${index}`] && (
                            <Form.Text className="text-danger">
                              Назва має містити мінімум дві літери, з першою
                              великою і рештою малих літер.
                            </Form.Text>
                          )}
                          <Form.Check
                            type="checkbox"
                            hidden
                            checked={index === 0 ? true : false}
                            {...register(`isMain${index}`, {})}
                          />
                          {index > 0 && (
                            <span
                              className="removeEmail"
                              onClick={() => removeEmailRow(index)}
                            >
                              X
                            </span>
                          )}
                        </Form.Group>
                      </div>
                    ))}
                    <span className="addEmail" onClick={addEmailRow}>
                      Додатковий
                    </span>
                  </div>
                  {/* ===========================================Телефони================================================== */}
                  <div className="wrapperPhoneLayer">
                    {phones.map((phone, index) => (
                      <div key={index} className="d-flex">
                        <Form.Group
                          className="mb-2 w-100 phoneAddContact"
                          controlId={`formBasicNumber${index}`}
                        >
                          <Form.Control
                            className="w-25 me-2"
                            type="text"
                            placeholder={
                              index === 0
                                ? "Телефон * (основний)"
                                : "Додатковий телефон"
                            }
                            {...register(`contactPhoneRow${index}`, {
                              required: true,
                              validate: (value) => phoneCheck(value),
                            })}
                          />
                          {errors[`contactPhoneRow${index}`] && (
                            <Form.Text className="text-danger">
                              Назва має містити мінімум дві літери, з першою
                              великою і рештою малих літер.
                            </Form.Text>
                          )}
                          <Form.Check
                            type="checkbox"
                            hidden
                            checked={index === 0 ? true : false}
                            {...register(`isMainPhone${index}`, {})}
                          />
                          <div className="d-flex">
                            <Form.Select
                              className="w-100 me-2"
                              {...register(`phoneType${index}`, {
                                required: true,
                              })}
                            >
                              <option value=""></option>
                              <option value={0} selected>
                                Мобільний
                              </option>
                              <option value={1}>Домашній</option>
                              <option value={2}>Робочий</option>
                            </Form.Select>
                            <div className="viberTelegramBox">
                              <Form.Check
                                type="checkbox"
                                label="Viber"
                                {...register(`isViberNumb${index}`, {})}
                              />
                              <Form.Check
                                type="checkbox"
                                label="Telegram"
                                {...register(`isTelegramNumb${index}`, {})}
                                bsSize="sm"
                              />
                            </div>
                          </div>
                          {index > 0 && (
                            <span
                              className="removeEmail"
                              onClick={() => removePhoneRow(index)}
                            >
                              X
                            </span>
                          )}
                        </Form.Group>
                      </div>
                    ))}
                    <span className="addEmail" onClick={addPhoneRow}>
                      Додатковий
                    </span>
                  </div>
                </div>
              )}

              {/* =========================================Adress Block================================================ */}

              {showAdress && (
                <div className="adressAddBlock">
                  <Form.Group>
                    <Form.Control
                      className="mb-1"
                      type="text"
                      hidden
                      {...register(`contactAddresses`, {
                        required: false,
                      })}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-2 w-100 AdressAddContact"
                    controlId="formBasicAdress1"
                  >
                    <Form.Label>Адреса прописки *</Form.Label>
                    <Form.Control
                      className="mb-1"
                      type="text"
                      placeholder="Кривий Ріг, Орджонікідзе, 5/65"
                      {...register(`contactAdressRow1`, {
                        required: true, // Перше поле email обов'язкове
                        validate: (value) => nameCheck(value),
                      })}
                    />
                    <div className=" d-flex">
                      <Form.Control
                        className="me-1"
                        type="text"
                        placeholder="Поштовий код"
                        {...register(`contactZipRow1`, {
                          required: true, // Перше поле email обов'язкове
                          // validate: (value) => nameCheck(value),
                        })}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Країна"
                        {...register(`contactCountryRow1`, {
                          required: true, // Перше поле email обов'язкове
                          validate: (value) => nameCheck(value),
                        })}
                      />
                      <Form.Control
                        type="text"
                        value="0"
                        hidden
                        {...register(`addressType1`, {
                          required: true,
                        })}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-2 w-100 AdressAddContact"
                    controlId="formBasicAdress2"
                  >
                    <Form.Label>Адреса проживання</Form.Label>
                    <Form.Control
                      className="mb-1"
                      type="text"
                      placeholder="Кривий Ріг, Орджонікідзе, 5/65"
                      {...register(`contactAdressRow2`, {
                        required: false, // Перше поле email обов'язкове
                        validate: (value) => nameCheck(value),
                      })}
                    />
                    <div className=" d-flex">
                      <Form.Control
                        className="me-1"
                        type="text"
                        placeholder="Поштовий код"
                        {...register(`contactZipRow2`, {
                          required: false, // Перше поле email обов'язкове
                          // validate: (value) => nameCheck(value),
                        })}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Країна"
                        {...register(`contactCountryRow2`, {
                          required: false, // Перше поле email обов'язкове
                          validate: (value) => nameCheck(value),
                        })}
                      />
                      <Form.Control
                        type="text"
                        value="1"
                        hidden
                        {...register(`addressType2`, {
                          required: true,
                        })}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-2 w-100 AdressAddContact"
                    controlId="formBasicAdress3"
                  >
                    <Form.Label>Робоча адреса</Form.Label>
                    <Form.Control
                      className="mb-1"
                      type="text"
                      placeholder="Кривий Ріг, Орджонікідзе, 5/65"
                      {...register(`contactAdressRow3`, {
                        required: false, // Перше поле email обов'язкове
                        validate: (value) => nameCheck(value),
                      })}
                    />
                    <div className=" d-flex">
                      <Form.Control
                        className="me-1"
                        type="text"
                        placeholder="Поштовий код"
                        {...register(`contactZipRow3`, {
                          required: false, // Перше поле email обов'язкове
                          validate: (value) => nameCheck(value),
                        })}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Країна"
                        {...register(`contactCountryRow3`, {
                          required: false, // Перше поле email обов'язкове
                          validate: (value) => nameCheck(value),
                        })}
                      />
                      <Form.Control
                        type="text"
                        value="2"
                        hidden
                        {...register(`addressType3`, {
                          required: true,
                        })}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-2 w-100 AdressAddContact"
                    controlId="formBasicAdress4"
                  >
                    <Form.Label>Адреса інформування</Form.Label>
                    <Form.Control
                      className="mb-1"
                      type="text"
                      placeholder="Кривий Ріг, Орджонікідзе, 5/65"
                      {...register(`contactAdressRow4`, {
                        required: false, // Перше поле email обов'язкове
                        validate: (value) => nameCheck(value),
                      })}
                    />
                    <div className=" d-flex">
                      <Form.Control
                        className="me-1"
                        type="text"
                        placeholder="Поштовий код"
                        {...register(`contactZipRow4`, {
                          required: false, // Перше поле email обов'язкове
                          validate: (value) => nameCheck(value),
                        })}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Країна"
                        {...register(`contactCountryRow4`, {
                          required: false, // Перше поле email обов'язкове
                          validate: (value) => nameCheck(value),
                        })}
                      />
                      <Form.Control
                        type="text"
                        value="3"
                        hidden
                        {...register(`addressType4`, {
                          required: true,
                        })}
                      />
                    </div>
                  </Form.Group>
                </div>
              )}
              <span className="confirmEdit">{serverAnswer}</span>
              <Button
                type="submit"
                id="submitNewDataBtn"
                ref={submitEditButtonRef}
              ></Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactsEdit;
