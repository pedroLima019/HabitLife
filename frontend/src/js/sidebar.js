const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");
const avatar = document.getElementById("avatar");
const avatarDrop = document.getElementById("avatar-dropdown");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

avatar.addEventListener("click", () => {
  avatarDrop.classList.toggle("show");
});

