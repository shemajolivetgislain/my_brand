
let userList = JSON.parse(localStorage.getItem("users"))|| [],indexId = localStorage.getItem('editIndex') || 0;

document.getElementById('username').value = userList[indexId].username;
document.getElementById('email').value = userList[indexId].email;
document.getElementById('role').value = userList[indexId].role;
localStorage.setItem('blogs', JSON.stringify(userList));


function editUser(){
     userList[indexId].username = document.getElementById('username').value;
     userList[indexId].email = document.getElementById('email').value;
     userList[indexId].role = document.getElementById('role').value;
     localStorage.setItem('users',JSON.stringify(userList));
 }

 document.getElementById("edituser").addEventListener("click", function(event) {
    event.preventDefault(); // prevent the form from submitting
    editUser();
    window.location.href = "../dashboard/users.html"; // redirect to article.html
  });