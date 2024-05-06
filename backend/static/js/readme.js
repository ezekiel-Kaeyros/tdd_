const readme_modal = document.querySelector(".readme-modal");
const readme_overlay = document.querySelector(".readme-overlay");
const readme_openModalBtn = document.querySelector(".readme-btn-open");
const readme_closeModalBtn = document.querySelector(".readme-btn-close");

const open_readme = function () {
  readme_modal.classList.remove("readme-hidden");
  readme_overlay.classList.remove("readme-hidden");
};

const closeModal = function () {
  readme_modal.classList.add("hidden");
  readme_overlay.classList.add("hidden");
};

readme_closeModalBtn.addEventListener("click", () => {
  readme_modal.classList.add("readme-hidden");
  readme_overlay.classList.add("readme-hidden");
});
readme_overlay.addEventListener("click", closeModal);
