const parentElement = document.getElementById("parentElement");
const showMessage = document.getElementById("showMessage");
const changeColor = document.body.style;
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const playfulMessages = [
  "Why are you being so mean? 🥺",
  "Why are you being so heartless? 💔",
  "You don’t care about my heart? 😭",
  "Are you really saying NO to me? 🥹",
  "Please think again… 🥺👉👈",
  "You’re really making me do this? 😭",
  "Okay, I’m not giving up! 😤❤️",
];

let noMessageIndex = 0;

const propose = () => {
  if (!parentElement || !showMessage) return;

  parentElement.style.display = "none";
  showMessage.style.display = "block";
  changeColor.background =
    "linear-gradient(116.82deg, #ff94e7 0%, #27cbff 100%)";

  if (noButton) {
    noButton.style.display = "none";
  }
};

const showNoPopup = () => {
  if (!noButton) return;

  let popup = document.getElementById("noPopup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "noPopup";
    document.body.appendChild(popup);
  }

  const message = playfulMessages[noMessageIndex % playfulMessages.length];
  noMessageIndex += 1;

  popup.textContent = message;
  popup.classList.remove("show");
  void popup.offsetWidth;
  popup.classList.add("show");

  const noRect = noButton.getBoundingClientRect();
  const popupWidth = 260;
  const popupHeight = 70;
  const left = Math.min(
    window.innerWidth - popupWidth - 16,
    Math.max(16, noRect.left + noRect.width / 2 - popupWidth / 2)
  );
  const top = Math.max(16, noRect.top - popupHeight - 12);

  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;

  clearTimeout(showNoPopup.timeoutId);
  showNoPopup.timeoutId = setTimeout(() => {
    popup.classList.remove("show");
  }, 1200);
};

const moveNoButton = () => {
  if (!noButton || !yesButton || showMessage?.style.display === "block") return;

  const yesRect = yesButton.getBoundingClientRect();
  const noWidth = noButton.offsetWidth || 200;
  const noHeight = noButton.offsetHeight || 50;
  const padding = 24;
  const maxX = Math.max(0, window.innerWidth - noWidth - padding);
  const maxY = Math.max(0, window.innerHeight - noHeight - padding);

  let left = 0;
  let top = 0;
  let attempts = 0;

  do {
    left = Math.random() * (maxX + 1);
    top = Math.random() * (maxY + 1);

    const candidate = {
      left,
      top,
      right: left + noWidth,
      bottom: top + noHeight,
    };

    const overlapsYes = !(
      candidate.right + 30 < yesRect.left ||
      candidate.left - 30 > yesRect.right ||
      candidate.bottom + 30 < yesRect.top ||
      candidate.top - 30 > yesRect.bottom
    );

    attempts += 1;
    if (!overlapsYes) break;
  } while (attempts < 80);

  noButton.style.position = "fixed";
  noButton.style.left = `${left}px`;
  noButton.style.top = `${top}px`;
  noButton.style.transform = "scale(1)";
  noButton.style.transition = "left 0.35s ease, top 0.35s ease, transform 0.35s ease";
};

if (yesButton) {
  yesButton.addEventListener("click", propose);
}

if (noButton) {
  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showNoPopup();
    moveNoButton();
  });
}

// Animate Text with Anim JS
var textWrapper = document.querySelector(".ml6 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml6 .letter",
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i,
  })
  .add({
    targets: ".ml6",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });