import {
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateInput,
} from "./validate.js";
export const form = document.getElementById("form");
export const username = document.getElementById("username");
export const email = document.getElementById("email");
export const password = document.getElementById("password");
export const passwordConfirm = document.getElementById("passwordConfirm");

username.addEventListener("blur", () => validateUsername(username, "Username"));
email.addEventListener("blur", () => validateEmail(email, "Email"));
password.addEventListener("blur", () =>
  validatePassword(password, "Password", 8, 32)
);
passwordConfirm.addEventListener("blur", () =>
  validatePasswordConfirm(password, passwordConfirm, "Password confirm")
);

const inputEvent = [username, email, password, passwordConfirm];
inputEvent.forEach((element) => {
  element.addEventListener("input", () => clearErrorOnInput(element));
});

const clearErrorOnInput = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const isValidateInput = validateInput();
  const data = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  console.log(data);
  if (isValidateInput === true) {
    return alert("sign up success");
  }
});
