let socket;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noScroll();
  background(51);

  socket = io.connect("http://localhost:3000");
  socket.on("mouse", (data) => {
    noStroke();
    fill(255, 120, 9);
    ellipse(data.x, data.y, 30, 30);
  });
}

function draw() {}

function mouseDragged() {
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 30, 30);

  let data = {
    x: mouseX,
    y: mouseY,
  };

  console.log("Sending: " + mouseX + " " + mouseY);
  socket.emit("mouse", data);
}

function noScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.margin = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(51);
}
