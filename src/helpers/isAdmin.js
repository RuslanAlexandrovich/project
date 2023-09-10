import parseJWT from "../helpers/JWTService";
// ======Перевірка наявності користувача в системі. Відображення залежностей USER/ADMIN======

export const isUser = () => {
  const token = localStorage.getItem("token");
  const userData = parseJWT(token);
  let User = false;
  if (
    token &&
    userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  ) {
    let roles =
      userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    User = roles && roles.includes("user");
    console.log("User... ", User);

    return User;
  }
};

export const isAdmin = () => {
  const token = localStorage.getItem("token");
  const userData = parseJWT(token);
  let Admin = false;
  if (
    userData &&
    userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  ) {
    let roles =
      userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    Admin = roles && roles.includes("admin");
    console.log("Admin... ", Admin);
  } else {
    // Якщо userData  мають значення null або undefined, встановити isAdmin в false.
    console.log("Admin... ", Admin);
  }
  return Admin;
};

export const isShow = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  const userData = parseJWT(token);
  let show = token ? true : false;
  return show;
};
