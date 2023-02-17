document.addEventListener("DOMContentLoaded", function() {
    const currentlogin = document.getElementById('currentLogin');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentlogin.innerHTML = `${currentUser.username}`;
  });

  const user = JSON.parse(localStorage.getItem('users')) || [];
  
  // display blogs in the table
  function displayUsers() {
    const blogsTable = document.querySelector('tbody');
    blogsTable.innerHTML = '';
  
    if (user && user.length > 0) {
      user.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="picture">
            <p>${user.username}</p>
          </td>
          <td class="blog-title">
            <p>${user.email}</p>
          </td>
          <td class="author">
            <p>${user.role}</p>
          </td>
        `;
        blogsTable.appendChild(tr);
      });
    } else {
      // display a message or placeholder content if there are no blogs
      blogsTable.innerHTML = '<tr><td colspan="6">No users found.</td></tr>';
    }
  }
  
  // call the displayBlogs function to populate the table
  displayUsers();