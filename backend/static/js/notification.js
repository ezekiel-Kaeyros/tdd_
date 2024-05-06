function notification(msg, color) {
  //closeModale();
  console.log("load notifcation========>", msg);
  let div = document.createElement("div");
  div.setAttribute("id", "notification");
  document.getElementsByTagName("body")[0].appendChild(div);
  var x = document.getElementById("notification");
  x.style.backgroundColor = color;
  x.style.zIndex = 200;
  x.innerText = msg;
  // Add the "show" class to DIV
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 6000);
}

console.log("launch notifcation script ======");
