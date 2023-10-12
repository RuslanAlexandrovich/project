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

  useEffect(() => {
    GetAllRegionsId();
    GetAllUsersId();
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
      console.error("Not answer:", error.response.data.errors.RegionCode[0]);
      const errorServer = error.response.data.errors.RegionCode[0];
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

  const GetAllUsersId = async () => {
    try {
      const response = await axios.get(
        SERVER_URL + `User/all?PageSize=${5000}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      console.log("Successful UsersAll response:", response);
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const usersData = responseData.users;
        setUsers(usersData);
        console.log("Successful UsersAll data:", usersData);

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
      <Container>
        <Row className="">
          <Col className="wrapperEditForm px-0 mb-1">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="form_EditForAdmin"
            >
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
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Email *"
                  {...register("contactEmail", {
                    required: true,
                    validate: (value) => emailCheck(value),
                  })}
                />
                {errors.contactEmail && (
                  <Form.Text className="text-danger">
                    Назва має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicNumber">
                <Form.Control
                  type="text"
                  placeholder="Телефон *"
                  {...register("contactPhone", {
                    required: true,
                    validate: (value) => phoneCheck(value),
                  })}
                />
                {errors.contactPhone && (
                  <Form.Text className="text-danger">
                    Назва має містити мінімум дві літери, з першою великою і
                    рештою малих літер.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="formBasicAddregionId">
                <Form.Label>Оберіть регіон *</Form.Label>
                <Form.Select
                  {...register("regionId", {
                    required: true,
                  })}
                >
                  {Regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.regionName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formBasicAdduserId">
                <Form.Label>Оберіть користувача *</Form.Label>
                <Form.Select
                  {...register("userId", {
                    required: true,
                  })}
                >
                  {Users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
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
                  {ContactGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.groupName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
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
