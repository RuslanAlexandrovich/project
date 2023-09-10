import axios from "axios";

import parseJWT from "../helpers/JWTService";
const SERVER_URL = "http://kab.testkai.tk/api/";

class AuthService {
  logout = () => {
    localStorage.removeItem("token");
  };

  login = async (data) => {
    try {
      const response = await axios.post(SERVER_URL + "Account/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      if (token) {
        let userdata = parseJWT(token);

        console.log("userdata", userdata);
        console.log("token ok!");
        console.log(token);
      } else {
        console.log("token undefined!");
      }
      // Збереження токену в локальному сховищі
    } catch (error) {
      console.error("Login error:", error);
    }
    console.log(data);
  };

  userConfirm = async (data) => {
    try {
      const response = await axios.post(SERVER_URL + "Account/confirm", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = response.data.token;

      if (token) {
        let userdata = parseJWT(token);
        console.log(userdata);
        console.log("token ok!");
        localStorage.setItem("token", token);
        console.log(token);
        window.location.href = "/aboutuser"; // Перезавантажити сторінку тільки в разі успіху
        return userdata;
      } else {
        console.log("token undefined!");
        return null;
      }
      // Збереження токену в локальному сховищі
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
    //console.log(data);
  };

  register = async (data) => {
    try {
      const response = await axios.post(
        SERVER_URL + "Account/register",
        data, // Відправляємо дані без JSON.stringify
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        const responseData = response.data; // Отримуємо дані відповіді
        // Обробка успішної відповіді
        console.log("Registration successful:", responseData);
        window.location.href = "/"; // Перезавантажити сторінку тільки в разі успіху
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Registration error:", error);
    }
  };
}

export default new AuthService();
