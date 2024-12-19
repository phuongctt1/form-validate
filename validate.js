const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(String(email).toLowerCase());
};

const required = (element, message) => {
  const value = element.value.trim();
  if (value === "") {
    setError(element, message);
  }
  setSuccess(element);
};

const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required.`;
  }
  return null;
};

const checkUpperLowerCase = (element) => {
  const value = element.value.trim();
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
    setError(
      element,
      "Must have at least one uppercase and one lowercase letter"
    );
  }
  setSuccess(element);
};

const validateUsername = (element, fieldName) => {
  const usernameValue = element.value.trim();
  const usernameRegex = /^[a-zA-ZÀ-ỹà-ỹ\s]+$/;
  const messageRequired = validateRequired(usernameValue, fieldName);
  const messageUsername = !usernameRegex.test(usernameValue)
    ? `${fieldName} incorrect`
    : null;

  const messageError = messageRequired ? messageRequired : messageUsername;
  if (messageError) {
    setError(element, messageError);
  } else {
    setSuccess(element);
  }
};

const validateEmail = (element, fieldName) => {
  const emailValue = element.value.trim();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const messageRequired = validateRequired(emailValue, fieldName);
  const messageEmail = !emailRegex.test(emailValue)
    ? `${fieldName} incorrect`
    : null;
  const messageError = messageRequired ? messageRequired : messageEmail;
  if (messageError) {
    setError(element, messageError);
  } else {
    setSuccess(element);
  }
};

const validatePassword = (element, fieldName, min, max) => {
  const passwordValue = element.value.trim();
  const messageRequired = validateRequired(passwordValue, fieldName);
  const messageLength =
    passwordValue.length < min
      ? `${fieldName} has at least ${min} characters`
      : passwordValue.length > max
      ? `${fieldName} not exceeding ${max} characters`
      : null;

  const messageCase =
    !/[A-Z]/.test(passwordValue) || !/[a-z]/.test(passwordValue)
      ? `${fieldName} must have at least one uppercase and one lowercase letter.`
      : null;
  const messageError = messageRequired || messageLength || messageCase;
  if (messageError) setError(element, messageError);
  else {
    setSuccess(element);
  }
};

const validatePasswordConfirm = (element, elementConfirm, fieldName) => {
  const passwordValue = element.value.trim();
  console.log(passwordValue)
  const passwordConfirmValue = elementConfirm.value.trim();
  console.log("passwordConfirmValue", passwordConfirmValue);
  console.log("1");
  const messageRequired = validateRequired(passwordConfirmValue, fieldName);
  console.log("2");
  const messageCase =
    passwordConfirmValue !== passwordValue ? `${fieldName} incorrect` : null;
  const messageError = messageRequired || messageCase;
  if (messageError) {
    setError(elementConfirm, messageError);
  } else {
    setSuccess(elementConfirm);
  }
};

const validateInput = () => {
  validateUsername(username, "Username");
  validateEmail(email, "Email");
  validatePassword(password, "Password", 8, 32);
  validatePasswordConfirm(password, passwordConfirm, "Password confirm");
};

username.addEventListener("blur", () =>
  validateUsername(username, "Username")
);
email.addEventListener("blur", () => validateEmail(email, "Email"));
password.addEventListener("blur", () =>
  validatePassword(password, "Password", 8, 32)
);

passwordConfirm.addEventListener("blur", () =>
  validatePasswordConfirm(password, passwordConfirm, "Password confirm")
);
username.addEventListener("input", () => clearErrorOnInput(username));
email.addEventListener("input", () => clearErrorOnInput(email));
password.addEventListener("input", () => clearErrorOnInput(password));
passwordConfirm.addEventListener("input", () =>
  clearErrorOnInput(passwordConfirm)
);

const clearErrorOnInput = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
  console.log(username.value)
  const data = {
    username : username.value,
    email : email.value,
    password : password.value,
  }
  console.log(data)
  alert('thanh cong');
});

