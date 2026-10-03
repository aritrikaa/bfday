/* ================================
   ✦ EDIT THIS: LOGIN DETAILS ✦
   Username and password (case-sensitive).
================================ */
var USERNAME = "RIDHANSHU";
var PASSWORD = "ridhanshu";

/* Where to go after a correct login (the main page is one folder up). */
var NEXT_PAGE = "../index.html";

/* ================================
   ELEMENTS
================================ */
var form = document.getElementById("loginForm");
var userInput = document.getElementById("user");
var passInput = document.getElementById("pass");
var errorBox = document.getElementById("error");
var card = document.getElementById("card");
var seal = document.getElementById("seal");

/* ================================
   BACKGROUND PARTICLES
================================ */
(function () {
  var box = document.getElementById("particles");
  var symbols = ["✿", "♡", "✦", "·", "❀"];
  for (var i = 0; i < 14; i++) {
    var p = document.createElement("span");
    p.className = "particle";
    p.textContent = symbols[i % symbols.length];
    p.style.left = Math.random() * 100 + "%";
    p.style.fontSize = 10 + Math.random() * 14 + "px";
    p.style.setProperty("--dx", Math.random() * 120 - 60 + "px");
    p.style.animationDuration = 18 + Math.random() * 18 + "s";
    p.style.animationDelay = -Math.random() * 30 + "s";
    box.appendChild(p);
  }
})();

/* ================================
   LOGIN CHECK
================================ */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var okUser = userInput.value.trim() === USERNAME;
  var okPass = passInput.value === PASSWORD;

  if (okUser && okPass) {
    try { sessionStorage.setItem("loggedIn", "yes"); } catch (err) {}
    errorBox.textContent = "";
    card.classList.add("success");
    seal.textContent = "✿";
    setTimeout(function () { window.location.href = NEXT_PAGE; }, 1100);
  } else {
    /* ✦ EDIT THIS: WRONG LOGIN MESSAGE ✦ */
    errorBox.textContent = "hmm, that's not quite right. check the hint below ♡";
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
    passInput.value = "";
    passInput.focus();
  }
});
