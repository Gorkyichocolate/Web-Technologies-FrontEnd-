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

// Authentication and Form Validation
document.addEventListener("DOMContentLoaded", () => {
  // Login Form Handler
  const loginForm = document.querySelector('#authForm');
  const currentPage = window.location.pathname;

  if (loginForm && currentPage.includes('login.html')) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Signup Form Handler
  if (loginForm && currentPage.includes('signup.html')) {
    loginForm.addEventListener('submit', handleSignup);
  }

  // Real-time validation
  const inputs = document.querySelectorAll('#authForm input');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
  });
});

// Form Validation Functions
function validateField(input) {
  const fieldName = input.name;
  const value = input.value.trim();
  let error = '';

  switch(fieldName) {
    case 'username':
      if (value === '') {
        error = 'Username is required';
      } else if (value.length < 3) {
        error = 'Username must be at least 3 characters';
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        error = 'Username can only contain letters, numbers and underscore';
      }
      break;

    case 'email':
      if (value === '') {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
      break;

    case 'pwd':
      if (value === '') {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        error = 'Password must contain uppercase, lowercase and number';
      }
      break;

    case 'rpwd':
      const pwd = document.getElementById('pwd').value;
      if (value === '') {
        error = 'Please repeat your password';
      } else if (value !== pwd) {
        error = 'Passwords do not match';
      }
      break;

    case 'birthday':
      if (value === '') {
        error = 'Birthday is required';
      } else {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13) {
          error = 'You must be at least 13 years old';
        } else if (age > 120) {
          error = 'Please enter a valid birth date';
        }
      }
      break;
  }

  if (error) {
    showFieldError(input, error);
    return false;
  } else {
    clearError(input);
    return true;
  }
}

function showFieldError(input, message) {
  clearError(input);
  input.classList.add('error');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function clearError(input) {
  input.classList.remove('error');
  const errorMsg = input.parentNode.querySelector('.error-message');
  if (errorMsg) {
    errorMsg.remove();
  }
}

function validateForm(formInputs) {
  let isValid = true;
  formInputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  return isValid;
}

// Login Handler
function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username');
  const password = document.getElementById('pwd');
  
  // Validate fields
  if (!validateForm([username, password])) {
    showToast('Please fix the errors in the form', 'error');
    return;
  }

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Find user
  const user = users.find(u => u.username === usernameValue && u.password === passwordValue);

  if (user) {
    // Set current user
    localStorage.setItem('currentUser', user.username);
    localStorage.setItem('currentUserEmail', user.email);
    
    showToast('Login successful! Redirecting...', 'success');
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } else {
    showToast('Invalid username or password', 'error');
    username.classList.add('error');
    password.classList.add('error');
  }
}

// Signup Handler
function handleSignup(e) {
  e.preventDefault();
  
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('pwd');
  const repeatPassword = document.getElementById('rpwd');
  const birthday = document.getElementById('birthday');

  // Validate all fields
  if (!validateForm([username, email, password, repeatPassword, birthday])) {
    showToast('Please fix the errors in the form', 'error');
    return;
  }

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const birthdayValue = birthday.value;

  // Get existing users
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if user already exists
  if (users.some(u => u.username === usernameValue)) {
    showToast('Username already exists', 'error');
    showFieldError(username, 'This username is already taken');
    return;
  }

  if (users.some(u => u.email === emailValue)) {
    showToast('Email already registered', 'error');
    showFieldError(email, 'This email is already registered');
    return;
  }

  // Create new user
  const newUser = {
    username: usernameValue,
    email: emailValue,
    password: passwordValue,
    birthday: birthdayValue,
    registeredAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  showToast('Registration successful! Redirecting to login...', 'success');
  
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1500);
}

// Display user info on profile page
if (window.location.pathname.includes('profile.html')) {
  displayUserProfile();
}

