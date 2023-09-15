import parseJWT from "../helpers/JWTService";

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  // console.log("validTime token....." + token);
  if (!token) {
    return false; // Токен відсутній
  }
  const decodedToken = parseJWT(token); // Парсимо JWT

  const currentTime = Date.now() / 1000; // Поточний час в секундах

  return decodedToken.exp > currentTime;
};

export default isTokenValid;
