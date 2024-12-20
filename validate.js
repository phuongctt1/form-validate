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

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required.`;
  }
  return null;
};

export const validateUsername = (element, fieldName) => {
  const usernameValue = element.value.trim();
  const usernameRegex = /^[a-zA-ZÀ-ỹà-ỹ\s]+$/;
  const messageRequired = validateRequired(usernameValue, fieldName);
  const messageUsername = !usernameRegex.test(usernameValue)
    ? `${fieldName} uppercase and lowercase letters, no special characters, can be Vietnamese`
    : null;

  const messageError = messageRequired ? messageRequired : messageUsername;
  if (messageError) {
    setError(element, messageError);
    return false;
  } else {
    setSuccess(element);
    return true;
  }
};

export const validateEmail = (element, fieldName) => {
  const emailValue = element.value.trim();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const messageRequired = validateRequired(emailValue, fieldName);
  const messageEmail = !emailRegex.test(emailValue)
    ? `${fieldName} is not in correct format`
    : null;
  const messageError = messageRequired ? messageRequired : messageEmail;
  if (messageError) {
    setError(element, messageError);
    return false;
  } else {
    setSuccess(element);
    return true;
  }
};

export const validateMinLength = (element, fieldName, min) => {
  const passwordValue = element.value.trim();
  const messageMinLength =
    passwordValue.length < min
      ? `${fieldName} has at least ${min} characters`
      : null;
  return messageMinLength;
};

export const validateMaxLength = (element, fieldName, max) => {
  const passwordValue = element.value.trim();
  const messageMaxLength =
    passwordValue.length > max
      ? `${fieldName} has not exceeding ${max} characters`
      : null;
  return messageMaxLength;
};

export const validatePassword = (element, fieldName, min, max) => {
  const passwordValue = element.value.trim();
  const messageRequired = validateRequired(passwordValue, fieldName);
  const messageMin = validateMinLength(element, fieldName, min);
  const messageMax = validateMaxLength(element, fieldName, max);
  const messageCase =
    !/[A-Z]/.test(passwordValue) || !/[a-z]/.test(passwordValue)
      ? `${fieldName} must have at least one uppercase and one lowercase letter.`
      : null;
  const messageError =
    messageRequired || messageMin || messageMax || messageCase;
  if (messageError) {
    setError(element, messageError);
    return false;
  } else {
    setSuccess(element);
    return true;
  }
};

export const validatePasswordConfirm = (element, elementConfirm, fieldName) => {
  const passwordValue = element.value.trim();
  const passwordConfirmValue = elementConfirm.value.trim();
  const messageRequired = validateRequired(passwordConfirmValue, fieldName);
  const messageCase =
    passwordConfirmValue !== passwordValue ? `${fieldName} incorrect` : null;
  const messageError = messageRequired || messageCase;
  if (messageError) {
    setError(elementConfirm, messageError);
    return false;
  } else {
    setSuccess(elementConfirm);
    return true;
  }
};

export const validateInput = (
  usernameElement,
  emailElement,
  passwordElement,
  passwordConfirmElement
) => {
  const isValidateUsername = validateUsername(usernameElement, "Username");
  const isValidateEmail = validateEmail(emailElement, "Email");
  const isValidatePassword = validatePassword(
    passwordElement,
    "Password",
    8,
    32
  );
  const isValidatePasswordConfirm = validatePasswordConfirm(
    passwordElement,
    passwordConfirmElement,
    "Password confirm"
  );
  if (
    isValidateUsername &&
    isValidateEmail &&
    isValidatePassword &&
    isValidatePasswordConfirm
  ) {
    console.log('test')
    return true;
  } else {
    return false;
  }
};
