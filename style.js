// ---------- Smooth Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ---------- Back to Top Button ----------
const topBtn = document.createElement("button");
topBtn.id = "topBtn";
topBtn.innerText = "↑";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Dark / Light Mode Toggle ----------
const toggleBtn = document.createElement("button");
toggleBtn.id = "modeToggle";
toggleBtn.innerHTML = "🌙 Dark Mode";
document.querySelector("header").appendChild(toggleBtn);

let darkMode = false;

toggleBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  toggleBtn.innerHTML = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ---------- Contact Form Validation ----------
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      showAlert("⚠️ Please fill out all fields!", "error");
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      showAlert("📧 Invalid email address!", "error");
    } else {
      showAlert("✅ Message sent successfully!", "success");
      form.reset();
    }
  });
}

// ---------- Helper Functions ----------
function showAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.classList.add("show"), 50);
  setTimeout(() => {
    alertBox.classList.remove("show");
    setTimeout(() => alertBox.remove(), 300);
  }, 2500);
}

// ---------- Styles Added by JS ----------
const style = document.createElement("style");
style.textContent = `
  /* Back to Top Button */
  #topBtn {
    position: fixed;
    bottom: 20px;
    right: 25px;
    background: #f5c518;
    color: #000;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    display: none;
    box-shadow: 0 0 10px rgba(245, 197, 24, 0.4);
    transition: background 0.3s, transform 0.3s;
    z-index: 1000;
  }
  #topBtn:hover {
    background: #d4aa1e;
    transform: scale(1.1);
  }

  /* Dark Mode */
  body.dark-mode {
    background-color: #111;
    color: #f1f1f1;
  }
  body.dark-mode header {
    background-color: #000;
  }
  body.dark-mode nav {
    background-color: #222;
  }
  body.dark-mode section {
    background-color: #1a1a1a;
    color: #f1f1f1;
  }
  body.dark-mode footer {
    background-color: #000;
  }

  /* Toggle Button */
  #modeToggle {
    background: #f5c518;
    border: none;
    color: #000;
    font-weight: bold;
    border-radius: 25px;
    padding: 8px 18px;
    cursor: pointer;
    margin-top: 10px;
    transition: 0.3s;
  }
  #modeToggle:hover {
    background: #d4aa1e;
  }

  /* Alert Box */
  .alert {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) scale(0.9);
    padding: 12px 25px;
    border-radius: 8px;
    font-weight: 500;
    color: #fff;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }
  .alert.show {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  .alert.success { background-color: #28a745; }
  .alert.error { background-color: #d9534f; }
`;
document.head.appendChild(style);
