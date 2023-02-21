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
          <td class="action">
          <a href="../dashboard/edituser.html" class= "edit"></a>
          <a href="#" onclick="deleteBlog(${index})"><i class='bx bxs-trash'></i></a>
        </td>
        `;
        blogsTable.appendChild(tr);
      });
    } else {
      // display a message or placeholder content if there are no blogs
      blogsTable.innerHTML = '<tr><td colspan="6">No users found.</td></tr>';
    }
    let anchor = document.querySelectorAll('.edit');

    for(let i=0;i < anchor.length;i++){
      let edit = document.createElement("i");
      edit.setAttribute("class", "bx bxs-edit");
      edit.setAttribute("id",i)
      console.log(edit)
      anchor[i].appendChild(edit);
    }
    console.log(anchor.length)
    let edits = document.querySelectorAll('.bxs-edit');
    console.log(edits.length);
    for(let j = 0;j< edits.length;j++){
      edits[j].addEventListener('click',function(){
      let id = edits[j].getAttribute('id')
      localStorage.setItem('editIndex',id);
    })
  }
  }
  
  // call the displayBlogs function to populate the table
  displayUsers();