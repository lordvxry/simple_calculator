const calculator = {
  displayValue: "",
  sign: "",
  firstOperand: "",
  isFirstOperand: false,
  secondOperand: "",
};

const display = document.querySelector(".calc__screen");
const keys = document.querySelector(".calc");

const updateDisplay = (value) => {
    if (calculator.displayValue === "0" && value === "0"){
        return;
    }
    calculator.displayValue += value;
    display.value = calculator.displayValue;
};

const operation = (a, b, sign) => {
    switch (sign) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return "";
    }
};

const calculate = () => {
    let result
    if (calculator.sign){
        result = operation(+calculator.firstOperand, +calculator.secondOperand, calculator.sign);
    } else {
        result = calculator.firstOperand;
    }

    calculator.firstOperand = String(result);
    calculator.displayValue = String(result);
    display.value = String(result);
}

keys.addEventListener("click", (event) => {
    if (!event.target.classList.contains("calc__btn")) {
        return;
    }

    const value = event.target.textContent;

    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
            if (!calculator.isFirstOperand){
                calculator.isFirstOperand = true;
                calculator.firstOperand = calculator.displayValue ?? "0";
            }
            calculator.displayValue = "";
            display.value = value;
            calculator.sign = value;
            break;
        case "=":
            calculator.secondOperand = calculator.displayValue ?? "0";
            calculator.isFirstOperand = false;
            calculate();
            calculator.sign = "";
            break;
        case "+/-":
            if (calculator.displayValue !== "0" && calculator.displayValue !== ""){
                calculator.displayValue = -calculator.displayValue;
                display.value = -display.value;
            }else {
                break;
            }
            break;
        case "<-":
            calculator.displayValue = calculator.displayValue.slice(0, -1);
            display.value = display.value.slice(0, -1);
            break;
        case "AC":
            for (const key in calculator){
                if (key !== "isFirstOperand"){
                    calculator[key] = "";
                } else {
                    calculator[key] = false;
                }
            }
            display.value = "";
        break;
        default:
            updateDisplay(value);
    }
});