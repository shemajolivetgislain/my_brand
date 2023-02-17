document.addEventListener("DOMContentLoaded", function() {
    const currentlogin = document.getElementById('currentLogin');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentlogin.innerHTML = `${currentUser.username}`;
  });

  const queries = JSON.parse(localStorage.getItem('query')) || [];
  
  // display blogs in the table
  function displayQueries() {
    const blogsTable = document.querySelector('tbody');
    blogsTable.innerHTML = '';
  
    if (queries && queries.length > 0) {
        queries.forEach((query, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="picture">
            <p>${query.names}</p>
          </td>
          <td class="blog-title">
            <p>${query.email}</p>
          </td>
          <td class="author">
            <p>${query.subject}</p>
          </td>
          <td class="author">
          <p>${query.body}</p>
        </td>
        `;
        blogsTable.appendChild(tr);
      });
    } else {
      // display a message or placeholder content if there are no blogs
      blogsTable.innerHTML = '<tr><td colspan="6">No Queries found.</td></tr>';
    }
  }
  
  // call the displayBlogs function to populate the table
  displayQueries();