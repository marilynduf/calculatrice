export default function createRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const min = 20;
    const max = 100;
    const lightness = Math.floor(Math.random() * (max - min + 1)) + min;
    return `hsl(${hue}, 100%, ${lightness}%)`;
}
