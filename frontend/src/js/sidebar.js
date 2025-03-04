const menuBtn = document.getElementById("menu-btn");
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");
const desktopAvatar = document.getElementById("desktop-avatar");
const desktopDropdown = document.getElementById("desktop-dropdown");
const mobileAvatar = document.getElementById("mobile-avatar");
const mobileDropdown = document.getElementById("mobile-dropdown");

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("opacity-100");

  if (isOpen) {
    mobileMenu.classList.remove(
      "opacity-100",
      "pointer-events-auto",
      "translate-y-0"
    );
    mobileMenu.classList.add(
      "opacity-0",
      "pointer-events-none",
      "-translate-y-5"
    );
    menuIcon.textContent = "menu";
  } else {
    mobileMenu.classList.remove(
      "opacity-0",
      "pointer-events-none",
      "-translate-y-5"
    );
    mobileMenu.classList.add(
      "opacity-100",
      "pointer-events-auto",
      "translate-y-0"
    );
    menuIcon.textContent = "close";
  }
});

function toggleDropdown(avatar, dropdown) {
  dropdown.classList.toggle("hidden");
}

desktopAvatar.addEventListener("click", () => {
  toggleDropdown(desktopAvatar, desktopDropdown);
});

mobileAvatar.addEventListener("click", () => {
  toggleDropdown(mobileAvatar, mobileDropdown);
});

document.addEventListener("click", () => {
  if (
    !desktopAvatar.contains(event.target) &&
    !desktopDropdown.contains(event.target)
  ) {
    desktopDropdown.classList.add("hidden");
  }

  if (
    !mobileAvatar.contains(event.target) &&
    !mobileDropdown.contains(event.target)
  ) {
    mobileDropdown.classList.add("hidden");
  }
});
