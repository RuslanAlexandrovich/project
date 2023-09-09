import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import SendEmail from "./pages/SendEmail";
import AboutUser from "./pages/AboutUser";
import AdminPage from "./pages/AdminPage";
import UserConfirmComp from "./components/UserConfirmComp";

function App() {
  return (
    <div className="AppMain">
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
