const logoImg = document.getElementById("logo-img") as HTMLImageElement | null;

const setLogoSrc = (theme: string) => {
  if (logoImg) logoImg.src = theme === "dark" ? "/favicon.png" : "/favicon-light.png";
};

setLogoSrc(document.documentElement.getAttribute("data-theme") ?? "light");

const themeToggle = document.getElementById("theme-toggle");
themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  setLogoSrc(next);
});
