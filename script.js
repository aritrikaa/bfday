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

userInput.focus();

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (userInput.value.trim() === USERNAME && passInput.value === PASSWORD) {
    loginError.textContent = "";
    loginCard.classList.add("success");
    lseal.textContent = "✿";
    setTimeout(showMainPage, 900);
  } else {
    /* ✦ EDIT THIS: WRONG LOGIN MESSAGE ✦ */
    loginError.textContent = "oyyyy rangdaaarr, hint dekhkr, sahi se likhnaaaa ♡";
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


