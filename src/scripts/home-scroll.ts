document.querySelectorAll("a[href='/']").forEach((tag) => {
  tag.addEventListener("click", (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.location.hash = "";
      window.history.replaceState({}, "", window.location.href.slice(0, -1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});
