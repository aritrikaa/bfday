/* ================================
   ✦ EDIT THIS: LOGIN DETAILS ✦
   Username and password (case-sensitive).
================================ */
var USERNAME = "RIDHANSHU";
var PASSWORD = "ridhanshu";

/* ================================
   BACKGROUND PARTICLES (sparse on purpose)
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
   LOGIN (page 1)
================================ */
var loginView = document.getElementById("loginView");
var loginForm = document.getElementById("loginForm");
var userInput = document.getElementById("user");
var passInput = document.getElementById("pass");
var loginError = document.getElementById("loginError");
var loginCard = document.getElementById("loginCard");
var lseal = document.getElementById("lseal");
var peekBtn = document.getElementById("peek");
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

userInput.focus();

/* little petals that float out of a point on screen */
function petals(x, y, count, spread) {
  if (reduceMotion) return;
  var symbols = ["✿", "♡", "✦", "❀"];
  for (var i = 0; i < count; i++) {
    var s = document.createElement("span");
    s.className = "petal";
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.fontSize = 12 + Math.random() * 12 + "px";
    s.style.setProperty("--bx", (Math.random() - 0.5) * spread + "px");
    s.style.setProperty("--by", -30 - Math.random() * spread * 0.6 + "px");
    s.style.setProperty("--br", Math.random() * 360 + "deg");
    document.body.appendChild(s);
    setTimeout(function (el) { el.remove(); }, 1300, s);
  }
}

/* typing makes the seal wobble and a petal drift up */
var lastPetal = 0;
function onType(e) {
  lseal.classList.remove("wobble");
  void lseal.offsetWidth;
  lseal.classList.add("wobble");
  var now = Date.now();
  if (now - lastPetal > 180) {
    lastPetal = now;
    var r = e.target.getBoundingClientRect();
    petals(r.left + Math.min(r.width - 70, 30 + e.target.value.length * 14), r.top, 1, 50);
  }
}
userInput.addEventListener("input", onType);
passInput.addEventListener("input", onType);

/* show / hide password */
peekBtn.addEventListener("click", function () {
  var show = passInput.type === "password";
  passInput.type = show ? "text" : "password";
  peekBtn.setAttribute("aria-pressed", show ? "true" : "false");
  peekBtn.setAttribute("aria-label", show ? "Hide password" : "Show password");
  peekBtn.textContent = show ? "hide" : "peek";   /* ✦ EDIT THIS: the words on this button ✦ */
  passInput.focus();
});

/* flowers drift gently toward the pointer */
loginView.addEventListener("pointermove", function (e) {
  if (reduceMotion || e.pointerType === "touch") return;
  loginView.style.setProperty("--lx", ((e.clientX / innerWidth) - 0.5) * 2);
  loginView.style.setProperty("--ly", ((e.clientY / innerHeight) - 0.5) * 2);
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (userInput.value.trim() === USERNAME && passInput.value === PASSWORD) {
    loginError.textContent = "";
    loginCard.classList.add("success");
    lseal.textContent = "✿";
    var r = loginCard.getBoundingClientRect();
    petals(r.left + r.width / 2, r.top + r.height / 2, 26, 380);
    setTimeout(showMainPage, 1200);
  } else {
    /* ✦ EDIT THIS: WRONG LOGIN MESSAGE ✦ */
    loginError.textContent = "oy rangdar hint dekhnnaaaaa ♡";
    loginCard.classList.remove("shake");
    void loginCard.offsetWidth;
    loginCard.classList.add("shake");
    passInput.value = "";
    passInput.focus();
  }
});

/* ================================
   SHOW PAGE 2 (only runs after a correct login)
================================ */
function showMainPage() {
  var tpl = document.getElementById("mainPage");
  document.getElementById("app").appendChild(tpl.content.cloneNode(true));
  loginView.classList.add("unlocked");
  setTimeout(function () { loginView.remove(); }, 1000);
  initMainPage();
}

/* ================================
   BOUQUET PAGE BEHAVIOUR
================================ */
function initMainPage() {
  var overlay = document.getElementById("overlay");
  var openBtn = document.getElementById("openBtn");
  var closeBtn = document.getElementById("closeBtn");
  var foldBtn = document.getElementById("foldBtn");

  /* ---- open / close the letter ---- */
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

  /* ---- optional music: put music.mp3 next to index.html ---- */
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
}
