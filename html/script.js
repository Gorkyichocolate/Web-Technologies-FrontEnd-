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

const memes = [
  "/images/videoframe_64966.png",
  "/images/videoframe_2042.png",
  "/images/videoframe_2481.png",
  "/images/videoframe_2694.png",
  "/images/videoframe_7667.png",
  "/images/videoframe_8916.png",
  "/images/videoframe_4806.png",
  "/images/videoframe_5377.png"
];

const carousel = document.getElementById("carousel");
const openCase = document.getElementById("openCase");

for (let i = 0; i < 5; i++) { 
  memes.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    carousel.appendChild(img);
  });
}

let offset = 0;
let spinning = false;

openCase.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  openCase.disabled = true;

  let speed = 30;
  let stopAfter = 4000 + Math.random() * 2000;
  let startTime = performance.now();

  function spin(now) {
    let elapsed = now - startTime;
    offset += speed;
    carousel.style.transform = `translateX(-${offset}px)`;

    if (offset > memes.length * 150 * 5) {
      offset = 0;
    }

    if (elapsed > stopAfter * 0.7) speed *= 0.985;

    if (elapsed < stopAfter) {
      requestAnimationFrame(spin);
    } else {
      spinning = false;
      openCase.disabled = false;

      const visibleIndex = Math.floor((offset % (memes.length * 150)) / 150) % memes.length;
      const winner = memes[visibleIndex].split("/").pop().replace(".jpg", "");
      alert(`🎉 You got: ${winner}!`);
    }
  }

  requestAnimationFrame(spin);
});
