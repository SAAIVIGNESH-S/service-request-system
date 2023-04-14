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

const addReqForm = document.getElementById("addReqForm");
addReqForm.addEventListener("submit", (event) => {
  const toEmail = document.getElementById("toEmail");
  const toEmailError = document.getElementById("toEmailError");
  const toEmailValidation = validateEmail(toEmail, toEmailError);

  const subject = document.getElementById("subject");
  const subjectError = document.getElementById("subjectError");
  const subjectValidation = validateText(subject, subjectError, "Subject");

  const content = document.getElementById("content");
  const contentError = document.getElementById("contentError");
  const contentValidation = validateText(content, contentError, "Content");

  if (!(toEmailValidation && subjectValidation && contentValidation)) {
    event.preventDefault();
  }
});
