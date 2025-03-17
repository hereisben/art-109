document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links__btn");

  if (!document.querySelector(".nav-links__btn.active")) {
    document.querySelector(".nav-links__btn[href='#']").classList.add("active");
  }

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      navLink.classList.toggle("active");
    });
  });
});
