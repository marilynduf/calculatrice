import "../styles/style.css";
import "../styles/buttons.css";
import "./funkyBoxes";

/* TODOS :
- DONE : Si expression = "0" ET que la longueur de l'expression est de 1 ou moins, on remplace par valeur entrée
- DONE : Si dernier élément de l'expression se termine par un opérateur 
  et quon ajoute un opérateur, on remplace l'ancien opérateur (last elem) par le nouveau 
*/

const screen = document.getElementById("screen"); // Balise html qui affiche les inputs du user
const littleScreen = document.getElementById("little-screen"); // Balise html qui affiche l'espression entrée par le user (quand "=" est cliqué)
const buttons = document.querySelectorAll("button");
screen.textContent = "0";

// Fonctions Utilitaires :
/* Vérifie si la valeur entrée est un nombre */
const isNumber = (val) => /[0-9]/.test(val);
/* Vérifie si la valeur entrée est un opérateur valide de la calculatrice */
const isOperator = (val) => /^[/*+\-]$/.test(val);
/* Vérifie si le dernier caractere est un operateur */
const isLastOperator = (val) => isOperator(val[val.length - 1]);
/* Affiche les nombres et opérateurs choisis par le user à l'écran */
function displayInputs(expression) {
    screen.textContent += expression;
}
function RemoveLastKeyEntered() {
    const screenValue = screen.textContent;
    screen.textContent = screenValue.slice(0, -1);
}

function handleUserInput(userInput) {
    const content = screen.textContent;
    // si input est un chiffre ET que la  moin ET que la valeur du seul, on ajoute le input
    /**
     * Logique métier :
     * - Si input est un chiffre ET
     * - Si longueur chaîne est égale à 1 ou moins
     * - Si content est égal à 0
     * - Résultat → Affiche userInput
     */

    if (isNumber(userInput)) {
        if (content.length <= 1 && content === "0") {
            screen.textContent = "";
            displayInputs(userInput);
            return;
        } else displayInputs(userInput);
        return;
    }

    if (isOperator(userInput)) {
        if (isLastOperator(content)) {
            const lastCaracter = content[content.length - 1];
            if (lastCaracter === userInput) {
                return;
            } else {
                RemoveLastKeyEntered();
                displayInputs(userInput);
            }
        } else displayInputs(userInput);
        return;
    }

    if (userInput === "=") {
        // Si le dernier caractere de l'expression est un opérateur, on ne fait rien
        if (isLastOperator(content)) return;
        // Si l'expression contient un opérateur, on affiche l'espression dans le petit écran puis on évalue l'expression, si non, on ne fait rien
        if (/[/*+\-]/.test(content)) {
            littleScreen.textContent = content;
            const resultat = eval(content);
            screen.textContent = eval(resultat);
        } else return;
    }

    if (userInput === "Backspace") {
        if (content.length <= 1) {
            screen.textContent = "0";
        } else RemoveLastKeyEntered();
        return;
    }
    if (userInput === "effacer") {
        screen.textContent = "0";
        littleScreen.textContent = "";
        return;
    }
}

function isAllowedKeys(key) {
    const allowedKeys = "0123456789+-*/=";
    const isKeyAllowed = allowedKeys.includes(key);
    if (isKeyAllowed || key === "=" || key === "Backspace") {
        return true;
    } else return false;
}
window.addEventListener("keydown", (e) => {
    const key = e.key === "Enter" ? "=" : e.key; // Standardise la touche "=" et "Enter"
    if (!isAllowedKeys(key)) return;
    if (e.repeat) return; // Empeche la touche de rester "stick" sur le clavier
    const button = document.querySelector(`[data-val="${key}"]`);
    button.classList.add("keydown-active");
    handleUserInput(key);
});

window.addEventListener("keyup", (e) => {
    const key = e.key === "Enter" ? "=" : e.key;
    if (!isAllowedKeys(key)) return;
    if (e.repeat) return; //Empeche la touche de rester "stick" sur le clavier
    const button = document.querySelector(`[data-val="${key}"]`);
    button.classList.remove("keydown-active");
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.dataset.val);
        handleUserInput(button.dataset.val);
    });
});
