import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import AuthService from "../services/AuthService";
//https://kai.com/userconfirm?userid=jghsjfghdfjhdfkhk&code=jdhldjhdlfjhdfghf
export default function UserConfirmComp() {
  const [userInfo, setUserInfo] = useState({});
  const [searchParams] = useSearchParams();
  console.log(Object.fromEntries([...searchParams]));
  const paramsObj = Object.fromEntries([...searchParams]);
  async function fetchData() {
    try {
      let userdata = await AuthService.userConfirm(paramsObj);
      if (userdata) setUserInfo(userdata);
      //navigate("/");
    } catch (error) {
      // Обробка помилок, якщо дані не були успішно надіслані
      console.error("Помилка входу...");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return userInfo ? (
    <Navigate to="/" replace={true}></Navigate> //На сторінку підтвердження
  ) : (
    <div className="userConfirm">Data provided not valid!</div>
  );
}

// <h4>
//   Вам на пошту прийшов лист, перейдіть за посиланням, щоб підтвердити
//   аккаунт. Якщо лист не прийшов перевірте спам.
// </h4>;
