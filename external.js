const message = document.getElementById("message");

function showMessage(text) {
  message.textContent = text;
}

// Called from the "External Reference" button
function greet() {
  showMessage("Hello from external.js!");
}

// ---------- Basics ----------
document.getElementById("alertBtn").addEventListener("click", () => {
  alert("You have been cooked!");
});
document.getElementById("greetBtn").addEventListener("click", greet);
document.getElementById("clearBtn").addEventListener("click", () => showMessage(""));

// ---------- Counter ----------
let count = 0;
const countDisplay = document.getElementById("count");

function updateCount(newValue) {
  count = newValue;
  countDisplay.textContent = count;
}

document.getElementById("incBtn").addEventListener("click", () => updateCount(count + 1));
document.getElementById("decBtn").addEventListener("click", () => updateCount(count - 1));
document.getElementById("resetBtn").addEventListener("click", () => updateCount(0));

// ---------- Greet Me ----------
const nameInput = document.getElementById("nameInput");

function greetByName() {
  const name = nameInput.value.trim();
  showMessage(name ? `Hello, ${name}! Welcome to JavaScript.` : "Please type your name first.");
}

document.getElementById("nameBtn").addEventListener("click", greetByName);
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") greetByName();
});

// ---------- Appearance ----------
document.getElementById("colorBtn").addEventListener("click", () => {
  const hue = Math.floor(Math.random() * 360);
  document.documentElement.style.setProperty("--accent", `hsl(${hue}, 70%, 40%)`);
  showMessage(`Accent color changed (hue ${hue}).`);
});

document.getElementById("darkBtn").addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  showMessage(isDark ? "Dark mode on." : "Dark mode off.");
});

let fontSize = 16;

function changeFontSize(change) {
  fontSize = Math.min(32, Math.max(12, fontSize + change));
  document.body.style.fontSize = fontSize + "px";
  showMessage(`Text size: ${fontSize}px`);
}

document.getElementById("biggerBtn").addEventListener("click", () => changeFontSize(2));
document.getElementById("smallerBtn").addEventListener("click", () => changeFontSize(-2));

// ---------- Tools ----------
document.getElementById("timeBtn").addEventListener("click", () => {
  showMessage("Now: " + new Date().toLocaleString());
});

document.getElementById("randomBtn").addEventListener("click", () => {
  const number = Math.floor(Math.random() * 100) + 1;
  showMessage(`Your random number is ${number}.`);
});

document.getElementById("secretBtn").addEventListener("click", () => {
  const secret = document.getElementById("secret");
  secret.style.display = secret.style.display === "block" ? "none" : "block";
});

// ---------- Task List ----------
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    showMessage("Type a task before adding it.");
    return;
  }

  const item = document.createElement("li");
  item.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => item.remove());

  item.appendChild(removeBtn);
  taskList.appendChild(item);
  taskInput.value = "";
  taskInput.focus();
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
