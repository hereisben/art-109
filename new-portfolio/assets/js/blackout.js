const myName = document.querySelector(".myname"),
  blackoutDiv = document.getElementById("blackout");

if (myName) {
  myName.addEventListener("mouseenter", () => {
    blackoutDiv.style.opacity = "0";

    setTimeout(() => {
      if (blackoutDiv.style.opacity === "0") {
        blackoutDiv.style.display = "none";
      }
    }, 1500); // Wait for fade-out transition before hiding
  });
}

let inactivityTimer;

// Function to show the blackout
function showBlackout() {
  blackoutDiv.style.display = "block";

  setTimeout(() => {
    if (blackoutDiv.style.display === "block") {
      blackoutDiv.style.opacity = "1";
    }
  }, 1500);
}

// Function to reset inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(showBlackout, 10000); // 10 seconds
}

// Show blackout again when mouse leaves the name
myName.addEventListener("mouseleave", resetInactivityTimer);

// Reset inactivity timer on mouse move anywhere
document.addEventListener("mousemove", resetInactivityTimer);

// Start the initial inactivity timer
resetInactivityTimer();
