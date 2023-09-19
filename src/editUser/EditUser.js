import axios from "axios";
import authHeader from "../helpers/auth-header";
import SERVER_URL from "../helpers/Config";

class EditUser {
  EditUserName = async (data) => {
    try {
      let userName = data.login;
      console.log(userName);
      const token = localStorage.getItem("token"); // Отримати токен з локального сховища
      if (!token) {
        // Перевірити, чи токен доступний
        throw new Error("No token available");
      }

      const response = await axios.put(
        SERVER_URL + `User/user_login/${userName}`,
        { userName },
        {
          headers: authHeader(),
        }
      );

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        // Обробка успішної відповіді
        console.log("Логін змінено!");
      } else {
        throw new Error("Зміна логіну користувача не вдалася");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Помилка зміни логіну користувача", error);
    }
  };

  EditName = async (data) => {
    try {
      let Name = data.name;
      console.log(Name);
      const token = localStorage.getItem("token"); // Отримати токен з локального сховища
      if (!token) {
        // Перевірити, чи токен доступний
        throw new Error("No token available");
      }

      const response = await axios.put(
        SERVER_URL + `User/user_name/${Name}`,
        { Name },
        {
          headers: authHeader(),
        }
      );

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        // Обробка успішної відповіді
        console.log("Ім'я змінено!");
      } else {
        throw new Error("Зміна імені користувача не вдалася");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Помилка зміни імені користувача", error);
    }
  };

  EditSurName = async (data) => {
    try {
      let surname = data.surname;
      console.log(surname);
      const token = localStorage.getItem("token"); // Отримати токен з локального сховища
      if (!token) {
        // Перевірити, чи токен доступний
        throw new Error("No token available");
      }

      const response = await axios.put(
        SERVER_URL + `User/user_surname/${surname}`,
        { surname },
        {
          headers: authHeader(),
        }
      );

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        // Обробка успішної відповіді
        console.log("Ім'я змінено!");
      } else {
        throw new Error("Зміна прізвища користувача не вдалася");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Помилка зміни прізвища користувача", error);
    }
  };

  EditPhone = async (data) => {
    try {
      let phoneNumber = data.phone;
      console.log(phoneNumber);
      const token = localStorage.getItem("token"); // Отримати токен з локального сховища
      if (!token) {
        // Перевірити, чи токен доступний
        throw new Error("No token available");
      }

      const response = await axios.put(
        SERVER_URL + `User/phone/${phoneNumber}`,
        { phoneNumber },
        {
          headers: authHeader(),
        }
      );

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        // Обробка успішної відповіді
        console.log("Телефон змінено!");
      } else {
        throw new Error("Зміна телефону користувача не вдалася");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Помилка зміни телефону користувача", error);
    }
  };

  EditPassRes = async (data) => {
    try {
      let password = data.password;
      console.log(password);
      const token = localStorage.getItem("token"); // Отримати токен з локального сховища
      if (!token) {
        // Перевірити, чи токен доступний
        throw new Error("No token available");
      }

      const response = await axios.put(
        SERVER_URL + "User/password_change",
        { password },
        {
          headers: authHeader(),
        }
      );

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        // Обробка успішної відповіді
        console.log("Пароль змінено!");
        window.location.reload();
      } else {
        throw new Error("Зміна паролю користувача не вдалася");
      }
      return response; // Повернути відповідь
    } catch (error) {
      // Обробка помилки
      console.error("Помилка зміни паролю користувача", error);
    }
  };

  AdminDeleteUser = async (data) => {
    try {
      const id = data;
      console.log("ЩОЦЕЕЕЕЕЕЕЕ", id);
      const token = localStorage.getItem("token"); // Отримати токен з локального сховища
      if (!token) {
        // Перевірити, чи токен доступний
        throw new Error("No token available");
      }

      const response = await axios.delete(SERVER_URL + `User/${id}`, {
        headers: authHeader(),
      });

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        // Обробка успішної відповіді
        console.log("Користувача видалено!");
      } else {
        throw new Error("Видалення користувача не вдалося!");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Помилка видалення користувача", error);
    }
  };

  AdminEditUser = async (data) => {
    try {
      const id = data.id;
      console.log("id AdminEditUser", id);
      console.log("data AdminEditUser", data);
      const token = localStorage.getItem("token"); // Отримати токен з локального сховища
      if (!token) {
        // Перевірити, чи токен доступний
        throw new Error("No token available");
      }

      const response = await axios.put(SERVER_URL + `User/${id}`, data, {
        headers: authHeader(),
      });

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        // Обробка успішної відповіді
        const confirmServer = response.data.message;
        // callback(confirmServer);
        console.log("Дані користувача Змінено!", response);
        // window.location.href = "/adminpage";
        return { success: true, message: confirmServer };
      } else {
        throw new Error("Зміна даних користувача не вдалася!");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Помилка зміни користувача!", error);
      const errorServer = error.response.data.message;
      // errorCallback(errorServer);
      return { success: false, error: errorServer };
    }
  };

  AdminSearchallUser = async (data) => {
    try {
      console.log("AdminSearchAllUser.......", data);
      const response = await axios.get(
        SERVER_URL + `User/all?SearchWords=${data}`,
        {
          // params: data,
          headers: authHeader(),
        }
      );
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        const responseData = response.data; // Отримуємо дані відповіді
        const usersData = responseData.users;
        const totalPages = responseData.paging.total_pages;
        const pageNumber = responseData.paging.page_number;
        // Обробка успішної відповіді
        console.log("Successful new USERS.....:", responseData);
        return {
          usersData,
          totalPages,
          pageNumber,
        };
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
    }
  };

  AdminAddUser = async (data) => {
    try {
      console.log("AdminSearchAllUser.......", data);
      const response = await axios.post(SERVER_URL + "User", data, {
        // params: data,
        headers: authHeader(),
      });
      // Перевіряємо статус відповіді
      if (response.status === 200) {
        // const responseData = response.data; // Отримуємо дані відповіді
        // const usersData = responseData.users;
        // Обробка успішної відповіді
        console.log("Created new USERS.....OK......!");
        const confirmServer = response.data.message;
        return { success: true, message: confirmServer };
        // return usersData;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Not answer:", error);
      const errorServer = error.response.data.message;
      return { success: false, error: errorServer };
    }
  };
}

export default new EditUser();
