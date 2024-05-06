var configfile = "{{configfile}}";
const modal = document.querySelector(".config-modal");
const overlay = document.querySelector(".overlay");
const openModal = function (data, key) {
  var number = 5;
  var container = document.getElementById("custom-modal");
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  let user = JSON.parse(localStorage.getItem("client"));
  if (user) {
    let found = false;
    let val = "";
    for (const prop in data) {
      if (prop == user.company) {
        found = true;
        console.log("value icicicii=======", prop);
        val = prop;
      }
    }

    if (found) {
      console.log(`${val} ===>>> ${user.company}`);
      let title = `${val} Config parameter`;
      var h = document.createElement("h5");
      h.innerText = title;
      h.style.display = "block";
      h.style.textTransform = "uppercase";
      h.style.fontWeight = "bold";
      container.appendChild(h);
      // container.appendChild(document.createTextNode(title));
      // Create an <input> element, set its type and name attributes
      var input = document.createElement("input");
      let save_btn = document.createElement("button");
      let div_container = document.createElement("div");
      div_container.setAttribute("key", val);
      input.type = "text";
      input.name = "member" + val;
      input.value = data[val];
      input.setAttribute("hello", data[val]);
      input.setAttribute("id", val);
      input.style.width = "85%";
      save_btn.style.marginLeft = "20px";
      save_btn.textContent = "save";
      div_container.appendChild(input);
      div_container.appendChild(save_btn);
      container.appendChild(div_container);

      // Append a line break
      container.appendChild(document.createElement("br"));
      save_btn.addEventListener("click", (e) => {
        e.stopPropagation();
        var p = document.getElementById("input-container");
        var inp = document.getElementById(val);

        data[val] = inp.value;
        let user = JSON.parse(localStorage.getItem("client"));
        let URL = `/admin/tso/update_config?key=${key}&email=${user.email}`;
        try {
          fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((resultat) => {
              console.log(resultat);
              closeModal();
            });
        } catch (error) {
          console.log(error);
        }
      });
      //
      modal.style.display = "block";
      overlay.classList.remove("hidden");
    } else {
      notification(`not value for this key !!! `, "#23a3f8");
    }
    // Append a node with a random text
  }

  // modal.classList.remove("hidden");
  // modal.style.display = "block";
  // overlay.classList.remove("hidden");
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
