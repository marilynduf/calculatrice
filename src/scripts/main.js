import "./styles/style.css";
import "./styles/buttons.css";
import createRandomColor from "./getCustomColor";
import getContrastingColor from "./getContrastingColor";

const title = document.querySelector("#title");
const button = document.querySelector("#button");
const originalBox = document.querySelector(".originalBox");
const body = document.querySelector("#app");

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
