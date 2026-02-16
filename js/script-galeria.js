const images = Array.from(document.querySelectorAll(".gallery img"));
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("modalPrev");
const nextBtn = document.getElementById("modalNext");

let currentIndex = 0;
let scrollY = 0;

/* Bloquear scroll del fondo sin tocar el viewport */
function lockScroll() {
  scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}

function unlockScroll() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollY);
}

function showImage(index) {
  if (!images.length) return;

  // wrap-around (si llega al final regresa al inicio)
  currentIndex = (index + images.length) % images.length;

  const img = images[currentIndex];
  const full = img.dataset.full || img.src;

  modalImg.src = full;
  modalImg.alt = img.alt || "Imagen ampliada";
}

function openModal(index) {
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  lockScroll();
  showImage(index);
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  unlockScroll();
}

/* Abrir modal al click */
images.forEach((img, i) => {
  img.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(i);
  });
});

/* Flechas */
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showImage(currentIndex - 1);
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showImage(currentIndex + 1);
});

/* Cerrar */
closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeModal();
});

/* Click en fondo cierra */
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

/* Teclado: ESC y flechas */
window.addEventListener("keydown", (e) => {
  if (modal.style.display !== "flex") return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  if (e.key === "ArrowRight") showImage(currentIndex + 1);
});