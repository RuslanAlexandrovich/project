import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import isTokenValid from "./tokenTime/tokenValidTime";
import AuthService from "./services/AuthService";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import SendEmail from "./pages/SendEmail";
import AboutUser from "./pages/AboutUser";
import AdminPage from "./pages/AdminPage";
import UserConfirmComp from "./components/UserConfirmComp";

function App() {
  // =======Перевірка часу життя токену та Активності користувача=======

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Додайте стан для відстеження авторизації
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  useEffect(() => {
    // ======припинення роботи useEffect=======
    // let CheckingToken = true;

    const checkTokenValidity = () => {
      if (!isTokenValid()) {
        // Токен вже не дійсний, виконуємо розлогін
        AuthService.logout();
        console.log("Перевірка та видалення токену 1");
        // CheckingToken = false;
        // clearInterval(interval);
      }
    };
    console.log("Перевірка життєдіяльності токену 2");
    // Викликаємо перевірку токену при завантаженні компонента і після кожного оновлення
    checkTokenValidity();
    // if (CheckingToken) {
    // Встановлюємо інтервал для періодичної перевірки токену (наприклад, кожні 5 хвилин)
    const interval = setInterval(checkTokenValidity, 5 * 60 * 1000); // 5 хвилин у мілісекундах
    // Зупиняємо інтервал при розмонтуванні компонента
    return () => clearInterval(interval);
    // }
  }, []);

  // Оновлюємо час останньої активності користувача при кожній активності
  const handleUserActivity = () => {
    setLastActivityTime(Date.now());
  };

  // Встановлюємо обробник події кліка або будь-якого іншого дійства для відстеження активності
  useEffect(() => {
    const activityTimeout = setTimeout(() => {
      // Перевірка, чи минула година з останньої активності
      const currentTime = Date.now();
      const hourInMillis = 60 * 60 * 1000; // 1 година в мілісекундах
      if (currentTime - lastActivityTime >= hourInMillis) {
        // Користувач не був активним протягом години, виконуємо розлогін
        AuthService.logout();
        setIsLoggedIn(false); // Оновлюємо стан авторизації
        window.location.href = "/login";
        console.log("Розлогін користувача через бездіяльність");
      }
      console.log("перевірка активності");
    }, 10 * 60 * 1000); // Перевірка кожні 10 хвилин

    // Зупиняємо таймер при розмонтуванні компонента
    return () => clearTimeout(activityTimeout);
  }, [lastActivityTime]);

  return (
    <div
      className="AppMain"
      onMouseMove={handleUserActivity}
      onClick={handleUserActivity}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sendemail" element={<SendEmail />} />
        <Route path="/aboutuser" element={<AboutUser />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/userconfirm" element={<UserConfirmComp />} />
      </Routes>
    </div>
  );
}

export default App;
