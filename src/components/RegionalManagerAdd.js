import "../App.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import loading from "../images/loading.gif";
import axios from "axios";
import SERVER_URL from "../helpers/Config";
import authHeader from "../helpers/auth-header";

function RegionalManagerAdd(props) {
  const [isLoading, setIsLoading] = useState(false);
  const submitAddButtonRef = props.submitAddButtonRef;

  const [serverAnswer, setserverAnswer] = useState();
  const [Regions, setRegions] = useState([]);
  const [Managers, setManagers] = useState([]);

  useEffect(() => {
    allRegionId();
    allManagerId();
  }, []);

  const allRegionId = async () => {
    try {
      const response = await axios.get(
        SERVER_URL + `Region/Region/All?PageSize=${100}`,
        {
          headers: authHeader(),
        }
      );
      if (response.status === 200) {
        const regions = response.data.entries;
        console.log("RegionsIDOBJECT", regions);
        setRegions(regions);
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      console.error("Not answer:", error);
    }
  };

  const allManagerId = async () => {
    try {
      const response = await axios.get(
        SERVER_URL + `Region/Manager/All?PageSize=${100}`,
        {
          headers: authHeader(),
        }
      );
      if (response.status === 200) {
        const managers = response.data.entries;
        console.log("ManagerIDOBJECT", managers);
        setManagers(managers);
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      console.error("Not answer:", error);
    }
  };

  const addManager = async (data) => {
    try {
      console.log("Add Regions Row.......", data);
      const response = await axios.post(
        SERVER_URL + `Region/RegionalManager`,
        data,
        {
          headers: authHeader(),
        }
      );
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        console.log("Created new RegionalManager.....OK......!");
        const confirmServer = response.data.messages;
        props.closeModal();
        return { success: true, message: confirmServer };
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await addManager(data);
    console.log(result);
    if (result.success) {
      if (result.success !== true) {
        setserverAnswer(result.error);
        return;
      }
      // console.log("Отримані дані від сервера:", result.data.message);
      setserverAnswer(result.message);
      console.log("Дані надіслано...   ", data);
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
              <Form.Group controlId="formBasicAddRegionId">
                <Form.Label>Оберіть регіон</Form.Label>
                <Form.Select
                  {...register("regionId", {
                    required: false,
                  })}
                >
                  {Regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.regionName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formBasicAddRegionalManagerId">
                <Form.Label>Оберіть менеджера</Form.Label>
                <Form.Select
                  {...register("userId", {
                    required: false,
                  })}
                >
                  {Managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name}
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

export default RegionalManagerAdd;
