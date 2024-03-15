import { burger } from "./burger.js";

document.addEventListener("DOMContentLoaded", function () {
  burger();
});

const formElement = document.getElementById("resgitration");

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const errors = {};

  //username
  let usernameValue = document.getElementById("usernameField").value;

  if (usernameValue == "") {
    errors.username = "Username can not be empty";
  }

  // password
  let passwValue = document.getElementById("passwordField").value;
  let passw2Value = document.getElementById("passwordField2").value;

  if (passwValue == "") {
    errors.passw = "Password field can not empty";
  }

  if (passwValue != passw2Value) {
    errors.passw2 = "Passwords do not match";
  }

  // radio
  let gender = false;

  formElement.querySelectorAll('[name = "gender"]').forEach((item) => {
    if (item.checked) {
      gender = true;
    }
  });

  if (!gender) {
    errors.gender = "Please select Your Gender";
  }

  //checkbox
  let checkInput = document.getElementById("agree").checked;

  if (!checkInput) {
    errors.check = "You must agree our terms and conditions";
  }

  formElement.querySelectorAll(".error-text").forEach((el) => {
    el.textContent = " ";
  });

  // შეცდომები
  for (let item in errors) {
    console.log(item); //key: check, gender,passw,username

    let errorPelement = document.getElementById("error-" + item);
    console.log(errorPelement);

    if (errorPelement) {
      errorPelement.textContent = errors[item];
    }
  }

  if (Object.keys(errors).length == 0) {
    formElement.submit();
  }

  console.log(errors);
});



document.addEventListener("click", function () {
  const passwShow = document.getElementById("passwordField");
  const icon = document.querySelector(".fa-regular.fa-eye");

  icon.addEventListener("click", function () {
    if (passwShow.type === "password") {
      passwShow.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwShow.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});
// email validation - regex
let email = document.getElementById("emailField");

function validationEmail() {
  let emailValue = document.getElementById("emailField").value;
  let textError = document.getElementById("emailError");
  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailPattern.test(emailValue)) {
    textError.innerText = "Your Email is valid";
    textError.style.color = "green";
  } else {
    textError.innerText = "Your Email is Invalid";
    textError.style.color = "red";
  }

  if (emailValue == "") {
    textError.innerHTML = "";
  }
}

email.addEventListener("keyup", validationEmail);
