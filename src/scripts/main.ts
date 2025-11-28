import "../styles/style.scss";
import "../styles/backgrounds.scss";
import "../styles/buttons.scss";
// import "./funkyBoxes";

/*
TODO : Supprimer the "funky" part 
TODO : Afficher msg quand user atteint 10 input de suite
TODO : Ajuster font-size input
TODO : Mettre css et scss dans differents dossiers
*/

const screen = document.getElementById("screen") as HTMLElement; // Balise html qui affiche les inputs du user
const littleScreen = document.getElementById("little-screen") as HTMLElement; // Balise html qui affiche l'espression entrée par le user (quand "=" est cliqué)
const buttons = document.querySelectorAll("button");
screen.textContent = "0";

// Fonctions Utilitaires :
/* Vérifie si la valeur entrée est un nombre */
const isNumber = (val: string) => /[0-9]/.test(val);
/* Vérifie si la valeur entrée est un opérateur valide de la calculatrice */
const isOperator = (val: string) => /^[/*+\-]$/.test(val);
/* Vérifie si le dernier caractere est un operateur */
const isLastOperator = (val: string) => isOperator(val[val.length - 1] ?? '');
/* Affiche les nombres et opérateurs choisis par le user à l'écran */
const displayInputs = (expression: string) => (screen.textContent += expression);
const removeLastKeyEntered = () => {
    const screenValue = screen.textContent ?? '';
    screen.textContent = screenValue.slice(0, -1);
};

function handleUserInput(userInput: string) {
    const content: string = screen.textContent ?? '';
    /**
     * Logique :
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
                removeLastKeyEntered();
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
            const str = resultat.toString();
            console.log(str.length);
            if (
                str.length > 12 ||
                Math.abs(resultat) >= 1e10 ||
                Math.abs(resultat) < 1e-6
            ) {
                screen.textContent = resultat.toExponential(0);
            } else screen.textContent = eval(resultat);
        } else return;
    }

    if (userInput === "Backspace") {
        if (content.length <= 1) {
            screen.textContent = "0";
        } else removeLastKeyEntered();
        return;
    }
    if (userInput === "effacer") {
        screen.textContent = "0";
        littleScreen.textContent = "";
        return;
    }
}

function isAllowedKeys(key: string) {
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
    const button = document.querySelector(`[data-val="${key}"]`) as HTMLElement;
    button.classList.add("keydown-active");
    handleUserInput(key);
});

window.addEventListener("keyup", (e) => {
    const key = e.key === "Enter" ? "=" : e.key;
    if (!isAllowedKeys(key)) return;
    if (e.repeat) return; //Empeche la touche de rester "stick" sur le clavier
    const button = document.querySelector(`[data-val="${key}"]`) as HTMLElement;
    button.classList.remove("keydown-active");
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleUserInput(button.dataset.val ?? '');
    });
});
