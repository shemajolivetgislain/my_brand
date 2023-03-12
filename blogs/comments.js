const urlPar = new URLSearchParams(window.location.search);
const commentId = urlPar.get("id");

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // grab the values in our inputs
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const comment = document.getElementById("comment").value;

  // have our values in one object
  const data = { fullName, email, comment };
  console.log(data);

  // interaction with the API endpoint
  fetch(`http://127.0.0.1:3000/api/blog/${commentId}/comment`, {
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
        
        swal("Good job!", data.data.message).then(() => {
          // Redirect to the login page
          location.href = "./blog-details.html";
        });
      } else {
        swal(data.message);
        // alert(data.message);
      }
    })
    .catch((error) => alert(error));
});
