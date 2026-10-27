const menuToggle = document.querySelector(".menu-toggle");
const header = menuToggle.closest("header");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  header.classList.toggle("menu-open", !isExpanded);
});

header.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    header.classList.remove("menu-open");
  });
});
