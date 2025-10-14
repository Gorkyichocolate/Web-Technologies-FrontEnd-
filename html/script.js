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
