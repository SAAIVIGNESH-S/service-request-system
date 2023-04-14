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

const addUserForm = document.getElementById("addUserForm");
addUserForm.addEventListener("submit", (event) => {
  const name = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  const nameValidation = validateText(name, nameError, "Name");

  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailValidation = validateEmail(email, emailError);

  const rollNo = document.getElementById("rollNo");
  const rollNoError = document.getElementById("rollNoError");
  const rollNoValidation = validateText(rollNo, rollNoError, "Roll No.");

  const dept = document.getElementById("dept");
  const deptError = document.getElementById("deptError");
  const deptValidation = validateText(dept, deptError, "Dept");

  if (
    !(nameValidation && emailValidation && rollNoValidation && deptValidation)
  ) {
    event.preventDefault();
  }
});
