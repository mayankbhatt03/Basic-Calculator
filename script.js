// script.js

const prevEl = document.getElementById("prev");
const currEl = document.getElementById("curr");
let current = "0";
let previous = "";
let operator = null;

function updateDisplay() {
  currEl.textContent = current;
  prevEl.textContent = previous + (operator || "");
}

// Digit pressed
function appendDigit(digit) {
  if (current === "0") current = digit;
  else current += digit;
}

// Decimal point
function appendDecimal() {
  if (!current.includes(".")) current += ".";
}

// Clear all
function clearAll() {
  current = "0";
  previous = "";
  operator = null;
}

// Delete last character
function deleteLast() {
  current = current.slice(0, -1);
  if (current === "" || current === "-") current = "0";
}

// Choose operator
function chooseOperator(op) {
  if (operator && previous !== "") evaluate();
  operator = op;
  previous = current;
  current = "0";
}

// Percentage
function percent() {
  current = String(parseFloat(current) / 100);
}

// Evaluate expression
function evaluate() {
  let a = parseFloat(previous);
  let b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return;
  let result = 0;
  switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/": result = b !== 0 ? a / b : "Error"; break;
  }
  current = String(result);
  previous = "";
  operator = null;
}

// Handle button clicks
document.querySelector(".keys").addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  if (action === "digit") appendDigit(btn.dataset.digit);
  else if (action === "decimal") appendDecimal();
  else if (action === "clear") clearAll();
  else if (action === "delete") deleteLast();
  else if (action === "operator") chooseOperator(btn.dataset.operator);
  else if (action === "equals") evaluate();
  else if (action === "negate") negate();
  else if (action === "percent") percent();

  updateDisplay();
});

// Keyboard support
document.addEventListener("keydown", e => {
  if (e.key >= "0" && e.key <= "9") appendDigit(e.key);
  else if (e.key === ".") appendDecimal();
  else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") chooseOperator(e.key);
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); evaluate(); }
  else if (e.key === "Backspace") deleteLast();
  else if (e.key === "Escape") clearAll();
  else if (e.key === "%") percent();
  updateDisplay();
});

// Initialize display
updateDisplay();
