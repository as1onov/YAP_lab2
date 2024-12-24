// password-manager.js

// DOM Elements
const addPasswordForm = document.getElementById("add-password-form");
const passwordList = document.getElementById("password-list");
const generateBtn = document.getElementById("generate-password");

// Initialize LocalDB (localStorage abstraction)
const DB_KEY = "passwordManager";

function getPasswords() {
  const passwords = localStorage.getItem(DB_KEY);
  return passwords ? JSON.parse(passwords) : [];
}

function savePasswords(passwords) {
  localStorage.setItem(DB_KEY, JSON.stringify(passwords));
}

// Add password entry
addPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const service = addPasswordForm.elements["service"].value;
  const login = addPasswordForm.elements["login"].value;
  const password = addPasswordForm.elements["password"].value;

  if (service && login && password) {
    const passwords = getPasswords();
    passwords.push({ service, login, password });
    savePasswords(passwords);
    displayPasswords();
    addPasswordForm.reset();
  } else {
    alert("Заполните все поля!");
  }
});

// Generate a random password
function generatePassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

generateBtn.addEventListener("click", () => {
  const passwordField = addPasswordForm.elements["password"];
  passwordField.value = generatePassword();
});

// Display stored passwords
function displayPasswords() {
  passwordList.innerHTML = "";
  const passwords = getPasswords();

  passwords.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>Сервис:</strong> ${entry.service}<br>
      <strong>Логин:</strong> ${entry.login}<br>
      <strong>Пароль:</strong> ${entry.password}<br>
      <button data-index="${index}" class="delete-btn">Удалить</button>
    `;
    passwordList.appendChild(listItem);
  });

  // Add event listeners to delete buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      deletePassword(index);
    });
  });
}

// Delete a password entry
function deletePassword(index) {
  const passwords = getPasswords();
  passwords.splice(index, 1);
  savePasswords(passwords);
  displayPasswords();
}

// Initialize the password list display
displayPasswords();
