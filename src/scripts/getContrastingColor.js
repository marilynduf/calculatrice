function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    const r = Math.round(255 * f(0));
    const g = Math.round(255 * f(8));
    const b = Math.round(255 * f(4));
    return {
        r,
        g,
        b,
    };
}
function getRelativeLuminance(rgb) {
    const sRGB = [rgb.r, rgb.g, rgb.b].map((c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}
function getContrastRatio(luminance1, luminance2) {
    const L1 = Math.max(luminance1, luminance2);
    const L2 = Math.min(luminance1, luminance2);
    return (L1 + 0.05) / (L2 + 0.05);
}
export default function getContrastingColor(h, s, l) {
    const backgroundRgb = hslToRgb(h, s, l);
    console.log(backgroundRgb);
    const backgroundLuminance = getRelativeLuminance(backgroundRgb);

    const blackLuminance = getRelativeLuminance({ r: 0, g: 0, b: 0 });
    const whiteLuminance = getRelativeLuminance({ r: 255, g: 255, b: 255 });

    const contrastWithBlack = getContrastRatio(
        backgroundLuminance,
        blackLuminance
    );
    const contrastWithWhite = getContrastRatio(
        backgroundLuminance,
        whiteLuminance
    );

    if (contrastWithWhite >= 4.5) {
        return "#FFFFFF"; // White text
    } else if (contrastWithBlack >= 4.5) {
        return "#000000"; // Black text
    } else {
        // If neither black nor white works, a more complex algorithm is needed
        // to find a suitable color, potentially by adjusting lightness/darkness
        // of the background or choosing a color from a pre-defined palette.
        // For a 4.5:1 ratio, often one of these will work.
        // As a fallback, you might need to adjust the background color itself.
        console.warn(
            "Neither black nor white provides 4.5:1 contrast. Consider adjusting background."
        );
        return "#808080"; // Fallback to a neutral grey, or implement a more advanced color adjustment.
    }
}
