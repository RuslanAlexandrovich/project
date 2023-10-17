import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, useEffect } from "react";
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

function ContactsAdd(props) {
  const [Regions, setRegions] = useState([]);
  const [Users, setUsers] = useState([]);
  const [ContactGroups, setContactGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const submitAddButtonRef = props.submitAddButtonRef;
  // const closeModal = props.onCloseModal;

  const [serverAnswer, setserverAnswer] = useState();

  const [emails, setEmails] = useState([{ email: "" }]);

  const addEmailRow = () => {
    const newEmails = [...emails, { email: "" }];
    setEmails(newEmails);
  };
  const removeEmailRow = (index) => {
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

  const [adress, setAdress] = useState([{ adress: "" }]);

  const addAdress = () => {
    const newAdress = [...adress, { adress: "" }];
    setAdress(newAdress);
  };
  const removeAdress = (index) => {
    if (adress.length > 1) {
      const newAdress = [...adress];
      newAdress.splice(index, 1);
      setAdress(newAdress);
    }
  };

  // ==========================================Кнопки вкладок додавання контакту=======================

  const [showMailPhone, setShowMailPhone]= useState(true);
  const [showAdress, setShowAdress]= useState(false);
  const [moreInfo, setShowMoreInfo]= useState(false);

  const clickShowMailPhone = ()=>{
    setShowMailPhone(true);
    setShowAdress(false);
    setShowMoreInfo(false);
  }
  const clickShowAdress = ()=>{
    setShowAdress(true);
    setShowMailPhone(false);
    setShowMoreInfo(false);
  }
  const clickShowMoreInfo = ()=>{
    setShowMoreInfo(true);
    setShowAdress(false);
    setShowMailPhone(false);
  }


  useEffect(() => {
    GetAllRegionsId();
    // GetAllUsersId();
    GetAllContactGroupId();
  }, []);

  //   const [showPassword, setShowPassword] = useState(false);

  const addContact = async (data) => {
    try {
      console.log("Add Contact Row.......", data);
      const response = await axios.post(SERVER_URL + "Contact/Contact", data, {
        // params: data,
        headers: authHeader(),
      });
      console.log("RESPONSE DATA:", response);
      if (response.status === 200) {
        console.log("Created new Contact.....OK......!");
        const confirmServer = response.data.messages;
        props.closeModal();
        return { success: true, message: confirmServer };
        // return usersData;
      }
    } catch (error) {
      console.error("Not answer:", error.response.statusText);
      const errorServer = error.response.statusText;
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
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    
    // Формуємо масив об'єктів `contactEmail та contactPhones` зі станів

    const contactEmails = emails.map((email, index) => ({
      [`email`]: data[`contactEmailRow${index}`],
    }));

    for (let i = 0; i <= emails.length; i++) {
      delete data[`contactEmailRow${i}`];
    }
    data.contactEmails = contactEmails;

    const contactPhones = phones.map((phone, index) => ({
      [`phone`]: data[`contactPhoneRow${index}`],
    }));

    for (let i = 0; i <= phones.length; i++) {
      delete data[`contactPhoneRow${i}`];
    }
    data.contactPhones = contactPhones;

// =============================================Створюю масив адрес=======================

    const contactAddresses = [];

  for (let i = 1; i <= 4; i++) { // є 4 групи адрес, проходимо по їх ідентифікаторах
    const addressData = {
      addressType: data[`addressType${i}`], // Отримуємо тип адреси
      address: data[`contactAdressRow${i}`], // Отримуємо адресу
      zip: data[`contactZipRow${i}`], // Отримуємо поштовий код
      country: data[`contactCountryRow${i}`], // Отримуємо країну
    };

    contactAddresses.push(addressData);
  }
  for (let i = 0; i <= 4; i++) {
    delete data[`addressType${i}`];
    delete data[`contactAdressRow${i}`];
    delete data[`contactZipRow${i}`];
    delete data[`contactCountryRow${i}`];
  }

  data.contactAddresses = contactAddresses;

    console.log("Дані надіслано...   ", data);
    const result = await addContact(data);
    console.log(result);
    if (result.success) {
      if (result.success !== true) {
        setserverAnswer(result.error);
        return;
      }
      // console.log("Отримані дані від сервера:", result.data.message);
      setserverAnswer(result.message);
      // setTimeout(() => window.location.reload(), 1500);
    } else {
      // Обробка помилки
      // console.error("Помилка:", result.error);
      setserverAnswer(result.error);
    }
  };

  return (
    <div className="App">
      <Container fluid className="">
        <Row className="">
          <Col className="wrapperEditForm px-0 mb-1">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="form_EditForAdmin contactsAddFormMain"
            >
              <div className="headFormContactAdd">
                <div className="w-50 me-2">
              <Form.Group className="mb-2" controlId="formBasicAddCode">
                <Form.Control
                  type="text"
                  placeholder="Код контакту"
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
              <Form.Group className="mb-2" controlId="formBasicAddName">
                <Form.Control
                  type="text"
                  placeholder="Ім'я"
                  {...register("contactF", {
                    required: false,
                    validate: (value) => nameCheck(value),
                  })}
                />
                {errors.contactF && (
                  <Form.Text className="text-danger">
                    Код має містити тільки цифри, не більше 6.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicAddSurname">
                <Form.Control
                  type="text"
                  placeholder="Прізвище"
                  {...register("contactI", {
                    required: false,
                    validate: (value) => surNameCheck(value),
                  })}
                />
                {errors.contactI && (
                  <Form.Text className="text-danger">
                    Код має містити тільки цифри, не більше 6.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicAddSurname2">
                <Form.Control
                  type="text"
                  placeholder="По-батькові"
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
              <Form.Group controlId="formBasicAddregionId" className="mb-2">
                <Form.Label>Оберіть регіон *</Form.Label>
                <Form.Select
                  {...register("regionId", {
                    required: true,
                  })}
                >
                  <option value=""></option>
                  {Regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.regionName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formBasicAddcontactGroupId">
                <Form.Label>Оберіть контактну групу *</Form.Label>
                <Form.Select
                  {...register("contactGroupId", {
                    required: true,
                  })}
                >
                  <option value=""></option>
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
              <span className={`btnShowContactAdd ${showMailPhone ? 'btnShowPhoneMail' : ''}`} onClick={clickShowMailPhone}>Телефон та пошта</span>
                <span className={`btnShowContactAdd ${showAdress ? 'btnShowAdress' : ''}`} onClick={clickShowAdress}>Адреса</span>
                <span className={`btnShowContactAdd ${moreInfo ? 'btnShowMoreInfo' : ''}`} onClick={clickShowMoreInfo}>Додаткова інформація</span>
              </div>

              {showMailPhone && <div className="numberMailFormContact">
              <div className="wrapperEmailLayer">
              {emails.map((email, index) => (
                
                <div key={index} className="d-flex w-100">
                  <Form.Group
                    className="mb-2 w-100 emailAddContact"
                    controlId={`formBasicEmail${index}`}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Email *"
                      {...register(`contactEmailRow${index}`, {
                        required: index === 0, // Перше поле email обов'язкове
                        validate: (value) => emailCheck(value),
                      })}
                    />
                    {errors[`contactEmailRow${index}`] && (
                      <Form.Text className="text-danger">
                        Назва має містити мінімум дві літери, з першою великою і
                        рештою малих літер.
                      </Form.Text>
                    )}
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

              <div className="wrapperPhoneLayer">

              {phones.map((phone, index) => (
                <div key={index} className="d-flex">
                  <Form.Group
                    className="mb-2 w-100 phoneAddContact"
                    controlId={`formBasicNumber${index}`}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Телефон *"
                      {...register(`contactPhoneRow${index}`, {
                        required: true,
                        validate: (value) => phoneCheck(value),
                      })}
                    />
                    {errors[`contactPhoneRow${index}`] && (
                      <Form.Text className="text-danger">
                        Назва має містити мінімум дві літери, з першою великою і
                        рештою малих літер.
                      </Form.Text>
                    )}
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
              }
              

              {showAdress && <div className="adressAddBlock">
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
                        validate: (value) => nameCheck(value),
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
                        validate: (value) => nameCheck(value),
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
                </div>}
              <span className="confirmEdit">{serverAnswer}</span>
              <Button
                type="submit"
                id="submitNewDataBtn"
                ref={submitAddButtonRef}
              ></Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactsAdd;