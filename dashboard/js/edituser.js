const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");

// Fetch the data for the blog post with the given ID
fetch(`https://my-brand-api-wm4u.onrender.com/api/users/${id}`)
  .then((response) => response.json())
  .then((data) => {
    // Set the initial values of the form input fields
    usernameInput.value = data.data.username;
    emailInput.value = data.data.email;
    roleInput.value = data.data.role;
  })
  .catch((error) => {
    console.error("Error fetching User post data:", error);
  });

// Handle the form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const email = emailInput.value;
  const role = roleInput.value;

  let authToken = JSON.parse(localStorage.getItem("authToken"));

  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      username,
      email,
      role,
    })
  );

  // Send put request to your API with image URL included in data
  const postData = {
    username,
    email,
    role,
  };

  fetch(`https://my-brand-api-wm4u.onrender.com/api/users/${id}`, {
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
        location.href = "../../dashboard/users.html";
        // });
      } else {
        swal(data.message);
        // alert(data.message);
        location.href = "../../dashboard/users.html";
      }
    })
    .catch((error) => alert(error));
});
