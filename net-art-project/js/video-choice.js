const VIDEO_SOURCE = document.getElementById("video-source");
const videoButtons = document.querySelectorAll(
  ".coparunnerup, .copawinner, .worldcupwinner, .psgtransfer, .firstballondor, .newell, .lamasia, .sextuple, .worldcuprunnerup, .firstgoal, .mlsmove, .olympic, .firstchampionleague, .barcelonadebut"
);

// Hide the iframe initially
VIDEO_SOURCE.style.display = "none";

// Define a mapping of button classes to video URLs
const videoSources = {
  coparunnerup: "https://www.youtube.com/embed/_wmhadwpL7I?si=rHF5NIBsNJCf_CvP",
  copawinner: "https://www.youtube.com/embed/XR1ygMVRg9Y?si=cJr9tbqpyEA3BlVq",
  worldcupwinner:
    "https://www.youtube.com/embed/ZmKy_fnRM_E?si=uydRPLN2vfzVECB8",
  psgtransfer: "https://www.youtube.com/embed/dTKl0pcC1a4?si=Xvk_v5D3BlsPwPhq",
  firstballondor:
    "https://www.youtube.com/embed/ghHyRqlbgCU?si=WT8WGMGmy6d4vkZv",
  newell: "https://www.youtube.com/embed/0j9POXpurPU?si=J8OAbbAenuV0ktGQ",
  lamasia: "https://www.youtube.com/embed/RaQvhgTu7QY?si=hK27GGK1n54LLP_B",
  sextuple: "https://www.youtube.com/embed/LdmVkqxqvrk?si=vXlGZbbKwM7qEHll",
  worldcuprunnerup:
    "https://www.youtube.com/embed/DFeu4QMYdwo?si=3fosvEXaTfcsP72l",
  firstgoal: "https://www.youtube.com/embed/j9ihJMqZGD0?si=MU_8MAV6OqvODekZ",
  mlsmove: "https://www.youtube.com/embed/esB0AkFIDeE?si=X5vgc1YySbaOEHk8",
  olympic: "https://www.youtube.com/embed/Dqevl3w0_6s?si=idJe55bWJGWFg94E",
  firstchampionleague:
    "https://www.youtube.com/embed/Uf-6aRJk8q0?si=9fzCLhaPboBZDTFh",
  barcelonadebut:
    "https://www.youtube.com/embed/5iWf1yczpTg?si=-oEme8b_lyLHyDUp",
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
