const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const adminMenu = Array.from(document.getElementsByClassName("admin"));
const userMenu = Array.from(document.getElementsByClassName("user"));

let authToken = JSON.parse(localStorage.getItem("authToken"));

if (authToken.role === "admin") {
  adminMenu.forEach((e) => (e.style.display = "block"));
  userMenu.forEach((e) => (e.style.display = "block"));
} else if (authToken.role === "user") {
  adminMenu.forEach((e) => (e.style.display = "none"));
  userMenu.forEach((e) => (e.style.display = "block"));
}
