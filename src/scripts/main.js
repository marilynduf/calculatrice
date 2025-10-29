import "../styles/style.css";
import "../styles/buttons.css";
import "./funkyBoxes";

/* TODOS :
- DONE : Si expression = "0" ET que la longueur de l'expression est de 1 ou moins, on remplace par valeur entrée
- DONE : Si dernier élément de l'expression se termine par un opérateur 
  et quon ajoute un opérateur, on remplace l'ancien opérateur (last elem) par le nouveau 
*/

// Fonctions calculatrices
const completedExpressionScreen = document.querySelector(".expression");
const calculatorScreen = document.getElementById("calculator-screen");
const numbersButtons = document.querySelectorAll("button");

calculatorScreen.textContent = "0";

/* Vérifie si la valeur entrée est un nombre */
const isNumber = (val) => /[0-9]/.test(val);
/* Vérifie si la valeur entrée est un opérateur valide de la calculatrice */
const isOperator = (val) => /^[/*+\-]$/.test(val);
/* Vérifie si le dernier caractere est un operateur */
const isLastOperator = (val) => isOperator(val[val.length - 1]);
/* Affiche les nombres et opérateurs choisis par le user à l'écran */
function afficheEcran(expression) {
    calculatorScreen.textContent += expression;
}
function effaceDerniereToucheEntree() {
    const screenValue = calculatorScreen.textContent;
    calculatorScreen.textContent = screenValue.slice(0, -1);
}

function handleUserInput(userInput) {
    const content = calculatorScreen.textContent;
    if (isNumber(userInput) && content.length <= 1 && content === "0") {
        calculatorScreen.textContent = "";
        afficheEcran(userInput);
        return;
    }

    if (isOperator(userInput) && isLastOperator(content)) {
        if (content[content.length - 1] === userInput) return;
        else {
            effaceDerniereToucheEntree();
        }
    }

    if (isNumber(userInput) || isOperator(userInput)) {
        afficheEcran(userInput);
        return;
    }
    if (userInput === "=") {
        if (isLastOperator(content)) return;
        // si expression ne contient pas d'operateir -> return
        if (/[/*+\-]/.test(content)) {
            completedExpressionScreen.textContent = content;
        } else return;
    }

    if (userInput === "BS") {
        if (content.length <= 1) {
            calculatorScreen.textContent = "0";
        } else effaceDerniereToucheEntree();
    }
}

window.addEventListener("keydown", (e) => {
    let key = e.key;
    if (e.key === "Enter") {
        key = "=";
    }
    if (e.key === "Backspace") {
        key = "BS";
    }
    handleUserInput(key);
});

numbersButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleUserInput(button.dataset.val);
    });
});
