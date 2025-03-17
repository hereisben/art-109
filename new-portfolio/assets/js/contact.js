document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.getElementById("contact-btn");
  const contactInfo = document.getElementById("contact-info");
  const blackOut = document.getElementById("blackout");

  contactBtn.addEventListener("click", () => {
    if (contactBtn.classList.contains("active")) {
      contactInfo.style.display = "block";
      blackOut.style.display = "block";

      setTimeout(() => {
        if (blackOut.style.display === "block") {
          blackOut.style.opacity = "1";
        }
      }, 300); // Ensures smooth fade-in
    } else {
      blackOut.style.opacity = "0";
    }
  });
});
