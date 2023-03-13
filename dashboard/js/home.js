document.addEventListener("DOMContentLoaded", function () {
  const currentlogin = document.getElementById("currentLogin");
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  console.log(authToken.username);
  currentlogin.innerHTML = `${authToken.username}`;
});

function displayBlogs() {
  const blogsTable = document.querySelector("tbody");
  blogsTable.innerHTML = "";

  fetch("https://my-brand-api-wm4u.onrender.com/api/blogs")
    .then((response) => response.json())
    .then((blogs) => {
      const fetchBlogs = blogs.data;
      if (fetchBlogs && fetchBlogs.length > 0) {
        // sort the blogs by createdAt in descending order
        const sortedBlogs = fetchBlogs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        // get the first five blogs
        const recentBlogs = sortedBlogs.slice(0, 3);
        recentBlogs.forEach((blog, i) => {
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
          <a href="#"><i class='bx bxs-edit'></i></a>
          <a href="#"><i class='bx bxs-trash'></i></a>
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

function publishedBlog() {
  const published = document.getElementById("published");
  published.innerHTML = "";

  fetch("http://127.0.0.1:3000/api/blogs/published")
    .then((response) => response.json())
    .then((blogs) => {
      const fetchBlogs = blogs.data;
      console.log(blogs.countPublished);
      if (fetchBlogs && fetchBlogs.length > 0) {
        published.innerHTML += fetchBlogs.length;
      } else {
        // display a message or placeholder content if there are no blogs
        published.innerHTML = "0";
      }
    });
}

publishedBlog();

function unPublishedBlog() {
  const not_Published = document.getElementById("not_Published");
  not_Published.innerHTML = "";

  fetch("http://127.0.0.1:3000/api/blogs/unpublished")
    .then((response) => response.json())
    .then((blogs) => {
      const fetchBlogs = blogs.data;
      console.log(blogs.countPublished);
      if (fetchBlogs && fetchBlogs.length > 0) {
        not_Published.innerHTML += fetchBlogs.length;
      } else {
        // display a message or placeholder content if there are no blogs
        not_Published.innerHTML = "0";
      }
    });
}

unPublishedBlog();
