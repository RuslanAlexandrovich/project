export function loginCheck(value) {
  const loginPattern = /^[A-Z][a-zA-Z0-9]{2,14}$/;
  return loginPattern.test(value);
}
export function nameCheck(value) {
  const namePattern = /^[A-ZА-ЯІ][a-zа-яі]{1,}$/u;
  return namePattern.test(value);
}

export function surNameCheck(value) {
  const surNamePattern = /^[A-ZА-ЯІ][a-zа-яі]{1,}$/u;
  return surNamePattern.test(value);
}

export function emailCheck(value) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return emailPattern.test(value);
}

export function phoneCheck(value) {
  const emailPattern = /^380\d{0,9}$/;
  return emailPattern.test(value);
}

export function passwordCheck(value) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
  return passwordPattern.test(value);
}

// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
