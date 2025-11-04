document.addEventListener("DOMContentLoaded", () => {

  const darkBtn = document.getElementById("darkBtn");
  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock();

  const logo = document.getElementById("logo");
  const popupMenu = document.getElementById("popupMenu");
  if (logo && popupMenu) {
    logo.addEventListener("click", (e) => {
      e.stopPropagation();
      popupMenu.style.display = popupMenu.style.display === "block" ? "none" : "block";
    });

    popupMenu.addEventListener("click", (e) => e.stopPropagation());

    document.addEventListener("click", (e) => {
      if (!popupMenu.contains(e.target) && e.target !== logo) {
        popupMenu.style.display = "none";
      }
    });
  }

  const form = document.getElementById("authForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const errors = [];

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const pwd = document.getElementById("pwd");
    const rpwd = document.getElementById("rpwd");

    if (username) {
      if (username.value.trim() === "") {
        errors.push("Username is required.");
      }
    }

    if (email) {
      const v = email.value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (v === "") {
        errors.push("Email is required.");
      } else if (!emailRe.test(v)) {
        errors.push("Email format is invalid.");
      }
    }

    if (pwd) {
      if (pwd.value.trim() === "") {
        errors.push("Password is required.");
      } else if (pwd.value.length < 6) {
        errors.push("Password must be at least 6 characters.");
      }
    }
    if (rpwd) {
      if (rpwd.value.trim() === "") {
        errors.push("Please repeat the password.");
      } else if (pwd && rpwd.value !== pwd.value) {
        errors.push("Passwords do not match.");
      }
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }
    alert("Form validated successfully!");
  });

});

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        answer.style.paddingTop = "0";
        answer.style.paddingBottom = "0";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.paddingTop = "10px";
        answer.style.paddingBottom = "10px";
      }
    });
});


//assignment 6

//Task-1  DOM Manipulation and Styling
const items = [
  { src: "/images/videoframe_2042.png", rarity: "shit", chance: 40 },
  { src: "/images/videoframe_2481.png", rarity: "common", chance: 30 },
  { src: "/images/videoframe_2694.png", rarity: "rare", chance: 15 },
  { src: "/images/videoframe_7667.png", rarity: "epic", chance: 10 },
  { src: "/images/videoframe_8916.png", rarity: "legendary", chance: 5 },
];

//Task-2  Sound Effects
const soundPaths = {
  spin: "/sounds/startsound.mp3",
  shit: ["/sounds/shit.mp3", "/sounds/shit1.mp3"],
  common: ["/sounds/common.mp3", "/sounds/common.mp3"],
  rare: ["/sounds/rare.mp3", "/sounds/rare1.mp3"],
  epic: ["/sounds/epic.mp3", "/sounds/epic.mp3"],
  legendary: ["/sounds/legendary.mp3", "/sounds/legendary.mp3"],
};
const sounds = {};
for (let key in soundPaths) {
  if (Array.isArray(soundPaths[key])) {
    sounds[key] = soundPaths[key].map(path => {
      const audio = new Audio(path);
      audio.preload = "auto";
      return audio;
    });
  } else {
    const audio = new Audio(soundPaths[key]);
    audio.preload = "auto";
    sounds[key] = audio;
  }
}

//Task-3  Selecting DOM Elements
const carousel = document.getElementById("carousel");
const openCase = document.getElementById("openCase");
const winblock = document.getElementById("winblock");
const winImage = document.getElementById("winImage");
const prizeText = document.getElementById("prize");
const itemWidth = 160;
const centerX = 300;

//Task-4  Arrays, Loops, Objects
function getRandomItem() {
  const totalChance = items.reduce((sum, i) => sum + i.chance, 0);
  const rand = Math.random() * totalChance;
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.chance;
    if (rand <= cumulative) return item;
  }
  return items[0];
}

function fillCarousel() {
  carousel.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const randomItem = getRandomItem();
    const img = document.createElement("img");
    img.src = randomItem.src;
    img.dataset.rarity = randomItem.rarity;
    carousel.appendChild(img);
  }
}
fillCarousel();

