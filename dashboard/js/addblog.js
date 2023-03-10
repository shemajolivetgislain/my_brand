const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
  // grab the values in our inputs
  const title = document.getElementById("title").value;
  // const image = document.getElementById("image").value;
  const statuse = document.getElementById("statuse").value;
  const category = document.getElementById("category").value;
  const body = document.getElementById("body").value;

  // have our values in one object
  const data = { title, statuse, category, body };

  // interaction with the API endpoint
  let authToken = JSON.parse(localStorage.getItem("authToken"));
  fetch("https://my-brand-api-wm4u.onrender.com/api/blogs/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken.token}`,
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
          location.href = "../article.html";
        });
      } else {
        console.log(data.message);
        swal(data.message);
        // alert(data.message);
      }
    })
    .catch((error) => alert(error));
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  console.log(inputControl + "input control");
  const errorDisplay = inputControl.querySelector(".error");
  console.log(errorDisplay + "error display");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  console.log(inputControl.classList.add("error"));
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateInputs = () => {
  const titleValue = title.value.trim();
  const bodyValue = body.value.trim();
  // const imageValue = image.files;
  const categoryValue = category.value.trim();
  const statusValue = statuse.value.trim();

  if (titleValue === "") {
    setError(title, "title is required");
  } else {
    const pattern = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;

    if (!pattern.test(titleValue)) {
      setError(title, "Title should contain only characters");
    } else {
      setSuccess(title);
    }
  }
  // if (imageValue.length === 0) {
  //   setError(image, "image is required");
  // } else {
  //   const file = imageValue[0];
  //   const fileType = file.type;
  //   const fileSize = file.size;

  //   if (
  //     fileType !== "image/jpeg" &&
  //     fileType !== "image/png" &&
  //     fileType !== "image/jpg"
  //   ) {
  //     setError(image, "File type should be jpeg, png, or jpg");
  //   } else {
  //     setSuccess(image);
  //   }
  // }

  if (bodyValue === "") {
    setError(body, "Body is required");
  } else {
    setSuccess(body);
  }
  if (categoryValue === "") {
    setError(category, "Category is required");
  } else {
    setSuccess(category);
  }
  if (statusValue === "") {
    setError(statuse, "Status is required");
  } else {
    setSuccess(statuse);
  }
};
