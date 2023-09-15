import jwtDecode from "jwt-decode";

const parseJWT = (token) => {
  try {
    // console.log(" TOKEN FIND....." + token);
    // console.log("ATOB TOKEN....." + atob(token.split(".")[1]));
    // const parse = JSON.parse(atob(token.split(".")[1]));
    // console.log("PARSE.....", parse);
    // return parse;

    // console.log("PARSE TOKEN....." + jwtDecode(token));
    // console.log(jwtDecode(token));
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};
export default parseJWT;
