const menuBtn = document.getElementById('menu-btn');
        const menuIcon = document.getElementById('menu-icon');
        const mobileMenu = document.getElementById('mobile-menu');

        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains("opacity-100");

            if (isOpen) {
                mobileMenu.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
                mobileMenu.classList.add("opacity-0", "pointer-events-none", "-translate-y-5");
                menuIcon.textContent = "menu";
            } else {
                mobileMenu.classList.remove("opacity-0", "pointer-events-none", "-translate-y-5");
                mobileMenu.classList.add("opacity-100", "pointer-events-auto", "translate-y-0");
                menuIcon.textContent = "close";
            }
        });
