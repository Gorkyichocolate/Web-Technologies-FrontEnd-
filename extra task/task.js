//1-task
function greetUser() {
  const name = document.getElementById("nameInput").value.trim();
  document.getElementById("greetResult").textContent =
    name ? `Good morning, ${name}!` : "Please enter your name.";
}

// 2-task
function checkVoting() {
  const age = Number(document.getElementById("ageInput").value);
  document.getElementById("ageResult").textContent =
    age >= 18
      ? "You are eligible to vote."
      : "Sorry, you are not eligible to vote.";
}

// 3-task
function convertToCelsius() {
  const f = Number(document.getElementById("fahrenheitInput").value);
  const c = ((f - 32) * 5) / 9;
  document.getElementById("celsiusResult").textContent =
    isNaN(c) ? "Enter a number." : `The temperature in Celsius is ${c.toFixed(2)}°C.`;
}

function convertToCm() {
  const inches = Number(document.getElementById("inchInput").value);
  const cm = inches * 2.54;
  document.getElementById("cmResult").textContent =
    isNaN(cm) ? "Enter a number." : `The length in centimeters is ${cm.toFixed(2)} cm.`;
}

// 4-task
function calcTotal() {
  const i1 = Number(document.getElementById("item1").value);
  const i2 = Number(document.getElementById("item2").value);
  const i3 = Number(document.getElementById("item3").value);
  if (isNaN(i1) || isNaN(i2) || isNaN(i3)) {
    document.getElementById("totalResult").textContent = "Enter all item prices.";
    return;
  }
  const subtotal = i1 + i2 + i3;
  const total = subtotal * 1.12;
  document.getElementById("totalResult").textContent =
    `Your total order price with tax is $${total.toFixed(2)}.`;
}

// 5-task
function generateCoupon() {
  const code = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("couponResult").textContent = `Your coupon code is: ${code}`;
}

// 6-task
function checkLogin() {
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;
  const correctUser = "admin";
  const correctPass = "12345";

  document.getElementById("loginResult").textContent =
    username === correctUser && password === correctPass
      ? "Login successful!"
      : "Invalid username or password.";
}

// 7-task
const randomNumber = Math.floor(Math.random() * 100) + 1;
function guessNumber() {
  const guess = Number(document.getElementById("guessInput").value);
  const result = document.getElementById("guessResult");
  if (guess === randomNumber) result.textContent = "Correct! You guessed the number!";
  else if (guess > randomNumber) result.textContent = "Too high!";
  else if (guess < randomNumber) result.textContent = "Too low!";
  else result.textContent = "Enter a valid number.";
}

// 8-task
function checkPassword() {
  const pwd = document.getElementById("pwdInput").value;
  const strong =
    pwd.length >= 8 &&
    pwd.length <= 32 &&
    /[!@#\$%\^&\*]/.test(pwd) &&
    /\d/.test(pwd) &&
    /[A-Z]/.test(pwd);

  document.getElementById("pwdResult").textContent = strong
    ? "Strong password."
    : "Weak password.";
}
