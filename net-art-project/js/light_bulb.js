/* Start of JavaScript Coding... */

const {
  gsap: { set, to, timeline, bounce, elastic },
  Draggable,
} = window;

// Used to calculate distance of "tug"
let startX;
let startY;

const AUDIO = {
  CLICK: new Audio("https://assets.codepen.io/605876/click.mp3"),
};

const STATE = {
  ON: false,
};

const CORD_DURATION = 0.2;

const CORDS = document.querySelectorAll(".toggle-scene__cord");
const HIT = document.querySelector(".toggle-scene__hit-spot");
const DUMMY = document.querySelector(".toggle-scene__dummy-cord");
const DUMMY_CORD = document.querySelector(".toggle-scene__dummy-cord line");
const LIGHT_BULB_CONTAINER = document.querySelector(".theme");
const CHARS = document.querySelectorAll(".path-div__btn.char");
const videoFrame = document.getElementById("video-frame");
const UNCHARS = document.querySelectorAll(".path-div__btn.unchar");
const PROXY = document.createElement("div");
const frameDiv = document.getElementById("btns-frame");

// set init position
const ENDX = DUMMY_CORD.getAttribute("x2");
const ENDY = DUMMY_CORD.getAttribute("y2");

const RESET = () => {
  set(PROXY, {
    x: ENDX,
    y: ENDY,
  });
};

RESET();

// Elastic cord animation without MorphSVG
const CORD_TL = timeline({
  paused: true,
  onStart: () => {
    STATE.ON = !STATE.ON;
    set(document.documentElement, { "--on": STATE.ON ? 1 : 0 });
    set([DUMMY, HIT], { display: "none" });
    set(CORDS[0], { display: "block" });
    AUDIO.CLICK.play();

    if (STATE.ON) {
      LIGHT_BULB_CONTAINER.classList.add("on");
      CHARS.forEach((CHAR) => CHAR.classList.add("on"));
      UNCHARS.forEach((UNCHAR) => UNCHAR.classList.add("on"));
      if (videoFrame.style.display === "block") {
        videoFrame.style.display = "none";
        frameDiv.style.border = "0.5px solid var(--feldspar-color)";
        CORD_TL.restart();
      }
    } else {
      LIGHT_BULB_CONTAINER.classList.remove("on");
      CHARS.forEach((CHAR) => CHAR.classList.remove("on"));
      UNCHARS.forEach((UNCHAR) => UNCHAR.classList.remove("on"));
      if (videoFrame.style.display === "block") {
        videoFrame.style.display = "none";
        frameDiv.style.border = "0.5px solid var(--feldspar-color)";
      }
    }

    CHARS.forEach((CHAR) => {
      CHAR.addEventListener("click", () => {
        videoFrame.style.display = "block";
        frameDiv.style.border = "none";
      });
    });
  },
  onComplete: () => {
    set([DUMMY, HIT], { display: "block" });
    set(CORDS[0], { display: "none" });
    RESET();
  },
});

// Elastic animation for the cord
const MAX_STRETCH = 40; // Max stretch distance in pixels

CORD_TL.to(DUMMY_CORD, {
  attr: { y2: parseFloat(ENDY) + MAX_STRETCH }, // Stretch down
  duration: CORD_DURATION,
  ease: "elastic.out(1, 0.5)", // Elastic easing for stretchy effect
  yoyo: true,
  repeat: 1,
});

Draggable.create(PROXY, {
  trigger: HIT,
  type: "x,y",
  onPress: (e) => {
    startX = e.x;
    startY = e.y;
  },
  onDrag: function () {
    set(DUMMY_CORD, {
      attr: {
        x2: this.x,
        y2: this.y,
      },
    });
  },
  onRelease: function (e) {
    const DISTX = Math.abs(e.x - startX);
    const DISTY = Math.abs(e.y - startY);
    const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);
    to(DUMMY_CORD, {
      attr: { x2: ENDX, y2: ENDY },
      duration: CORD_DURATION,
      ease: "elastic.out(1, 0.5)", // Apply elastic effect on release
      onComplete: () => {
        if (TRAVELLED > 50) {
          CORD_TL.restart();
        } else {
          RESET();
        }
      },
    });
  },
});

/* END of JavaScript Coding... */
