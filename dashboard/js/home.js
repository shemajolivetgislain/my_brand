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


const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const adminMenu = Array.from(document.getElementsByClassName("admin"));
const userMenu = Array.from(document.getElementsByClassName("user"));

// if(currentUser.role != "admin") adminMenu.forEach(e => e.style.display = 'block');
// if(currentUser.role != "user") userMenu.forEach(e => e.style.display = 'none');

if(currentUser.role === "admin") {
  adminMenu.forEach(e => e.style.display = 'block');
  userMenu.forEach(e => e.style.display = 'block');
  } 
  else if(currentUser.role === "user") {
  adminMenu.forEach(e => e.style.display = 'none');
  userMenu.forEach(e => e.style.display = 'block');
  } 
  