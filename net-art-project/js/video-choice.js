// const VIDEO_SOURCE = document.getElementById("video-source");
// const copaRUNNERUP_BTNS = document.querySelectorAll(".coparunnerup");
// const copaWINNER_BTNS = document.querySelectorAll(".copawinner");

// copaRUNNERUP_BTNS.forEach((copaRUNNERUP_BTN) => {
//   copaRUNNERUP_BTN.addEventListener("click", () => {
//     VIDEO_SOURCE.src =
//       "https://www.youtube.com/embed/_wmhadwpL7I?si=rHF5NIBsNJCf_CvP";
//   });
// });

// copaWINNER_BTNS.forEach((copaWINNER_BTN) => {
//   copaWINNER_BTN.addEventListener("click", () => {
//     VIDEO_SOURCE.src =
//       "https://www.youtube.com/embed/XR1ygMVRg9Y?si=cJr9tbqpyEA3BlVq";
//   });
// });

const VIDEO_SOURCE = document.getElementById("video-source");
const videoButtons = document.querySelectorAll(".coparunnerup, .copawinner");

// Hide the iframe initially
VIDEO_SOURCE.style.display = "none";

// Define a mapping of button classes to video URLs
const videoSources = {
  coparunnerup: "https://www.youtube.com/embed/_wmhadwpL7I?si=rHF5NIBsNJCf_CvP",
  copawinner: "https://www.youtube.com/embed/XR1ygMVRg9Y?si=cJr9tbqpyEA3BlVq",
};

// Add a single event listener to handle all video buttons
videoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const videoClass = [...button.classList].find((cls) =>
      Object.keys(videoSources).includes(cls)
    );

    if (videoClass) {
      VIDEO_SOURCE.style.display = "none"; // Hide while loading
      VIDEO_SOURCE.src = videoSources[videoClass];
    }
  });
});

// Display the iframe only when fully loaded
VIDEO_SOURCE.addEventListener("load", () => {
  VIDEO_SOURCE.style.display = "block";
});
