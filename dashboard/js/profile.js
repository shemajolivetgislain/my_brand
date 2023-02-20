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
          <a href="../dashboard/edit.html" class= "edit"></a>
          <a href="#" onclick="deleteBlog(${index})"><i class='bx bxs-trash'></i></a>
        </td>
      `;
      blogsTable.appendChild(tr);
    });
  } else {
    // display a message or placeholder content if there are no blogs
    blogsTable.innerHTML = '<tr><td colspan="6">No blogs found.</td></tr>';
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





//for(let i=0;)

// call the displayBlogs function to populate the table
displayBlogs();


// <i class='bx bxs-edit'></i>


function deleteBlog(index) {
  // remove the blog from the blogs array
  blogs.splice(index, 1);

  // update the table with the new list of blogs
  displayBlogs();

  // save the updated list of blogs to local storage
  localStorage.setItem('blogs', JSON.stringify(blogs));
}



//method to get detail personal data based on id
// function find(id){
//   //get data from localstorage and store to contaclist array
//   //we must to use JSON.parse, because data as string, we need convert to array
//   blogList = JSON.parse(localStorage.getItem('blogs')) || []

//   blogList.forEach(function (value, id){
//       if(value.id == id){
//          document.getElementById('id').value = value.id
//          console.log(value.id)
//          document.getElementById('title').value = value.title
//          document.getElementById('date').value = value.date
//          document.getElementById('picture').value = value.picture
//          document.getElementById('statuse').value = value.statuse
//          document.getElementById('category').value = value.category
//          document.getElementById('body').value = value.body
//       }
//   })
// }



// function editBlog(index) {
// const blog = blogs[index];
// const editForm = document.getElementById('editForm');
// editForm.title.value = blog.title;
// editForm.date.value = blog.date;
// editForm.body.value = blog.body;
// editForm.category.value = blog.category;
// editForm.status.value = blog.status;

// // save the updated blog to local storage
// editForm.addEventListener('submit', (event) => {
// event.preventDefault();
// blog.title = editForm.title.value;
// blog.date = editForm.date.value;
// blog.body = editForm.body.value;
// blog.category = editForm.category.value;
// blog.status = editForm.status.value;
// localStorage.setItem('blogs', JSON.stringify(blogs));
// window.location.replace("article.html");
// });
// }

// // get the blog ID from the URL and call the editBlog function
// const urlParams = new URLSearchParams(window.location.search);
// const blogId = urlParams.get('id');
// if (blogId !== null) {
// editBlog(blogId);
// }

