var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dja5pnddu/upload/";
var CLOUDINARY_UPLOAD_PRESET = "usnlxsti";

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();

  const title = document.getElementById("title").value;
  const statuse = document.getElementById("statuse").value;
  const category = document.getElementById("category").value;
  const body = document.getElementById("body").value;
  const imageUpload = document.getElementById("add_image").files[0];

  let authToken = JSON.parse(localStorage.getItem("authToken"));

  const formData = new FormData();
  formData.append("file", imageUpload);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  // Upload image to Cloudinary
  fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const imageUrl = data.secure_url;

      // Store image URL in localStorage
      localStorage.setItem("imageUrl", imageUrl);

      // Send post request to your API with image URL included in data
      const postData = {
        title,
        statuse,
        category,
        image: localStorage.getItem("imageUrl"),
        body,
      };
      fetch("https://my-brand-api-wm4u.onrender.com/api/blogs", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${authToken.token}`,
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.ok) {
            // swal("Good job!", data.message).then(() => {
              // Redirect to the login page
              location.href = "../../dashboard/article.html";
            // });
          } else {
            swal(data.message);
            // alert(data.message);
            location.href = "../../dashboard/article.html";
          }
        })
        .catch((error) => alert(error));
    })
    .catch((error) => alert(error));
});

// // Add an event listener to the file input element
// add_image.addEventListener("change", function () {
//   // Create a new FormData object
//   const formData = new FormData();
//   // Append the selected file to the FormData object
//   formData.append("uploadImage", add_image.files[0]);

//   // Use the Cloudinary Upload API to upload the uploadImage to Cloudinary
//   fetch(`https://api.cloudinary.com/v1_1/dja5pnddu`, {
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
// const form = document.getElementById("form");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   validateInputs();

//   const title = document.getElementById("title").value;
//   const statuse = document.getElementById("statuse").value;
//   const category = document.getElementById("category").value;
//   const body = document.getElementById("body").value;
//   // const uploadImage = document.getElementById("add_image");
//   // var imgUrl;

//   let authToken = JSON.parse(localStorage.getItem("authToken"));

//   const data = { title, statuse, category, image: imageUpload, body };
//   fetch("https://my-brand-api-wm4u.onrender.com/api/blogs", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       Authorization: `Bearer ${authToken.token}`,
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       if (data.ok) {
//         swal("Good job!", data.message).then(() => {
//           // Redirect to the login page
//           location.href = "../login/login.html";
//         });
//       } else {
//         swal(data.message);
//         // alert(data.message);
//       }
//     })
//     .catch((error) => alert(error));
// });

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
