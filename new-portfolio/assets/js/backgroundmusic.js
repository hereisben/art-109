let song = document.querySelector("#song");
let playButton = document.querySelector("#play-button");
let pauseButton = document.querySelector("#pause-button");

console.log("Background music loaded.");

playButton.addEventListener("click", function () {
  song.play();
  console.log("Background music is playing.");
});

pauseButton.addEventListener("click", function () {
  song.pause();
  console.log("Background music is paused.");
});
