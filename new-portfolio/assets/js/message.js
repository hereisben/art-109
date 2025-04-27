document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".menu-cell_link");
  const messageContainer = document.getElementById("message-div");
  const messageLabel = document.getElementById("message-label");
  const messageText = document.getElementById("message-text");
  const closeMessage = document.getElementById("close-message");

  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior

      menuLinks.forEach((otherLink) => {
        otherLink.classList.remove("active");
      });
      // Get message from data attribute
      const message = link.getAttribute("data-message");
      const label = link.getAttribute("data-label");
      const liveUrl = link.getAttribute("data-link");
      link.classList.add("active");

      // Update and show message container
      messageText.textContent = message;
      messageLabel.textContent = label;
      messageLabel.setAttribute("href", liveUrl);
      if (messageLabel.textContent != "Coming Soon") {
        messageLabel.setAttribute("target", "_blank");
        messageLabel.style.pointerEvents = "auto";
      } else {
        messageLabel.style.pointerEvents = "none";
      }

      messageContainer.classList.add("active");
    });
  });

  // Close button functionality
  closeMessage.addEventListener("click", () => {
    messageContainer.classList.remove("active");
    menuLinks.forEach((link) => {
      link.classList.remove("active");
    });
  });

  // Hide message when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !messageContainer.contains(event.target) &&
      !event.target.classList.contains("menu-cell_link")
    ) {
      messageContainer.classList.remove("active");
    }
  });
});
