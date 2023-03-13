const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
function singleBlog() {
  var div = document.getElementById("blogdetailsection");

  fetch(`https://my-brand-api-wm4u.onrender.com/api/blogs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //   alert("hello id " + data.data.author);
      localStorage.setItem("blogId", JSON.stringify(data.data._id));
      const createdAt = new Date(data.data.createdAt);
      div.innerHTML += `
              <h1>${data.data.title}</h1>
              <div class="blog-img">
                <img src="${data.data.image}" alt="" />
              </div>
              <div class="blog-user-details">
                <div class="user-img">
                  <img src="../img/profile.jpg" alt="" />
                </div>
                <div class="user-name">
                  <h3>${data.data.author}</h3>
                  <p>${createdAt.getDate()}-${
        createdAt.getMonth() + 1
      }-${createdAt.getFullYear()}</p>
                </div>
              </div>
              <p>
      ${data.data.body}
              </p>
            `;
    })
    .catch((error) => {
      console.log(error);
    });
}
singleBlog();

function displayComments() {
  var div = document.getElementById("blogcommentsection");
  fetch(`https://my-brand-api-wm4u.onrender.com/api/blog/${id}/comments/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.comments.length === 0) {
        div.innerHTML = "No comments yet!";
      } else {
        // Sort the comments by date
        data.comments.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        // Loop through the comments array and append each comment to the HTML
        data.comments.forEach((comment) => {
          const createdAt = new Date(comment.date);
          div.innerHTML += `
              <div class="user-img">
                <img src="https://agrimachinery.nic.in/Images/User/User.png" alt="" />
                <div class= "commentdata">
                <h3>${comment.fullName}</h3>
                <p>${createdAt.getDate()}-${
            createdAt.getMonth() + 1
          }-${createdAt.getFullYear()}</p>
                </div>

              </div>
              <div class="user-name">

                <p>${comment.comment}</p>
              </div>
              <hr>
          `;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

displayComments();
