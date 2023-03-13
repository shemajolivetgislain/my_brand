// function deleteQuery(id) {
//   let authToken = JSON.parse(localStorage.getItem("authToken"));
//   fetch(`https://my-brand-api-wm4u.onrender.com/api/queries/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${authToken.token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
