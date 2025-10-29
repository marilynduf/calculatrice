import "../styles/style.css";
import "../styles/buttons.css";
import "./funkyBoxes";

// Fonctions calculatrices
const expressionScreen = document.querySelector(".expression");
const calculatorScreen = document.getElementById("calculator-screen");
const numbersButtons = document.querySelectorAll(".numbers button");
const resetButton = document.querySelector(".effacer");
const equalButton = document.querySelector(".equal");

/* Affiche les nombres et opérateurs choisis par le user à l'écran */
function afficheEcran(expression) {
    calculatorScreen.innerText += expression;
}

let nombre = null;
numbersButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        nombre = e.target.value;
        afficheEcran(nombre);
    });
});

const operators = document.querySelectorAll(".operators button");
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        if (!calculatorScreen.innerText) {
            calculatorScreen.innerText += `0${e.target.value}`;
            return;
        }
        calculatorScreen.innerText += e.target.value;
    });
});

// RESET Écrans
resetButton.addEventListener("click", () => {
    calculatorScreen.innerText = "";
    expressionScreen.innerText = "";
});

equalButton.addEventListener("click", () => {
    expressionScreen.innerText = calculatorScreen.innerText;
});
