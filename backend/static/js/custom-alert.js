let div = document.createElement("div");
div.classList.add("alert-overlay");
div.classList.add("alert-hidden");
const alert_modal = document.querySelector(".alert-modal");
const alert_overlay = document.querySelector(".alert-overlay");
const alert_openModalBtn = document.querySelector(".alert-btn-open");
const alert_closeModalBtn = document.querySelector(".alert-btn-close");
const alert_DeleteUserBtn = document.querySelector(".alert-btn-confirm");
let iduser = "";
let roleuser = 5;
const open_alert = function (id, role) {
  iduser = id;
  roleuser = role;
  alert_modal.classList.remove("alert-hidden");
  alert_overlay.classList.remove("alert-hidden");
};

const closeModalAlert = function () {
  alert_modal.classList.add("hidden");
  alert_overlay.classList.add("hidden");
};

if (alert_closeModalBtn) {
  alert_closeModalBtn.addEventListener("click", () => {
    alert_modal.classList.add("alert-hidden");
    alert_overlay.classList.add("alert-hidden");
  });
}
if (alert_DeleteUserBtn) {
  alert_DeleteUserBtn.addEventListener("click", () => {
    alert_modal.classList.add("alert-hidden");
    alert_overlay.classList.add("alert-hidden");
    console.log("deleteuser", iduser, roleuser);
    removeUser(iduser, roleuser);
  });
}
if (alert_overlay) {
  alert_overlay.addEventListener("click", closeModalAlert);
}
