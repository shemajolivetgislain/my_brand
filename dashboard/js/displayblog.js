 //method to get all data
 function allData(){
            
    table.innerHTML = ``
    //get data from localstorage and store to contaclist array
    //we must to use JSON.parse, because data as string, we need convert to array
    // get blogs from local storage or initialize an empty array
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    //looping data and show data in table
        blogs.forEach(function (value, i){
       
        var table = document.getElementById('table')

        table.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${value.name}</td>
                <td>${value.age}</td>
                <td>${value.address}</td>
                <td>${value.phone}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="find(${value.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeData(${value.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`
    })
}

// get blogs from local storage or initialize an empty array
const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

// display blogs in the table
function displayBlogs() {
  const blogsTable = document.querySelector('tbody');
  blogsTable.innerHTML = '';

  if (blogs && blogs.length > 0) {
    blogs.forEach((blog, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="blog-title">
        <p>${i+1}</p>
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
          <a href="#"  onclick="find(${blog.id})"><i class='bx bxs-edit'></i></a>
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