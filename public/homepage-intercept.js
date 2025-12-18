window.addEventListener("DOMContentLoaded", () => {
  const tags = document.querySelectorAll("a[href='/']");
  tags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      if (window.location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });
});
