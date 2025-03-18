document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const sectionLinks = document.querySelectorAll(".nav-links__btn");

  if (menuToggle && navLinks) {
    // Toggle navbar visibility
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active"); // Show/hide menu
    });

    // Hide navbar when a section link is clicked
    sectionLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active"); // Hide menu
      });
    });
  }
});
