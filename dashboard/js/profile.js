document.addEventListener("DOMContentLoaded", function() {
  const currentlogin = document.getElementById('currentLogin');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  currentlogin.innerHTML = `${currentUser.username}`;
});

// get blogs from local storage or initialize an empty array
const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
const user = JSON.parse(localStorage.getItem('blogs')) || [];

// display blogs in the table
function displayBlogs() {
  const blogsTable = document.querySelector('tbody');
  blogsTable.innerHTML = '';

  if (blogs && blogs.length > 0) {
    blogs.forEach((blog, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="picture">
          <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHw%3D&w=1000&q=80" alt="">
        </td>
        <td class="blog-title">
          <p>${blog.title}</p>
        </td>
        <td class="author">
          <p>${blog.author}</p>
        </td>
        <td class="date">
          <p>${blog.date}</p>
        </td>
        <td class="status">
          <p>${blog.status}</p>
        </td>
        <td class="action">
          <a href="edit.html"><i class='bx bxs-edit'></i></a>
          <a href="#" onclick="deleteBlog(${index})"><i class='bx bxs-trash'></i></a>
        </td>
      `;
      blogsTable.appendChild(tr);
    });
  } else {
    // display a message or placeholder content if there are no blogs
    blogsTable.innerHTML = '<tr><td colspan="6">No blogs found.</td></tr>';
  }
}

// call the displayBlogs function to populate the table
displayBlogs();


function deleteBlog(index) {
  // remove the blog from the blogs array
  blogs.splice(index, 1);

  // update the table with the new list of blogs
  displayBlogs();

  // save the updated list of blogs to local storage
  localStorage.setItem('blogs', JSON.stringify(blogs));
}


