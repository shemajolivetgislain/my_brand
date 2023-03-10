document.addEventListener("DOMContentLoaded", function () {
  const currentlogin = document.getElementById("currentLogin");
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  console.log(authToken.username);
  currentlogin.innerHTML = `${authToken.username}`;
});

function displayUsers() {
  const blogsTable = document.querySelector("tbody");
  blogsTable.innerHTML = "";
  let authToken = JSON.parse(localStorage.getItem("authToken"));
  fetch("https://my-brand-api-wm4u.onrender.com/api/users", {
    headers: {
      Authorization: `Bearer ${authToken.token}`,
    },
  })
    .then((response) => response.json())
    .then((users) => {
      console.log(users);
      const fetchUsers = users.data;
      if (fetchUsers && fetchUsers.length > 0) {
        fetchUsers.forEach((user, i) => {
          const tr = document.createElement("tr");
          const createdAt = new Date(user.createdAt);
          tr.innerHTML = `
        <td class="user-title">
        <p>${i + 1}</p>
        </td>

        <td class="picture">
          <img src="https://avatars.githubusercontent.com/u/23471007?v=4" alt="">
        </td>
        <td class="user-title">
          <p>${user.username}</p>
        </td>
        <td class="author">
          <p>${user.email}</p>
        </td>
        <td class="date">
        
          <p>${createdAt.getDate()}-${
            createdAt.getMonth() + 1
          }-${createdAt.getFullYear()}</p>
        </td>
        <td class="status">
          <p>${user.role}</p>
        </td>
        <td class="action">
          <a href="#"><i class='bx bxs-edit'></i></a>
          <a href="#"><i class='bx bxs-trash'></i></a>
        </td>
      `;
          blogsTable.appendChild(tr);
        });
      } else {
        // display a message or placeholder content if there are no users
        blogsTable.innerHTML = '<tr><td colspan="6">No users found.</td></tr>';
      }
    });
}

displayUsers();
