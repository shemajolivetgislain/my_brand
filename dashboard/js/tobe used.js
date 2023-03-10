// display blogs in the table
function displayBlogs() {
  const blogsTable = document.querySelector("tbody");
  blogsTable.innerHTML = "";

  if (blogs && blogs.length > 0) {
    blogs.forEach((blog, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="blog-title">
        <p>${i + 1}</p>
        </td>

        <td class="picture">
          <img src="${blog.picture}" alt="">
        </td>
        <td class="blog-title">
          <p>${blog.title}</p>
        </td>
        <td class="author">
          <p>${blog.category}</p>
        </td>
        <td class="date">
          <p>${blog.date}</p>
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
}
