const menuIcon = document.getElementById("menu-icon")
const navLinks = document.getElementById("nav-links")
const avatar = document.getElementById("avatar")

menuIcon.addEventListener("click", () => {
   navLinks.classList.toggle("show")
})
