import { burger } from "./burger.js";
import { scrollToTop } from "./scrollToTop.js";

document.addEventListener("DOMContentLoaded", function () {
  scrollToTop();
});

document.addEventListener("DOMContentLoaded", function () {
  burger();
});



// form validation

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

  // errors
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
// regex
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

// cookies

const form = document.getElementById("resgitration");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let checkbox = document.getElementById("save");
  if (checkbox.checked) {
    let usernameValue = document.getElementById("usernameField").value;
    Cookies.set("saved_username", usernameValue);
  } else {
    Cookies.remove("saved_username");
  }
  e.target.submit();
});

let savedUsername = Cookies.get("saved_username");

if (savedUsername) {
  document.getElementById("usernameField").value = savedUsername;
  document.getElementById("save").checked = true;
}

// server info

axios
  .get("https://salomebubulashvili.github.io/server/server.json")
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Function to fetch data from the server and display comments
async function fetchDataAndDisplay() {
  try {
    const response = await axios.get(
      "https://salomebubulashvili.github.io/server/server.json"
    );
    const data = response.data;
    const mergedData = mergeData(data.users, data.posts);
    displayCommentsOnHtml(mergedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to merge user and post data based on user ID
function mergeData(users, posts) {
  return users.map((user) => {
    const userPosts = posts.filter((post) => post.id === user.id);
    return { ...user, posts: userPosts };
  });
}

// Function to display comments on the HTML page
function displayCommentsOnHtml(data) {
  const usersContainer = document.getElementById("users-container");
  data.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    user.posts.forEach((post) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      commentDiv.innerHTML = `
              <h3>${user.username} ${user.lastname}</h3>
              <h5>Email: ${user.email}</h5>
              <p>${post.text}</p>
          `;
      userDiv.appendChild(commentDiv);
    });
    usersContainer.appendChild(userDiv);
  });
}

// Function to handle adding a new comment

function addComment() {
  const commentInput = document.getElementById("comment-input");
  const comment = commentInput.value.trim();
  if (comment) {
    const newComment = document.createElement("div");
    newComment.classList.add("comment");

    const firstComment = document.querySelector(".comment");
    const userName = firstComment.querySelector("h3").textContent;

    newComment.innerHTML = `
          <h3>${userName}</h3>
          <p>${comment}</p>
      `;
    const usersContainer = document.getElementById("users-container");
    usersContainer.appendChild(newComment);
    closeOverlay();
  } else {
    alert("Please enter a comment.");
  }
}

// Function to open the comment overlay
function openOverlay() {
  const overlay = document.getElementById("comment-overlay");
  overlay.style.display = "block";
}

// Function to close the comment overlay
function closeOverlay() {
  const overlay = document.getElementById("comment-overlay");
  overlay.style.display = "none";
}

document
  .getElementById("add-comment-btn")
  .addEventListener("click", openOverlay);
document.getElementById("close-btn").addEventListener("click", closeOverlay);
document
  .getElementById("submit-comment-btn")
  .addEventListener("click", addComment);

fetchDataAndDisplay();

let ulResult = document.getElementById("result");
let inputField = document.getElementById("filter");

let listItems = [];

async function asyncFncfetch() {
  const response = await fetch(
    "https://salomebubulashvili.github.io/server/server.json"
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Cannot fetch data");
  }
  const responseData = await response.json();
  return responseData.users;
}

asyncFncfetch()
  .then((users) => {
    users.forEach((user) => {
      let li = document.createElement("li");
      li.textContent = `${user.username} ${user.lastname}`;
      listItems.push(li);
      ulResult.appendChild(li);
    });
  })
  .catch((err) => {
    console.log("Rejected", err);
  });

function filterData(searchItem) {
  listItems.forEach((item) => {
    console.log(item); //li

    if (item.innerText.toLowerCase().includes(searchItem.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

inputField.addEventListener("keyup", function () {
  filterData(this.value);
});
