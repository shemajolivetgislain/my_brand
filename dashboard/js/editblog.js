// const update = document.getElementById('update');
// let blogList = JSON.parse(localStorage.getItem("blogs"))|| [],indexId = localStorage.getItem('editIndex') || 0;

// document.getElementById('title').value = blogList[indexId].title;
// document.getElementById('date').value = blogList[indexId].date;
// document.getElementById('statuse').value = blogList[indexId].statuse;
// document.getElementById('category').value = blogList[indexId].category;
// document.getElementById('body').value = blogList[indexId].body;
// localStorage.setItem('blogs', JSON.stringify(blogList));


// function editblog(){
//      blogList[indexId].title = document.getElementById('title').value;
//      blogList[indexId].date = document.getElementById('date').value;
//      blogList[indexId].category = document.getElementById('category').value;
//      blogList[indexId].statuse = document.getElementById('statuse').value;
//      blogList[indexId].body = document.getElementById('body').value,
//      localStorage.setItem('blogs',JSON.stringify(blogList));
//      console.log(JSON.parse(localStorage.getItem('blogs')));
//      window.location.replace("../dashboard/article.html");
//  }

//  document.getElementById("update").addEventListener("click", function(event) {
//     event.preventDefault(); // prevent the form from submitting
//     editblog();
//     window.location.href = "../dashboard/article.html"; // redirect to article.html
//   });