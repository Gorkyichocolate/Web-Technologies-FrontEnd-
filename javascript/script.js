  
(function() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
    if (document.body) {
      document.body.classList.add("dark-mode");
    }
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const darkBtn = document.getElementById("darkBtn");
  
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (darkBtn) darkBtn.textContent = "Light";
  } else {
    document.body.classList.remove("dark-mode");
    if (darkBtn) darkBtn.textContent = "Dark";
  }

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      darkBtn.textContent = isDark ? "Light" : "Dark";
      
      if (typeof showToast === 'function') {
        showToast(isDark ? "Dark mode enabled" : "Light mode enabled", "success");
      }
    });
  }

  const logo = document.getElementById("logo");
  const popupMenu = document.getElementById("popupMenu");
  
  if (logo && popupMenu) {
    logo.addEventListener("click", (e) => {
      e.stopPropagation();
      popupMenu.style.display = popupMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!popupMenu.contains(e.target) && e.target !== logo) {
        popupMenu.style.display = "none";
      }
    });
  }

  const exitBtn = document.getElementById("exitBtn");
  if (exitBtn) {
    exitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      showToast("Logged out successfully", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    });
  }

  const currentUser = localStorage.getItem("currentUser");
  const loginDiv = document.getElementById("login");
  const userProfile = document.getElementById("userprofile");
  
  if (currentUser) {
    if (loginDiv) loginDiv.style.display = "none";
    if (userProfile) {
      userProfile.style.display = "block";
      userProfile.textContent = currentUser;
    }
  } else {
    if (loginDiv) loginDiv.style.display = "block";
    if (userProfile) userProfile.style.display = "none";
  }

  function showToast(message, type = "info") {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = "show";
    
    if (type === "success") {
      toast.style.background = "#4CAF50";
    } else if (type === "error") {
      toast.style.background = "#f44336";
    } else {
      toast.style.background = "#333";
    }
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  window.showToast = showToast;

  function updateClock() {
    const clockElement = document.getElementById("clock");
    if (clockElement) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }
  
  setInterval(updateClock, 1000);
  updateClock();
});

const faqButtons = document.querySelectorAll(".faq-question");
faqButtons.forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = answer.style.display === "block";
    
    document.querySelectorAll(".faq-answer").forEach(a => {
      a.style.display = "none";
    });
    
    if (!isOpen) {
      answer.style.display = "block";
    }
  });
});

const items = [
  { src: "/images/videoframe_2042.png", rarity: "shit", chance: 40 },
  { src: "/images/videoframe_2481.png", rarity: "common", chance: 30 },
  { src: "/images/videoframe_2694.png", rarity: "rare", chance: 15 },
  { src: "/images/videoframe_7667.png", rarity: "epic", chance: 10 },
  { src: "/images/videoframe_8916.png", rarity: "legendary", chance: 5 },
];

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
    sounds[key] = soundPaths[key].map(path => new Audio(path));
  } else {
    sounds[key] = new Audio(soundPaths[key]);
  }
}

const carousel = document.getElementById("carousel");
const openCase = document.getElementById("openCase");
const winblock = document.getElementById("winblock");
const winImage = document.getElementById("winImage");
const prizeText = document.getElementById("prize");
const itemWidth = 160;
const centerX = 300;

function getRandomItem() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (let item of items) {
    cumulative += item.chance;
    if (rand < cumulative) return item;
  }
  return items[items.length - 1];
}

function fillCarousel() {
  if (!carousel) return;
  carousel.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    const div = document.createElement("div");
    div.className = `carousel-item ${item.rarity}`;
    div.innerHTML = `<img src="${item.src}" alt="${item.rarity}">`;
    carousel.appendChild(div);
  }
}

if (carousel) {
  fillCarousel();
}

let spinning = false;

function startSpinSound() {
  if (sounds.spin) {
    sounds.spin.currentTime = 0;
    sounds.spin.play();
  }
}

