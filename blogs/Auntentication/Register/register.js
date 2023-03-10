const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
  // grab the values in our inputs
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // have our values in one object
  const data = { username, email, password, confirmPassword };

  // interaction with the API endpoint
  fetch("https://my-brand-api-wm4u.onrender.com/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.ok) {
        swal("Good job!", data.message).then(() => {
          // Redirect to the login page
          location.href = "../login/login.html";
        });
      } else {
        swal(data.message);
        // alert(data.message);
      }
    })
    .catch((error) => alert(error));
});

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
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (usernameValue === "") {
    setError(username, "Username is required");
  } else {
    const pattern = /^[a-zA-Z]+$/;

    if (!pattern.test(usernameValue)) {
      setError(username, "username should contain only characters");
    } else {
      setSuccess(username);
    }
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 4) {
    setError(password, "Password must be at least 8 character.");
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === "") {
    setError(confirmPassword, "Please confirm your password");
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPassword, "Passwords doesn't match");
  } else {
    setSuccess(confirmPassword);
  }
};

const eyeIcons = document.getElementsByClassName("show-hide");

[...eyeIcons].forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const pInput = eyeIcon.parentElement.querySelector("input");
    if (pInput.type === "password") {
      eyeIcon.classList.replace("bx-hide", "bx-show");
      return (pInput.type = "text");
    }
    eyeIcon.classList.replace("bx-show", "bx-hide");
    return (pInput.type = "password");
  });
});
