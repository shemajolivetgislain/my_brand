// // Define your Cloudinary name
// const CLOUD_NAME = "dja5pnddu";

// // Add an event listener to the file input element
// add_image.addEventListener("change", function () {
//   // Create a new FormData object
//   const formData = new FormData();
//   // Append the selected file to the FormData object
//   formData.append("uploadImage", add_image.files[0]);

//   // Use the Cloudinary Upload API to upload the uploadImage to Cloudinary
//   fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/blogs-uploadImage`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Get the Cloudinary URL path from the response data
//       const imageUrl = data.secure_url;
//       // Save the URL path to local storage
//       localStorage.setItem("uploadImage", imageUrl);
//     })
//     .catch((error) => console.log(error));
// });

// When submitting the form, send the uploadImage URL path to the backend API
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();

  const title = document.getElementById("title").value;
  const statuse = document.getElementById("statuse").value;
  const category = document.getElementById("category").value;
  const body = document.getElementById("body").value;
  const uploadImage = document.getElementById("add_image");
  var imgUrl;

  let authToken = JSON.parse(localStorage.getItem("authToken"));

  uploadImage.onchange = function () {
    if (uploadImage.files[0].size < 5000000) {
      //5000000 ~ 5mb (or 5000000bytes)
      var fReader = new FileReader();
      fReader.onload = function (e) {
        imgUrl = e.target.result
        // blogImage.src = imgUrl;
      };
      fReader.readAsDataURL(uploadImage.files[0]);
    } else {
      alert("The File size is too big");
    }
  };
  alert(imgUrl);
  var image = imgUrl;

  const data = { title, statuse, category, image, body };
  fetch("http://127.0.0.1:3000/api/blogs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${authToken.token}`,
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
  // const imageValue = uploadImage.files;
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
  //   setError(uploadImage, "uploadImage is required");
  // } else {
  //   const file = imageValue[0];
  //   const fileType = file.type;
  //   const fileSize = file.size;

  //   if (
  //     fileType !== "uploadImage/jpeg" &&
  //     fileType !== "uploadImage/png" &&
  //     fileType !== "uploadImage/jpg"
  //   ) {
  //     setError(uploadImage, "File type should be jpeg, png, or jpg");
  //   } else {
  //     setSuccess(uploadImage);
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