let spinning = false;

//Task-5  Play start sound (Event handling)
function startSpinSound() {
  const spinSound = sounds.spin;
  spinSound.currentTime = 0;
  spinSound.volume = 0.7;
  spinSound.play().catch(err => console.log("Audio blocked:", err));
}

//Task-6  Event Handling + Animation
function startSpin() {
  if (spinning) return;
  spinning = true;
  openCase.disabled = true;
  fillCarousel();
  startSpinSound();

  let offset = 0;
  let speed = 40;
  const spinDuration = 4000 + Math.random() * 2000;
  const decelerationStart = spinDuration * 0.6;
  let startTime = performance.now();

  function spin(now) {
    const elapsed = now - startTime;
    offset += speed;
    carousel.style.transform = `translateX(-${offset}px)`;
    if (offset > carousel.scrollWidth / 2) offset = 0;
    if (elapsed > decelerationStart) speed *= 0.985;
    if (elapsed < spinDuration) {
      requestAnimationFrame(spin);
    } else {
      finishSpin(offset);
    }
  }
  requestAnimationFrame(spin);
}

//Task-7  Calculating Winner + Animation Finish
function finishSpin(offset) {
  const imgs = carousel.querySelectorAll("img");
  const totalWidth = imgs.length * itemWidth;
  const centerPos = (offset + centerX) % totalWidth;
  const winnerIndex = Math.floor(centerPos / itemWidth);
  const winnerImg = imgs[winnerIndex];
  const winnerSrc = winnerImg.src;
  const rarity = winnerImg.dataset.rarity;
  const alignOffset = winnerIndex * itemWidth - centerX + itemWidth / 2;
  carousel.style.transition = "transform 0.6s ease-out";
  carousel.style.transform = `translateX(-${alignOffset}px)`;
  setTimeout(() => showWin(winnerSrc, rarity), 600);
}

//Task-8  Switch-case + Callback + Popup Display
function showWin(src, rarity) {
  spinning = false;
  openCase.disabled = false;

  let rarityMessage;
  switch (rarity) {
    case "shit":
      rarityMessage = "Govno";
      break;
    case "common":
      rarityMessage = "common";
      break;
    case "rare":
      rarityMessage = "Rare";
      break;
    case "epic":
      rarityMessage = "Epic";
      break;
    case "legendary":
      rarityMessage = "LEGENDARY";
      break;
    default:
      rarityMessage = "Unknown rarity!";
  }

  setTimeout(() => {
    const possibleSounds = sounds[rarity];
    if (possibleSounds && possibleSounds.length > 0) {
      const sound = possibleSounds[Math.floor(Math.random() * possibleSounds.length)];
      sound.currentTime = 0;
      sound.volume = 0.7;
      sound.play().catch(err => console.log("Audio blocked:", err));
    }
  }, 100);

  winImage.src = src;
  prizeText.textContent = `You got a ${rarity.toUpperCase()} meme! ${rarityMessage}`;
  winblock.style.display = "flex";
}

//Task-9  Additional Event Handling
winblock.addEventListener("click", e => {
  if (e.target === winblock) winblock.style.display = "none";
});
document.addEventListener("keydown", e => {
  if (e.key === "Enter") startSpin();
});
openCase.addEventListener("click", startSpin);



document.addEventListener("keydown", e =>{
  if (e.code === "Space") changeback();
})

function changeback(){
   document.body.style.backgroundColor ="red  "
}


const sidebarItems = document.querySelectorAll("#sidebar li");
    const sections = document.querySelectorAll("#content section");

    sidebarItems.forEach((item) => {
      item.addEventListener("click", () => {
        const target = document.getElementById(item.dataset.target);
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: "smooth",
        });
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const sidebarItem = document.querySelector(
            `#sidebar li[data-target="${id}"]`
          );
          if (entry.isIntersecting) {
            sidebarItems.forEach((i) => i.classList.remove("active"));
            sidebarItem.classList.add("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
