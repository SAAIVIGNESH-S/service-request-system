const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");
togglePassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePassword.className =
    password.getAttribute("type") === "password"
      ? "bi bi-eye-slash icon"
      : "bi bi-eye icon";
});

function switchVisible() {
  const x = document.getElementById("loginModule");
  const y = document.getElementById("forgotpassModule");
  if (x) {
    if (x.style.display == "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      y.style.display = "Block";
      x.style.display = "none";
    }
  }
}

const validateEmail = (obtainedEmail, obtainedEmailError) => {
  const email = obtainedEmail.value;
  var regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.trim() == "") {
    obtainedEmailError.innerText = "Email can't be empty";
    return false;
  }
  if (!String(email).match(regex)) {
    obtainedEmailError.innerText = "Invalid email";
    return false;
  }
  obtainedEmailError.innerText = "";
  return true;
};

const validateText = (obtainedElement, obtainedElementError, text) => {
  const value = obtainedElement.value;
  if (value.trim() == "") {
    obtainedElementError.innerText = text + " can't be empty";
    return false;
  }
  obtainedElementError.innerText = "";
  return true;
};

const validateForm = () => {
  const emailElement = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailValidation = validateEmail(emailElement, emailError);

  const passwordElement = document.getElementById("password");
  const passwordError = document.getElementById("passwordError");
  const passwordValidation = validateText(
    passwordElement,
    passwordError,
    "Password"
  );

  return emailValidation && passwordValidation;
};

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
  if (!validateForm()) event.preventDefault();
});

const fpForm = document.getElementById("fpForm");
fpForm.addEventListener("submit", (event) => {
  const fpEmailElement = document.getElementById("fpEmail");
  const fpEmail = document.getElementById("fpEmailError");
  if (!validateEmail(fpEmailElement, fpEmailError)) {
    event.preventDefault();
  }
});