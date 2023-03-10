// display blogs in the table
function displayBlogs() {
  const blogsTable = document.querySelector("tbody");
  blogsTable.innerHTML = "";

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
