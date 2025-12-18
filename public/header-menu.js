window.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggle || !navLinks) return;

  const updateAria = (expanded) => {
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    toggle.classList.toggle("open", isOpen);
    updateAria(isOpen);
  });

  // close menu on link click
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        toggle.classList.remove("open");
        updateAria(false);
      }
    });
  });
});
