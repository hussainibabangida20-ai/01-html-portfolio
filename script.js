const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (menuToggle && header) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    header.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    header.classList.toggle("menu-open", !isExpanded);
  });

  header.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.body.classList.add("has-reveal");
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    revealObserver.observe(element);
  });
}

const customCursor = document.querySelector(".custom-cursor");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (customCursor && finePointer && !reducedMotion) {
  document.body.classList.add("has-custom-cursor");

  document.addEventListener("pointermove", (event) => {
    customCursor.style.transform = `translate3d(${event.clientX - 9}px, ${event.clientY - 9}px, 0)`;
    customCursor.classList.add("is-visible");
    customCursor.classList.toggle(
      "is-hovering",
      event.target instanceof Element && Boolean(event.target.closest("a, button, .skill-card"))
    );
  });

  document.addEventListener("pointerleave", () => {
    customCursor.classList.remove("is-visible", "is-hovering");
  });
}