function startSpin() {
  if (spinning || !carousel || !openCase) return;
  spinning = true;
  openCase.disabled = true;

  const winItem = getRandomItem();
  const winIndex = Math.floor(Math.random() * 10) + 20;
  
  const items = carousel.querySelectorAll(".carousel-item");
  if (items[winIndex]) {
    items[winIndex].className = `carousel-item ${winItem.rarity}`;
    items[winIndex].innerHTML = `<img src="${winItem.src}" alt="${winItem.rarity}">`;
  }

  startSpinSound();
  
  const offset = -(winIndex * itemWidth - centerX);
  carousel.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
  carousel.style.transform = `translateX(${offset}px)`;

  setTimeout(() => finishSpin(offset, winItem), 4000);
}

function finishSpin(offset, winItem) {
  showWin(winItem.src, winItem.rarity);
  
  setTimeout(() => {
    if (carousel) {
      carousel.style.transition = "none";
      carousel.style.transform = "translateX(0)";
      fillCarousel();
    }
    spinning = false;
    if (openCase) openCase.disabled = false;
  }, 100);
}

function showWin(src, rarity) {
  if (!winblock || !winImage || !prizeText) return;
  
  winImage.src = src;
  prizeText.textContent = `You won: ${rarity.toUpperCase()}!`;
  winblock.classList.add(rarity);
  winblock.style.display = "flex";

  const raritySound = sounds[rarity];
  if (raritySound) {
    const sound = Array.isArray(raritySound) 
      ? raritySound[Math.floor(Math.random() * raritySound.length)]
      : raritySound;
    sound.currentTime = 0;
    sound.play();
  }
}

if (winblock) {
  winblock.addEventListener("click", e => {
    if (e.target === winblock) {
      winblock.style.display = "none";
      winblock.className = "winblock";
    }
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && winblock) {
    winblock.style.display = "none";
    winblock.className = "winblock";
  }
});

if (openCase) {
  openCase.addEventListener("click", startSpin);
}

document.addEventListener("keydown", e => {
  if (e.key === "b" || e.key === "B") {
    changeback();
  }
});

function changeback() {
  const colors = ["antiquewhite", "lightblue", "lightgreen", "lightpink", "lightyellow"];
  const currentBg = document.body.style.backgroundColor || "antiquewhite";
  const currentIndex = colors.indexOf(currentBg);
  const nextIndex = (currentIndex + 1) % colors.length;
  document.body.style.backgroundColor = colors[nextIndex];
}

const sidebarItems = document.querySelectorAll("#sidebar li");
const sections = document.querySelectorAll("#content section");

sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      
      sidebarItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sidebarItems.forEach(item => {
          if (item.getAttribute("data-target") === entry.target.id) {
            sidebarItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => {
  observer.observe(section);
});

const video = document.getElementById('mainVideo');
const playPause = document.getElementById('playPause');
const muteBtn = document.getElementById('muteBtn');
const vol = document.getElementById('vol');

if (playPause && video) {
  playPause.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPause.textContent = 'Pause';
    } else {
      video.pause();
      playPause.textContent = 'Play';
    }
  });
}

if (muteBtn && video) {
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
  });
}

if (vol && video) {
  vol.addEventListener('input', (e) => {
    video.volume = e.target.value / 100;
  });
}


document.addEventListener('DOMContentLoaded', function() {

      const reportForm = document.getElementById('reportForm');
      if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const name = document.getElementById('name').value.trim();
          const email = document.getElementById('email').value.trim();
          const topic = document.getElementById('topic').value;
          const message = document.getElementById('message').value.trim();
          
          if (!name || !email || !topic || !message) {
            if (typeof showToast === 'function') {
              showToast('Please fill all required fields', 'error');
            } else {
              alert('Please fill all required fields');
            }
            return;
          }
          
          if (typeof showToast === 'function') {
            showToast('Report submitted successfully!', 'success');
          } else {
            alert('Report submitted successfully!');
          }
          
          setTimeout(() => {
            this.reset();
          }, 1000);
        });
      }

      const faqButtons = document.querySelectorAll('.faq-question');
      console.log('FAQ buttons found:', faqButtons.length);
      
      faqButtons.forEach(button => {
        button.addEventListener('click', function() {
          console.log('FAQ button clicked');
          const answer = this.nextElementSibling;
          const isOpen = answer.classList.contains('open');

          document.querySelectorAll('.faq-answer').forEach(a => {
            a.classList.remove('open');
          });
          
          if (!isOpen) {
            answer.classList.add('open');
            console.log('Answer opened');
          }
        });
      });
    });