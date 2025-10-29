import "../styles/style.css";
import "../styles/buttons.css";

import createRandomColor from "./getCustomColor";
import getContrastingColor from "./getContrastingColor";

const title = document.querySelector("#title");
const button = document.querySelector("#button");
const originalBox = document.querySelector(".originalBox");
const body = document.querySelector("#app");

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
    console.log(calculatorScreen.innerText);
    expressionScreen.innerText = calculatorScreen.innerText;
});

// Couleurs funky et boîtes
function createRandomHslNumbers() {
    const hue = Math.floor(Math.random() * 360);
    const lightness = Math.floor(Math.random() * 100);
    return [hue, 100, lightness];
}
function addNewbox(width, height, clicks) {
    const newBox = document.createElement("div");
    newBox.classList.add("box");
    newBox.style.zIndex = `-${clicks}`;
    newBox.style.backgroundColor = createRandomColor();
    let newHeight = (newBox.style.height = height + 20 * clicks + "px");
    let newWidth = (newBox.style.width = width + 20 * clicks + "px");
    const body = document.querySelector("body");
    body.appendChild(newBox);
}
function deleteBox(index) {
    const boxes = document.querySelectorAll(`.box`);
    const elem = Array.from(boxes).find(
        (el) => window.getComputedStyle(el).zIndex === index
    );
    elem.remove();
}

let countClick = 0;
let toggleUp = true;
const MAX = 15;

button.addEventListener("click", () => {
    countClick += 1;
    originalBox.style.backgroundColor = createRandomColor();
    title.style.color = createRandomColor();
    const [h, s, l] = createRandomHslNumbers();
    button.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
    button.style.color = getContrastingColor(h, s, l);
    body.style.backgroundColor = createRandomColor();

    const originalBoxWidth = originalBox.offsetWidth;
    const originalBoxHeight = originalBox.offsetHeight;
    if (toggleUp) {
        addNewbox(originalBoxWidth, originalBoxHeight, countClick);
        if (countClick === MAX) {
            toggleUp = false;
            countClick = 0;
        }
    } else {
        if (countClick > MAX) {
            toggleUp = true;
            countClick = 0;
            return;
        }

        const index = `-${MAX + 1 - countClick}`;
        deleteBox(index);
    }
});
