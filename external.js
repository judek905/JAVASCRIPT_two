"use strict";

(() => {
  // ---------- Helpers ----------
  const $ = (id) => document.getElementById(id);

  // localStorage wrapper that never throws (private mode, blocked storage, bad JSON)
  const storage = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* storage unavailable: ignore */
      }
    },
  };

  // Attach a listener only if the element exists, and warn instead of crashing
  function on(id, event, handler) {
    const el = $(id);
    if (el) el.addEventListener(event, handler);
    else console.warn(`#${id} not found in the page`);
  }

  // Run a handler when Enter is pressed inside an input
  function onEnter(id, handler) {
    on(id, "keydown", (e) => {
      if (e.key === "Enter") handler();
    });
  }

  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function init() {
    const message = $("message");
    if (message) message.setAttribute("aria-live", "polite"); // screen readers announce updates

    function showMessage(text) {
      if (message) message.textContent = text;
    }

    // ---------- Basics ----------
    function greet() {
      showMessage("Hello from external.js!");
    }
    // Keep greet() global so an inline onclick="greet()" still works
    window.greet = greet;

    on("alertBtn", "click", () => alert("You have been cooked!"));
    on("greetBtn", "click", greet);
    on("clearBtn", "click", () => showMessage(""));

    // ---------- Counter ----------
    let count = 0;
    const countDisplay = $("count");

    function updateCount(newValue) {
      count = newValue;
      if (countDisplay) countDisplay.textContent = count;
    }

    on("incBtn", "click", () => updateCount(count + 1));
    on("decBtn", "click", () => updateCount(count - 1));
    on("resetBtn", "click", () => updateCount(0));

    // ---------- Greet Me ----------
    const nameInput = $("nameInput");

    function greetByName() {
      const name = nameInput ? nameInput.value.trim() : "";
      showMessage(name ? `Hello, ${name}! Welcome to JavaScript.` : "Please type your name first.");
      if (!name && nameInput) nameInput.focus();
    }

    on("nameBtn", "click", greetByName);
    onEnter("nameInput", greetByName);

    // ---------- Appearance (saved between visits) ----------
    function setAccent(hue) {
      document.documentElement.style.setProperty("--accent", `hsl(${hue}, 70%, 40%)`);
    }

    function setFontSize(size) {
      document.body.style.fontSize = size + "px";
    }

    let fontSize = storage.get("fontSize", 16);
    const savedHue = storage.get("accentHue", null);
    if (savedHue !== null) setAccent(savedHue);
    document.body.classList.toggle("dark", storage.get("dark", false));
    setFontSize(fontSize);

    on("colorBtn", "click", () => {
      const hue = randomInt(0, 359);
      setAccent(hue);
      storage.set("accentHue", hue);
      showMessage(`Accent color changed (hue ${hue}).`);
    });

    on("darkBtn", "click", () => {
      const isDark = document.body.classList.toggle("dark");
      storage.set("dark", isDark);
      showMessage(isDark ? "Dark mode on." : "Dark mode off.");
    });

    function changeFontSize(change) {
      fontSize = clamp(fontSize + change, 12, 32);
      setFontSize(fontSize);
      storage.set("fontSize", fontSize);
      showMessage(`Text size: ${fontSize}px`);
    }

    on("biggerBtn", "click", () => changeFontSize(2));
    on("smallerBtn", "click", () => changeFontSize(-2));

    // ---------- Tools ----------
    on("timeBtn", "click", () => showMessage("Now: " + new Date().toLocaleString()));
    on("randomBtn", "click", () => showMessage(`Your random number is ${randomInt(1, 100)}.`));

    on("secretBtn", "click", () => {
      const secret = $("secret");
      if (!secret) return;
      // getComputedStyle also works when the CSS (not inline style) hides it
      const hidden = getComputedStyle(secret).display === "none";
      secret.style.display = hidden ? "block" : "none";
    });

    // ---------- Task List (saved between visits) ----------
    const taskInput = $("taskInput");
    const taskList = $("taskList");
    let tasks = storage.get("tasks", []);

    const saveTasks = () => storage.set("tasks", tasks);

    function renderTasks() {
      if (!taskList) return;
      taskList.replaceChildren(
        ...tasks.map((task) => {
          const item = document.createElement("li");
          item.dataset.id = task.id;

          const label = document.createElement("span");
          label.textContent = task.text;
          label.title = "Click to mark done";
          label.style.cursor = "pointer";
          label.style.textDecoration = task.done ? "line-through" : "none";
          label.style.opacity = task.done ? "0.6" : "1";

          const removeBtn = document.createElement("button");
          removeBtn.type = "button";
          removeBtn.textContent = "Remove";
          removeBtn.dataset.action = "remove";

          item.append(label, " ", removeBtn);
          return item;
        })
      );
    }

    function addTask() {
      const text = taskInput ? taskInput.value.trim() : "";
      if (!text) {
        showMessage("Type a task before adding it.");
        if (taskInput) taskInput.focus();
        return;
      }

      tasks.push({ id: Date.now() + Math.random().toString(16).slice(2), text, done: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
      taskInput.focus();
    }

    // One listener for the whole list (works for tasks added later too)
    if (taskList) {
      taskList.addEventListener("click", (e) => {
        const item = e.target.closest("li");
        if (!item) return;

        if (e.target.dataset.action === "remove") {
          tasks = tasks.filter((t) => t.id !== item.dataset.id);
        } else if (e.target.tagName === "SPAN") {
          const task = tasks.find((t) => t.id === item.dataset.id);
          if (task) task.done = !task.done;
        } else {
          return;
        }
        saveTasks();
        renderTasks();
      });
    }

    on("addTaskBtn", "click", addTask);
    onEnter("taskInput", addTask);
    renderTasks();
  }

  // Works whether the script is in <head>, at the end of <body>, or loaded with defer
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
