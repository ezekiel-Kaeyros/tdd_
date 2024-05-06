let id = null;
let role = null;
function deleteUser(id, role) {
  id = id;
  role = role;
  open_alert(id, role);
}

function removeUser(id, role) {
  let URL = `/users/delete/${id}/user`;
  if (role == 0) {
    notification(`permission denied  to remove super admin `, "#23a3f8");
    return;
  } else {
    try {
      fetch(URL, {
        method: "POST",
        body: { id: id },
      })
        .then((res) => res.json())
        .then((myJson) => {
          console.log(myJson);
          notification(`user removed`, "#23a3f8");
          // document.getElementById("id01").style.display = "none";
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

function displayDetails(user_id) {
  let URL = `/users/user/${user_id}`;
  window.open(URL, "_self");
}
