const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dja5pnddu/upload/";
var CLOUDINARY_UPLOAD_PRESET = "usnlxsti";
// Get the form elements
const form = document.getElementById("editForm");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const statusSelect = document.getElementById("statuse");
const bodyInput = document.getElementById("body");
const imageInput = document.getElementById("add_image");

// Fetch the data for the blog post with the given ID
fetch(`https://my-brand-api-wm4u.onrender.com/api/blogs/${id}`)
  .then((response) => response.json())
  .then((data) => {
    // Set the initial values of the form input fields
    titleInput.value = data.data.title;
    console.log(data.title);

    categorySelect.value = data.data.category;
    console.log(data.data.image);

    // Populate the status select field
    // const statusOptions = ["None", "Published", "Not published"];
    // statusOptions.forEach((optionValue) => {
    //   const option = document.createElement("option");
    //   option.value = optionValue;
    //   option.textContent = optionValue;
    //   statusSelect.appendChild(option);
    // });
    statusSelect.value = data.data.statuse;
    bodyInput.value = data.data.body;
  })
  .catch((error) => {
    console.error("Error fetching blog post data:", error);
  });

// Handle the form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate the form inputs
  validateInputs();

  const title = titleInput.value;
  const category = categorySelect.value;
  const statuse = statusSelect.value;
  const body = bodyInput.value;
  const imageFile = imageInput.files[0];

  let authToken = JSON.parse(localStorage.getItem("authToken"));

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append(
    "data",
    JSON.stringify({
      title,
      category,
      statuse,
      body,
    })
  );

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

      // Send put request to your API with image URL included in data
      const postData = {
        title,
        category,
        statuse,
        image: imageUrl,
        body,
      };

      fetch(`https://my-brand-api-wm4u.onrender.com/api/blogs/update/${id}`, {
        method: "PUT",
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

// const update = document.getElementById('update');
// let blogList = JSON.parse(localStorage.getItem("blogs"))|| [],indexId = localStorage.getItem('editIndex') || 0;

// document.getElementById('title').value = blogList[indexId].title;
// document.getElementById('date').value = blogList[indexId].date;
// document.getElementById('statuse').value = blogList[indexId].statuse;
// document.getElementById('category').value = blogList[indexId].category;
// document.getElementById('body').value = blogList[indexId].body;
// localStorage.setItem('blogs', JSON.stringify(blogList));

// function editblog(){
//      blogList[indexId].title = document.getElementById('title').value;
//      blogList[indexId].date = document.getElementById('date').value;
//      blogList[indexId].category = document.getElementById('category').value;
//      blogList[indexId].statuse = document.getElementById('statuse').value;
//      blogList[indexId].body = document.getElementById('body').value,
//      localStorage.setItem('blogs',JSON.stringify(blogList));
//      console.log(JSON.parse(localStorage.getItem('blogs')));
//      window.location.replace("../dashboard/article.html");
//  }

//  document.getElementById("update").addEventListener("click", function(event) {
//     event.preventDefault(); // prevent the form from submitting
//     editblog();
//     window.location.href = "../dashboard/article.html"; // redirect to article.html
//   });
