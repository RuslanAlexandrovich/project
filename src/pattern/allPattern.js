export function loginCheck(value) {
  let error = null;
  if (value && value.length > 0) {
  const loginPattern = /^[A-ZА-ЯІ][a-zа-яі0-9]{2,14}$/;
  return loginPattern.test(value);
}
return error;
}
export function nameCheck(value) {
  let error = null;
  if (value && value.length > 0) {
  const namePattern = /^[A-ZА-ЯІ][a-zа-яі]{1,}$/u;
  return namePattern.test(value);
}
return error;
}

export function surNameCheck(value) {
  let error = null;
  if (value && value.length > 0) {
  const surNamePattern = /^[A-ZА-ЯІ][a-zа-яі]{1,}$/u;
  return surNamePattern.test(value);
}
return error;
}

export function emailCheck(value) {
  let error = null;
  if (value && value.length > 0) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return emailPattern.test(value);
}
return error;
}

export function phoneCheck(value) {
  let error = null;
  if (value && value.length > 0) {
    const phonePattern = /^380\d{0,9}$/;
    return phonePattern.test(value);
  }
  return error;
}

export function passwordCheck(value) {
  let error = null;
  if (value && value.length > 0) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&_]).{8,}$/;
  return passwordPattern.test(value);
  }
  return error;
}

// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
