// display blogs in boxes
function displayBox() {
  const blogContainer = document.querySelector("#post");
  blogContainer.innerHTML = "";
  fetch("https://my-brand-api-wm4u.onrender.com/api/blogs")
    .then((response) => response.json())
    .then((blogs) => {
      console.log(blogs.data);
      const fetchBlogs = blogs.data;

      if (fetchBlogs && fetchBlogs.length > 0) {
        fetchBlogs.forEach((blog) => {
          const blogBox = document.createElement("div");
          const createdAt = new Date(blog.createdAt);
          blogBox.classList.add("post-box");
          blogBox.innerHTML = `
        <img src="${blog.image}" alt="" class="post-img">
        <h2 class="category">Category:    ${blog.category}</h2>
        <a href="blog-details.html" class="post-title">
          ${blog.title}
        </a>
        <span class="post-date">Date ${createdAt.getDate()}-${
            createdAt.getMonth() + 1
          }-${createdAt.getFullYear()}</span>
        <p class="post-description">${blog.body}</p>
        <div class="profile">
          <img src="https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png" alt="" class="profile-img">
          <span class="profile-name">Published by ${blog.author}</span>
        </div>
        <div class="blog-btn">
          <a href="blog-details.html?id=${
            blog._id
          }" class="blog-button">Read more</a>
        </div>
      `;
          blogContainer.appendChild(blogBox);
        });
      } else {
        // display a message or placeholder content if there are no blogs
        blogContainer.innerHTML = "<p>No blogs found.</p>";
      }
    });
}

// call the displayBox function to populate the blog container
displayBox();

// display blogs in the table
// function displayBlogs() {
//   const blogsCard = document.querySelector('post-box');
//   blogsCard.innerHTML = '';

//   if (blogs && blogs.length > 0) {
//     blogs.forEach((blog, index) => {
//       const tr = document.createElement('tr');
//       tr.innerHTML = `
//         <td class="picture">
//           <img src="${blog.picture}" alt="">
//         </td>
//         <td class="blog-title">
//           <p>${blog.title}</p>
//         </td>
//         <td class="author">
//           <p>${blog.category}</p>
//         </td>
//         <td class="date">
//           <p>${blog.date}</p>
//         </td>
//         <td class="status">
//           <p>${blog.statuse}</p>
//         </td>
//         <td class="action">
//           <a href="edit.html?id=${blog.id}"><i class='bx bxs-edit'></i></a
//           <a href="#" onclick="deleteBlog(${index})"><i class='bx bxs-trash'></i></a>
//         </td>
//       `;
//       blogsTable.appendChild(tr);
//     });
//   } else {
//     // display a message or placeholder content if there are no blogs
//     blogsTable.innerHTML = '<tr><td colspan="6">No blogs found.</td></tr>';
//   }
// }

// // call the displayBlogs function to populate the table
// displayBlogs();
