const previousOperandText = document.getElementById("previous-operand");
const currentOperandText = document.getElementById("current-operand");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-action]");

let currentOperand = "";
let previousOperand = "";
let operation = null;

/* ---------------- FUNCTIONS ---------------- */

function updateDisplay() {
    currentOperandText.innerText = currentOperand || "0";
    previousOperandText.innerText = operation
        ? `${previousOperand} ${operation}`
        : "";
}

function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
}

function chooseOperation(op) {
    if (currentOperand === "") return;
    if (previousOperand !== "") compute();

    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case "+":
            computation = prev + curr;
            break;
        case "-":
            computation = prev - curr;
            break;
        case "×":
            computation = prev * curr;
            break;
        case "÷":
            computation = curr === 0 ? "Error" : prev / curr;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = null;
    previousOperand = "";
}

function clearAll() {
    currentOperand = "";
    previousOperand = "";
    operation = null;
}

function clearEntry() {
    currentOperand = "";
}

function deleteDigit() {
    currentOperand = currentOperand.slice(0, -1);
}

/* ---------------- EVENTS ---------------- */

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.dataset.number);
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        switch (action) {
            case "add":
                chooseOperation("+");
                break;
            case "subtract":
                chooseOperation("-");
                break;
            case "multiply":
                chooseOperation("×");
                break;
            case "divide":
                chooseOperation("÷");
                break;
            case "equals":
                compute();
                break;
            case "clear":
                clearAll();
                break;
            case "clear-entry":
                clearEntry();
                break;
            case "delete":
                deleteDigit();
                break;
        }
        updateDisplay();
    });
});