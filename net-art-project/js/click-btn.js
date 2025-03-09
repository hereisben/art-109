// Select all flag containers
const flagBtns = document.querySelectorAll(".path-div__btn");

flagBtns.forEach((flagBtn) => {
  flagBtn.addEventListener("click", function (e) {
    const btn = e.target;

    // Check if the clicked element is a button
    if (btn.classList.contains("char")) {
      const videoFrame = document.getElementById("video-frame");
      const frameDiv = document.getElementById("btns-frame");
      const LIGHT_BULB_CONTAINER = document.querySelector(
        ".light-bulb-container"
      );

      // frameDiv.style.border = "none";
      videoFrame.style.display = "block";
    }
  });
});
