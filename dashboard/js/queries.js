document.addEventListener("DOMContentLoaded", function () {
  const currentlogin = document.getElementById("currentLogin");
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  console.log(authToken.username);
  currentlogin.innerHTML = `${authToken.username}`;
});

// delete article
function deleteQuery(id, tr) {
  console.log("Deleting blog post with ID: " + id);
  let authToken = JSON.parse(localStorage.getItem("authToken"));
  fetch(`https://my-brand-api-wm4u.onrender.com/api/queries/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${authToken.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // remove table row after deleting the blog post
      tr.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayQueries() {
  const queriesTable = document.querySelector("tbody");
  queriesTable.innerHTML = "";
  let authToken = JSON.parse(localStorage.getItem("authToken"));
  fetch("https://my-brand-api-wm4u.onrender.com/api/queries/messages", {
    headers: {
      Authorization: `Bearer ${authToken.token}`,
    },
  })
    .then((response) => response.json())
    .then((queries) => {
      console.log(queries);
      const fetchQueries = queries.data;
      if (fetchQueries && fetchQueries.length > 0) {
        fetchQueries.forEach((query, i) => {
          const tr = document.createElement("tr");
          const createdAt = new Date(query.createdAt);
          tr.innerHTML = `
        <td class="query-title">
        <p>${i + 1}</p>
        </td>
        <td class="query-title">
          <p>${query.names}</p>
        </td>
        <td class="query-title">
          <p>${query.email}</p>
        </td>
        <td class="author">
          <p>${query.subject}</p>
        </td>
        <td class="date">
        
          <p>${createdAt.getDate()}-${
            createdAt.getMonth() + 1
          }-${createdAt.getFullYear()}</p>
        </td>
        <td class="query-title">
          <p>${query.content}</p>
        </td>
        <td class="action">
          <a href="#"><i class='bx bxs-trash' onclick="if (window.confirm('Are you sure you want to delete this blog post?')) { deleteQuery('${
            query._id
          }', this.parentNode.parentNode) }"></i></a>
        </td>
      `;
          queriesTable.appendChild(tr);
        });
      } else {
        // display a message or placeholder content if there are no queries
        queriesTable.innerHTML =
          '<tr><td colspan="6">No queries found.</td></tr>';
      }
    });
}

displayQueries();
