let emeraldToggleBtn = document.getElementById("emerald-toggle-btn"),
  lavenderToggleBtn = document.getElementById("lavender-toggle-btn"),
  tumbleweedToggleBtn = document.getElementById("tumbleweed-toggle-btn"),
  pinkToggleBtn = document.getElementById("pink-toggle-btn");

let firstColors = document.getElementsByClassName("first-color"),
  secondColors = document.getElementsByClassName("second-color"),
  thirdColors = document.getElementsByClassName("third-color"),
  fourthColors = document.getElementsByClassName("fourth-color");

let toggleBtns = document.querySelectorAll(".toggle");

toggleBtns.forEach(function (toggleBtn) {
  toggleBtn.addEventListener("mouseout", function () {
    toggleBtn.style.boxShadow = "none";
  });

  toggleBtn.addEventListener("mouseover", function () {
    toggleBtn.style.boxShadow =
      "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset";
  });
});

emeraldToggleBtn.addEventListener("click", function () {
  for (let i = 0; i < firstColors.length; i++) {
    firstColors[i].style.backgroundColor = "#3d8d7a";
  }
  for (let i = 0; i < secondColors.length; i++) {
    secondColors[i].style.backgroundColor = "#b3d8a8";
  }
  for (let i = 0; i < thirdColors.length; i++) {
    thirdColors[i].style.color = "#fbffe4";
  }
  for (let i = 0; i < fourthColors.length; i++) {
    fourthColors[i].style.color = "#a3d1c6";
  }

  emeraldToggleBtn.style.opacity = "1";
  lavenderToggleBtn.style.opacity = "0.5";
  tumbleweedToggleBtn.style.opacity = "0.5";
  pinkToggleBtn.style.opacity = "0.5";
});

lavenderToggleBtn.addEventListener("click", function () {
  for (let i = 0; i < firstColors.length; i++) {
    firstColors[i].style.backgroundColor = "#2d336b";
  }
  for (let i = 0; i < secondColors.length; i++) {
    secondColors[i].style.backgroundColor = "#7886c7";
  }
  for (let i = 0; i < thirdColors.length; i++) {
    thirdColors[i].style.color = "#fff2f2";
  }
  for (let i = 0; i < fourthColors.length; i++) {
    fourthColors[i].style.color = "#a9b5df";
  }

  lavenderToggleBtn.style.opacity = "1";
  emeraldToggleBtn.style.opacity = "0.5";
  tumbleweedToggleBtn.style.opacity = "0.5";
  pinkToggleBtn.style.opacity = "0.5";
});

tumbleweedToggleBtn.addEventListener("click", function () {
  for (let i = 0; i < firstColors.length; i++) {
    firstColors[i].style.backgroundColor = "#dca47c";
  }
  for (let i = 0; i < secondColors.length; i++) {
    secondColors[i].style.backgroundColor = "#ffd3b6";
  }
  for (let i = 0; i < thirdColors.length; i++) {
    thirdColors[i].style.color = "#fcf8f3";
  }
  for (let i = 0; i < fourthColors.length; i++) {
    fourthColors[i].style.color = "#FFF5D7";
  }

  lavenderToggleBtn.style.opacity = "0.5";
  emeraldToggleBtn.style.opacity = "0.5";
  tumbleweedToggleBtn.style.opacity = "1";
  pinkToggleBtn.style.opacity = "0.5";
});

pinkToggleBtn.addEventListener("click", function () {
  for (let i = 0; i < firstColors.length; i++) {
    firstColors[i].style.backgroundColor = "#fba1b7";
  }
  for (let i = 0; i < secondColors.length; i++) {
    secondColors[i].style.backgroundColor = "#ffd1da";
  }
  for (let i = 0; i < thirdColors.length; i++) {
    thirdColors[i].style.color = "#fff0f5";
  }
  for (let i = 0; i < fourthColors.length; i++) {
    fourthColors[i].style.color = "#FFE3E3";
  }

  lavenderToggleBtn.style.opacity = "0.5";
  emeraldToggleBtn.style.opacity = "0.5";
  tumbleweedToggleBtn.style.opacity = "0.5";
  pinkToggleBtn.style.opacity = "1";
});

let playerDivs = document.querySelectorAll(".player-div");

playerDivs.forEach(function (playerDiv) {
  playerDiv.addEventListener("click", function () {
    let playerHint = playerDiv.querySelector(".desc");

    // Toggle visibility of the hint
    if (
      playerHint.style.visibility === "visible" ||
      playerHint.style.visibility === ""
    ) {
      playerHint.style.visibility = "hidden";

      //   Messi
      if (playerDiv.id === "messi-div") {
        playerDiv.style.backgroundImage =
          "url(https://b.fssta.com/uploads/application/soccer/headshots/711.vresize.350.350.medium.24.png)";
        //   Lebron James
      } else if (playerDiv.id === "lebron-div") {
        playerDiv.style.backgroundImage =
          "url(https://www.proballers.com/media/cache/resize_600_png/https---www.proballers.com/ul/player/backup/lebron-james-1ef4d09f-cd70-6278-82d8-11019d1b5fa4.png)";
        //   Roger Federer
      } else if (playerDiv.id === "roger-div") {
        playerDiv.style.backgroundImage =
          "url(https://www.pngall.com/wp-content/uploads/9/Roger-Federer-Background-PNG.png)";
        //   Tom Brady
      } else if (playerDiv.id === "tom-div") {
        playerDiv.style.backgroundImage =
          "url(https://www.bocaratontribune.com/wp-content/uploads/2022/08/n7fj5fjblf6pdgjdtphr.png)";
        //   Shohei Ohtani
      } else if (playerDiv.id === "shohei-div") {
        playerDiv.style.backgroundImage =
          "url(https://b.fssta.com/uploads/application/mlb/headshots/9355.vresize.350.350.medium.91.png)";
        //   Tiger Woods
      } else if (playerDiv.id === "tiger-div") {
        playerDiv.style.backgroundImage = "url(./images/tiger.png)";
        // Simone Biles
      } else if (playerDiv.id === "simone-div") {
        playerDiv.style.backgroundImage = "url(./images/simone.png)";
        // Kelly Slater
      } else if (playerDiv.id === "kelly-div") {
        playerDiv.style.backgroundImage = "url(./images/kelly.png)";
      } else if (playerDiv.id === "lewis-div") {
        playerDiv.style.backgroundImage = "url(./images/lewis.png)";
      }
    } else {
      playerHint.style.visibility = "visible";
      playerDiv.style.backgroundImage = "none";
    }
  });
});
