const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  // grab the values in our inputs
  const names = document.getElementById("names").value;
  const subject = document.getElementById("subject").value;
  const email = document.getElementById("email").value;
  const content = document.getElementById("body").value;

  // have our values in one object
  const data = { names, subject, email, content };

  // interaction with the API endpoint
  fetch("https://my-brand-api-wm4u.onrender.com/api/queries/", {
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
        swal(data.message).then(() => {
          // Redirect to the login page
          location.href = "../index.html";
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
  const nameValue = names.value.trim();
  const emailValue = email.value.trim();
  const subjectValue = subject.value.trim();
  const bodyValue = body.value.trim();

  if (nameValue === "") {
    setError(names, "name is required");
  } else {
    const pattern = /^[a-zA-Z]+$/;

    if (!pattern.test(nameValue)) {
      setError(names, "names should contain only characters");
    } else {
      setSuccess(names);
    }
  }

  if (subjectValue === "") {
    setError(subject, "Subject is required");
  } else {
    const pattern = /^[a-zA-Z]+$/;

    if (!pattern.test(subjectValue)) {
      setError(subject, "subject should contain only characters");
    } else {
      setSuccess(subject);
    }
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }
  if (bodyValue === "") {
    setError(body, "Body is required");
  } else {
    setSuccess(body);
  }
};
