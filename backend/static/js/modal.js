// Get the modal
let modal = "";
function openModalError(data) {
  console.log(data);
  modal = document.getElementById("em");
  content = document.getElementById("error-content");
  const toppingsList = document.querySelector("#toppings-list");
  const ul = document.createElement("ul");
  const tilte = document.createElement("h3");
  tilte.innerText =
    "ERROR: Some variables do not have the confom format-name- Consult Information Button";

  let text = "";

  /*  data.forEach((error) => {
    text= text +" "+error
    const li = document.createElement("li");
    li.innerText = error;
    ul.appendChild(li);
  }); */
  console.log("hello data ===", data);
  let textError = data.join("; ");

  const div = document.createElement("div");
  const result = textError;
  div.innerText = result;
  content.appendChild(tilte);
  content.appendChild(div);
  //content.innerText = result
  // content.appendChild(ul);

  //   const modal = document.createElement("div");
  //   modal.classList.add("error-modal");
  //   modal.id = "modal";
  // modal.hidden = true;

  //   modal.innerHTML = `
  //   <div class="modalContent">
  //     <span class="close">&times;</span>
  //     <h2></h2>
  //     <p></p>
  //   </div>
  // `;
  modal.style.display = "block";
  modal.querySelector(".error-close").addEventListener("click", () => {
    modal.hidden = true;
  });
  // Get the button that opens the modal
  //   var btn = document.getElementById("myBtn");

  //   // Get the <span> element that closes the modal

  //   // When the user clicks anywhere outside of the modal, close it
  //   window.onclick = function (event) {
  //     if (event.target == modal) {
  //       modal.style.display = "none";
  //     }
  //   };
}
var span = document.getElementsByClassName("error-close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// };

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  location.reload();
};
