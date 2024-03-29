document.addEventListener("DOMContentLoaded", function () {
  const currentlogin = document.getElementById("currentLogin");
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  console.log(authToken.username);
  currentlogin.innerHTML = `${authToken.username}`;
});

// delete article
function deleteArticle(id, tr) {
  console.log("Deleting blog post with ID: " + id);
  let authToken = JSON.parse(localStorage.getItem("authToken"));
  fetch(`https://my-brand-api-wm4u.onrender.com/api/blogs/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${authToken.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // remove table row after deleting the blog post
      tr.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
function displayBlogs() {
  const blogsTable = document.querySelector("tbody");
  blogsTable.innerHTML = "";

  let authToken = JSON.parse(localStorage.getItem("authToken"));
  let isAdmin = authToken.role === "admin";

  fetch("https://my-brand-api-wm4u.onrender.com/api/blogs")
    .then((response) => response.json())
    .then((blogs) => {
      console.log(blogs.data);
      const fetchBlogs = blogs.data;
      if (fetchBlogs && fetchBlogs.length > 0) {
        fetchBlogs.forEach((blog, i) => {
          const tr = document.createElement("tr");
          const createdAt = new Date(blog.createdAt);
          tr.innerHTML = `
            <td class="blog-title">
              <p>${i + 1}</p>
            </td>

            <td class="picture">
              <img src="${blog.image}" alt="">
            </td>
            <td class="blog-title">
              <p>${blog.title}</p>
            </td>
            <td class="author">
              <p>${blog.category}</p>
            </td>
            <td class="date">
              <p>${createdAt.getDate()}-${
            createdAt.getMonth() + 1
          }-${createdAt.getFullYear()}</p>
            </td>
            <td class="status">
              <p>${blog.statuse}</p>
            </td>
            <td class="action">
              ${
                isAdmin
                  ? `
              <a href="../dashboard/edit.html?id=${blog._id}" class="admin"><i class='bx bxs-edit '></i></a>
              <a href="#" class="admin"><i class='bx bxs-trash' onclick="if (window.confirm('Are you sure you want to delete this blog post?')) { deleteArticle('${blog._id}', this.parentNode.parentNode) }"></i></a>`
                  : ""
              }
            </td>
          `;
          blogsTable.appendChild(tr);
        });
      } else {
        // display a message or placeholder content if there are no blogs
        blogsTable.innerHTML = '<tr><td colspan="6">No blogs found.</td></tr>';
      }
    });
}

displayBlogs();
