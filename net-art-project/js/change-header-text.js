let toggle = false;

setInterval(() => {
  // const letterA = document.querySelectorAll(".letter-a"),
  (letterI = document.getElementById("letter-i")),
    (letterE = document.querySelectorAll(".letter-e"));
  letterI.innerHTML = toggle ? "i" : "𝒠";

  Array.from(letterE).forEach((el) => {
    el.innerHTML = toggle ? "e" : "𝒠";
  });

  // letterI.forEach((il) => {
  //   il.innerHTML = toggle ? "i" : "𝒠";
  // });

  toggle = !toggle;
}, 1000);