function displayUserProfile() {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === currentUser);

  if (user) {
    // Update profile page with user info
    const usernameDisplay = document.getElementById('profileUsername');
    const emailDisplay = document.getElementById('profileEmail');
    const birthdayDisplay = document.getElementById('profileBirthday');
    const registeredDisplay = document.getElementById('profileRegistered');

    if (usernameDisplay) usernameDisplay.textContent = user.username;
    if (emailDisplay) emailDisplay.textContent = user.email;
    if (birthdayDisplay) birthdayDisplay.textContent = new Date(user.birthday).toLocaleDateString();
    if (registeredDisplay) registeredDisplay.textContent = new Date(user.registeredAt).toLocaleDateString();
  }

  // Load saved avatar
  const savedAvatar = localStorage.getItem('userAvatar');
  const profileAvatar = document.getElementById('profileAvatar');
  const logoAvatar = document.getElementById('logo');
  
  if (savedAvatar && profileAvatar) {
    profileAvatar.src = savedAvatar;
  }
  if (savedAvatar && logoAvatar) {
    logoAvatar.src = savedAvatar;
  }
}

// Random User API Integration for Avatar
document.addEventListener('DOMContentLoaded', () => {
  const changeAvatarBtn = document.getElementById('changeAvatarBtn');
  const profileAvatar = document.getElementById('profileAvatar');
  const logoAvatar = document.getElementById('logo');

  // Load saved avatar on page load
  const savedAvatar = localStorage.getItem('userAvatar');
  if (savedAvatar && profileAvatar) {
    profileAvatar.src = savedAvatar;
  }
  if (savedAvatar && logoAvatar) {
    logoAvatar.src = savedAvatar;
  }

  // Change Avatar Button Handler
  if (changeAvatarBtn) {
    changeAvatarBtn.addEventListener('click', async () => {
      await generateRandomAvatar();
    });
  }
});

async function generateRandomAvatar() {
  const profileAvatar = document.getElementById('profileAvatar');
  const logoAvatar = document.getElementById('logo');
  const changeAvatarBtn = document.getElementById('changeAvatarBtn');
  
  if (!profileAvatar) return;

  try {
    // Show loading state
    profileAvatar.classList.add('loading');
    if (changeAvatarBtn) {
      changeAvatarBtn.disabled = true;
      changeAvatarBtn.textContent = '⏳ Loading...';
    }

    // Fetch random user from API
    const response = await fetch('https://randomuser.me/api/?inc=picture,name,email,location,dob');
    
    if (!response.ok) {
      throw new Error('Failed to fetch avatar');
    }

    const data = await response.json();
    const user = data.results[0];
    
    // Update avatar image
    const newAvatarUrl = user.picture.large;
    profileAvatar.src = newAvatarUrl;
    
    // Update logo avatar in header
    if (logoAvatar) {
      logoAvatar.src = newAvatarUrl;
    }
    
    // Save to localStorage
    localStorage.setItem('userAvatar', newAvatarUrl);
    
    // Optional: Save additional user info
    localStorage.setItem('userAvatarInfo', JSON.stringify({
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      location: `${user.location.city}, ${user.location.country}`,
      age: user.dob.age
    }));

    // Show success message
    showToast('✅ Avatar changed successfully!', 'success');
    
    // Remove loading state
    profileAvatar.classList.remove('loading');
    if (changeAvatarBtn) {
      changeAvatarBtn.disabled = false;
      changeAvatarBtn.textContent = '🎲 Generate Random Avatar (API)';
    }

  } catch (error) {
    console.error('Error fetching avatar:', error);
    showToast('❌ Failed to load avatar. Please try again.', 'error');
    
    // Remove loading state
    profileAvatar.classList.remove('loading');
    if (changeAvatarBtn) {
      changeAvatarBtn.disabled = false;
      changeAvatarBtn.textContent = '🎲 Generate Random Avatar (API)';
    }
  }
}

// Add logout handler that clears avatar
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userAvatarInfo');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1000);
  });
}