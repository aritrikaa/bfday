var USERNAME = "RIDHANSHU";
var PASSWORD = "ridhanshu";


var overlay = document.getElementById("overlay");
var letter = document.getElementById("letter");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");
var foldBtn = document.getElementById("foldBtn");


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

function openLetter() {
  overlay.classList.add("open");
  setTimeout(function () { closeBtn.focus(); }, 500);
}
function closeLetter() {
  overlay.classList.remove("open");
  openBtn.focus();
}
openBtn.addEventListener("click", openLetter);
closeBtn.addEventListener("click", closeLetter);
foldBtn.addEventListener("click", closeLetter);
overlay.addEventListener("click", function (e) { if (e.target === overlay) closeLetter(); });
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeLetter();
});

/* ================================
 MUSIC
   Put music.mp3 next to index.html (or change src in index.html).
================================ */
var song = document.getElementById("song");
var musicBtn = document.getElementById("musicBtn");
var note = document.getElementById("musicNote");
var songMissing = false;
song.addEventListener("error", function () { songMissing = true; });

function showNote(text) {
  note.textContent = text;
  setTimeout(function () { note.textContent = ""; }, 2500);
}
musicBtn.addEventListener("click", function () {
  if (songMissing) { showNote("add music.mp3 to play a song ♡"); return; }
  if (song.paused) {
    var result = song.play();
    if (result && result.then) {
      result.then(function () { musicBtn.setAttribute("aria-pressed", "true"); })
            .catch(function () { showNote("add music.mp3 to play a song ♡"); });
    }
  } else {
    song.pause();
    musicBtn.setAttribute("aria-pressed", "false");
  }
});

var loginView = document.getElementById("loginView");
var loginForm = document.getElementById("loginForm");
var userInput = document.getElementById("user");
var passInput = document.getElementById("pass");
var loginError = document.getElementById("loginError");
var loginCard = document.getElementById("loginCard");
var lseal = document.getElementById("lseal");
var mainScene = document.getElementById("mainScene");

userInput.focus();

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (userInput.value.trim() === USERNAME && passInput.value === PASSWORD) {
    loginError.textContent = "";
    loginCard.classList.add("success");
    lseal.textContent = "✿";
    setTimeout(function () {
      loginView.classList.add("unlocked");
      mainScene.removeAttribute("inert");
      openBtn.focus({ preventScroll: true });
    }, 900);
  } else {

    loginError.textContent = "oy rangdar, hint check karrrr ♡";
    loginCard.classList.remove("shake");
    void loginCard.offsetWidth;
    loginCard.classList.add("shake");
    passInput.value = "";
    passInput.focus();
  }
});

