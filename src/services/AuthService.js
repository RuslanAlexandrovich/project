import axios from "axios";
import isTokenValid from "../tokenTime/tokenValidTime";
import SERVER_URL from "../helpers/Config";
import parseJWT from "../helpers/JWTService";
import respStatus from "../helpers/responseStatus";

class AuthService {
  logout = () => {
    localStorage.removeItem("token");
  };

  login = async (data, errorCallback) => {
    try {
      const response = await axios.post(SERVER_URL + "Account/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      if (isTokenValid() && respStatus(response)) {
        let userdata = parseJWT(token);
        console.log("userdata", userdata);
        console.log("token ok!");
        console.log(token);
        window.location.href = "/";
      } else {
        console.log("token undefined or token time off!");
        this.logout();
      }
      // Збереження токену в локальному сховищі
    } catch (error) {
      if (error.response) {
        // Якщо є відповідь від сервера (помилка з сервера)
        const errorMessage = error.response.data.message;
        console.error("Помилка, відповідь сервера:", errorMessage);
        errorCallback(errorMessage);

        // Тут ви можете використовувати `errorMessage` на ваш вибір
      } else {
        // Якщо немає відповіді від сервера (помилка мережі або інша помилка)
        console.error("Помилка:", error.message);
      }
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

  register = async (data, errorCallback) => {
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
      if (error.response) {
        // Якщо є відповідь від сервера (помилка з сервера)
        const errorMessage = error.response.data.message;
        console.error("Помилка, відповідь сервера:", errorMessage);
        errorCallback(errorMessage);

        // Тут ви можете використовувати `errorMessage` на ваш вибір
      } else {
        // Якщо немає відповіді від сервера (помилка мережі або інша помилка)
        console.error("Помилка:", error.message);
      }
      // Обробка помилки
      console.error("Registration error:", error);
    }
  };
}

export default new AuthService();
