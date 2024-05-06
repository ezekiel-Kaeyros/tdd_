// let user = localStorage.getItem("client");
// if (user) {
//   document.getElementById("content-auth").style.display = "none";
// } else {
//   document.getElementById("content-auth").style.display = "flex";
// }

async function signIn() {
  let email = document.getElementById("email").value;
  let passsword = document.getElementById("passsword").value;
  let client = console.log(email, passsword);
  // let user = users.filter(
  //   (user) => user.email == email && passsword == passsword
  // );
  let user = await loginUser(email, passsword);
  if (user && user.id) {
    localStorage.setItem("client", JSON.stringify(user));
    if (user["role"] == 0) {
      console.log("admin role start");
      window.location = "/admin";
      location.reload();
    }
    document.getElementById("content-auth").style.display = "none";
    notification(`WELCOME! ${user.username}`, "#23a3f8");
  } else {
    document.getElementById("message-login").style.display = "flex";
    notification("Authenfication Failed!", "#f82e2e");
  }
}

function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    let URL = `/auth/user/try/connect`;
    try {
      fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((user) => {
          resolve(user);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  });
}
function updateUser() {
  let user = JSON.parse(localStorage.getItem("client"));
  console.log(user);
  let URL = `/user/${user.id}`;
  window.open(URL, "_self");
}
function updatePassWord() {
  let oldPassWord = document.getElementById("oldpwd").value;
  let passsword = document.getElementById("pwd").value;
  let user = JSON.parse(localStorage.getItem("client"));
  user["oldpassword"] = oldPassWord;
  user["newpassword"] = passsword;
  let URL = `update_password`;
  try {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result["ok"]) {
          notification("Update sucessful!", "#23a3f8");
        } else {
          notification("Update failed !", "#f82e2e");
        }
      });
  } catch (error) {
    console.log(error);
  }
}
function disconnect() {
  // localStorage.removeItem("client");
  // location.reload();
  localStorage.removeItem("client");
  let URL = `/logout`;
  let user = JSON.parse(localStorage.getItem("client"));
  try {
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result["ok"]) {
          notification("Update sucessful!", "#23a3f8");
        } else {
          notification("Update failed !", "#f82e2e");
        }
        location.reload();
      });
  } catch (error) {
    console.log(error);
  }
}

function notification(msg, color) {
  // Get the snackbar DIV
  var x = document.createElement("div");

  // Add the "show" class to DIV
  x.className = "show";
  x.innerText = msg;
  x.style.backgroundColor = color;
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
