import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import isTokenValid from "./tokenTime/tokenValidTime";
import AuthService from "./services/AuthService";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import SendEmail from "./pages/SendEmail";
import AboutUser from "./pages/AboutUser";
import AdminPage from "./pages/AdminPage";
import RegionPage from "./pages/RegionPage";
import RegionalManagerPage from "./pages/RegionalManagerPage";
import UserConfirmComp from "./components/UserConfirmComp";
import EventPage from "./pages/EventPage";
import ContactGroupPage from "./pages/ContactGroupPage";
import ContactPage from "./pages/ContactsPage";
import LeftSideMenu from "../src/components/LeftSideMenu";

function App() {
  // =======Перевірка часу життя токену та Активності користувача=======

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Додайте стан для відстеження авторизації
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [tokenTrue, setTokenTrue] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenTrue(false);
      setLogged(true);
    }
  });

  const checkTokenValidity = () => {
    if (!tokenTrue && !isTokenValid()) {
      // Токен вже не дійсний, виконуємо розлогін
      AuthService.logout();
      console.log("Перевірка час життя токену скінчилось, видалення токену...");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      setTokenTrue(true);
    }
  };
  useEffect(() => {
    console.log("Перевірка життєдіяльності токену ...");
    // Викликаємо перевірку токену при завантаженні компонента
    checkTokenValidity();

    // Встановлюємо інтервал для періодичної перевірки токену (наприклад, кожні 5 хвилин)
    const interval = setInterval(() => {
      checkTokenValidity();
    }, 5 * 60 * 1000); // 5 хвилин у мілісекундах

    // Зупиняємо інтервал при розмонтуванні компонента
    return () => clearInterval(interval);
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
      // onMouseMove={handleUserActivity}
      onClick={handleUserActivity}
    >
      <div className="LeftMenu">
        <LeftSideMenu />
      </div>
      <div className="appInMAINapp">
        <Routes>
          <Route
            path="/"
            element={!logged ? <Login /> : <Navigate to="/home" />}
          />
          {/* <Route path="/" element={<Registration />} /> */}

          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sendemail" element={<SendEmail />} />
          <Route path="/aboutuser" element={<AboutUser />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/userconfirm" element={<UserConfirmComp />} />
          <Route path="/regions" element={<RegionPage />} />
          <Route path="/regionalmanager" element={<RegionalManagerPage />} />
          <Route path="/eventstype" element={<EventPage />} />
          <Route path="/contactgroup" element={<ContactGroupPage />} />
          <Route path="/contacts" element={<ContactPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
