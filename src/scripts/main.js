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
function effaceDerniereToucheEntree() {
    const screenValue = screen.textContent;
    screen.textContent = screenValue.slice(0, -1);
}

function handleUserInput(userInput) {
    const content = screen.textContent;
    if (isNumber(userInput) && content.length <= 1 && content === "0") {
        screen.textContent = "";
        displayInputs(userInput);
        return;
    }

    if (isOperator(userInput) && isLastOperator(content)) {
        if (content[content.length - 1] === userInput) return;
        else {
            effaceDerniereToucheEntree();
        }
    }

    if (isNumber(userInput) || isOperator(userInput)) {
        displayInputs(userInput);
        return;
    }
    if (userInput === "=") {
        if (isLastOperator(content)) return;
        // si expression ne contient pas d'operateir -> return
        if (/[/*+\-]/.test(content)) {
            littleScreen.textContent = content;
        } else return;
    }

    if (userInput === "BS") {
        if (content.length <= 1) {
            screen.textContent = "0";
        } else effaceDerniereToucheEntree();
    }
    if (userInput === "effacer") {
        screen.textContent = "0";
        littleScreen.textContent = "";
    }
}

window.addEventListener("keydown", (e) => {
    // console.log(e);
    let key = e.key;
    if (e.key === "Enter") {
        key = "=";
    }
    if (e.key === "Backspace") {
        key = "BS";
    }
    let button = document.querySelector(`[data-val="${key}"]`);
    button.classList.add("keydown-active");
    handleUserInput(key);
});

window.addEventListener("keyup", (e) => {
    let allo = document.querySelector(`[data-val="${e.key}"]`);
    allo.classList.remove("keydown-active");
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleUserInput(button.dataset.val);
    });
});
