const socket = io();
const users = {};
let activeTime = 0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const avatarType = prompt("Choose your avatar: plant / animal / moon");
const validTypes = ["plant", "animal", "moon"];
const finalType = validTypes.includes(avatarType)
  ? avatarType
  : validTypes[Math.floor(Math.random() * validTypes.length)];
document.getElementById(
  "avatarText"
).textContent = `You’re growing a ${finalType}!`;
const mood = prompt("What's your vibe right now?");

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function getGrowthEmoji(t, type) {
  const sets = {
    plant: ["🌱", "🌿", "🌳", "🌻"],
    animal: ["🐭", "🐹", "🐱", "🐯"],
    moon: ["🌑", "🌓", "🌕", "🌙"],
  };

  // If invalid type or "random", pick one of the 3 sets randomly
  const validTypes = Object.keys(sets);
  const chosenType = validTypes.includes(type)
    ? type
    : validTypes[Math.floor(Math.random() * validTypes.length)];
  const selectedSet = sets[chosenType];

  if (t > 1000) return selectedSet[3];
  if (t > 500) return selectedSet[2];
  if (t > 100) return selectedSet[1];
  return selectedSet[0];
}

function drawUser(x, y, emoji, alpha = 1, identity = {}) {
  ctx.globalAlpha = alpha;

  // Draw mood/status box above the emoji
  if (identity.mood) {
    const text = identity.mood;
    ctx.font = "18px sans-serif";
    ctx.textAlign = "center";

    // Measure text size
    const textWidth = ctx.measureText(text).width;
    const boxWidth = textWidth + 16;
    const boxHeight = 26;
    const boxX = x + 55 - boxWidth / 2;
    const boxY = y - 70;

    // Draw black rounded rectangle background
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, 6);
    ctx.fill();

    // Draw mood text
    ctx.fillStyle = "white";
    ctx.fillText(text, x + 55, boxY + 18);
  }

  // Draw the emoji
  ctx.font = "50px sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "start";
  ctx.fillText(emoji, x, y);

  ctx.globalAlpha = 1;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = Date.now();

  for (const id in users) {
    const user = users[id];
    const secondsSinceSeen = (now - user.lastSeen) / 1000;
    const alpha =
      secondsSinceSeen < 15
        ? 1
        : Math.max(0.3, 1 - (secondsSinceSeen - 15) / 60);
    drawUser(user.x, user.y, user.growth, alpha, user.identity);
  }
  requestAnimationFrame(draw);
}
draw();

socket.on("existing users", (existing) => {
  for (const id in existing) {
    users[id] = existing[id];
  }
});

socket.on("cursor update", (data) => {
  users[data.id] = {
    ...data,
    lastSeen: Date.now(),
    identity: data.identity || {},
  };
});

socket.on("connect", () => {
  document.addEventListener("mousemove", (e) => {
    activeTime += 1;
    const data = {
      x: e.clientX,
      y: e.clientY,
      growth: getGrowthEmoji(activeTime, finalType),
      lastSeen: Date.now(),
      identity: {
        avatarType,
        mood,
      },
    };
    // Update growth progress bar
    const percent = Math.min(activeTime / 1000, 1);
    if (activeTime < 1000) {
      document.getElementById(
        "growthLabel"
      ).textContent = `${activeTime} / 1000`;
    } else {
      document.getElementById("growthLabel").textContent = `1000 / 1000`;
    }

    // Update each segment width
    document.getElementById("bar1").style.width = `${
      Math.min(percent, 0.25) * 100
    }%`;
    document.getElementById("bar2").style.width = `${
      Math.max(Math.min(percent - 0.25, 0.25), 0) * 100
    }%`;
    document.getElementById("bar3").style.width = `${
      Math.max(Math.min(percent - 0.5, 0.25), 0) * 100
    }%`;
    document.getElementById("bar4").style.width = `${
      Math.max(Math.min(percent - 0.75, 0.25), 0) * 100
    }%`;
    socket.emit("cursor update", data);
    users[socket.id] = data;
  });
});

const input = document.getElementById("whisperInput");
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    socket.emit("whisper", input.value.trim());
    input.value = "";
  }
});

socket.on("whisper", (msg) => showWhisper(msg.text));

function showWhisper(text) {
  const div = document.createElement("div");
  div.textContent = text;
  div.className = "whisper";
  document.body.appendChild(div);
  div.style.left = Math.random() * window.innerWidth + "px";
  div.style.top = Math.random() * window.innerHeight + "px";
  setTimeout(() => div.remove(), 5000);
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
