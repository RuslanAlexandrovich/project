function respStatus(response) {
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}
export default respStatus;
