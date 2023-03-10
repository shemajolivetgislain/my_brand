const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const adminMenu = Array.from(document.getElementsByClassName("admin"));
const userMenu = Array.from(document.getElementsByClassName("user"));


if(currentUser.role === "admin") {
  adminMenu.forEach(e => e.style.display = 'block');
  userMenu.forEach(e => e.style.display = 'block');
  } 
  else if(currentUser.role === "user") {
  adminMenu.forEach(e => e.style.display = 'none');
  userMenu.forEach(e => e.style.display = 'block');
  } 
  