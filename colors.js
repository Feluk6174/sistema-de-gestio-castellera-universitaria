colors_colles = {
    Ganàpies: "#257ba2",
    Arreplegats: "#15a884",
    Xoriguers: "#12c3f4",
    Marracos: "#979db5",
    Emboirats: "#c80036",
    Gambirots: "#c6d6f1",
    Pataquers: "#f25d00",
    Bergants: "#9dd237",
    Passerells: "#c99fd0",
    Llunàtics: "#21277c",
    Penjats: "#f80000",
    Engrescats: "#ffdd00",
    Trempats: "#a48970",
    Grillats: "#cd157a",
    Descargolats: "#ff3da8"
}

console.log("colors")

colors_castells = {
    "Pd3": "#ffffff",
    "Pd3s": "#ffffff",
    "3d5": "#ffffff",
    "4d5": "#ffffff",
    "2d5": "#ffffff",
    "3d5a": "#ffffff",
    "4d5a": "#ffffff",
    "Pd4": "#ffffff",
    "5d5": "#ffffff",
    "5d5mg": "#ffffff",
    "5d5a": "#ffffff",
    "Pd4s": "#ffffff",
    "3d5s": "#ffffff",
    "2d5s": "#ffffff",
    "7d5": "#ffffff",
    "9d5": "#ffffff",
    "4d6": "#E6E6FF",
    "3d6": "#E6E6FF",
    "3d6a": "#E6E6FF",
    "4d6a": "#E6E6FF",
    "5d6": "#CCCCFF",
    "5d6mg": "#CCCCFF",
    "7d6": "#CCCCFF",
    "7d6mg": "#CCCCFF",
    "2d6": "#CCCCFF",
    "5d6a": "#CCCCFF",
    "10d6": "#CCCCFF",
    "9d6": "#CCCCFF",
    "3d6s": "#9999ff",
    "4d6s": "#9999ff",
    "2d6s": "#9999ff",
    "Pd5": "#9999ff",
    "4d7": "#9999ff",
    "3d7": "#9999ff",
    "4d7a": "#6666ff",
    "7d7": "#6666ff",
    "Pd5s": "#6666ff",
    "2d7f": "#6666ff",
    "3d7a": "#6666ff",
    "Pd6f": "#6666ff",
    "10d7": "#6666ff",
    "7d7mg": "#6666ff",
    "5d7": "#6666ff",
    "5d7mg": "#4D4DB3",
    "5d7a": "#4D4DB3",
    "4d8f": "#4D4DB3",
    "3d8f": "#4D4DB3",
    "4d7s": "#333366",
    "3d7s": "#333366",
    "9d7": "#333366",
    "4d8sf": "#333366",
    "Pd7fm": "#333366",
    "2d8fm": "#333366",
    "2d7sf": "#1A1A33",
    "4d8fa": "#1A1A33",
    "3d8fa": "#1A1A33",
    "5d8f": "#1A1A33",
    "7d8": "#1A1A33",
    "3d8sf": "#1A1A33",
    "Pd6sf": "#1A1A33",
    "4d9f": "#000000",
    "3d9fm": "#000000",
    "Pd8fmp": "#000000",
    "Pd3C": "#00ffff",
    "Pd3sC": "#00ffff",
    "3d5C": "#00ffff",
    "4d5C": "#00ffff",
    "2d5C": "#00ffff",
    "3d5aC": "#00ffff",
    "4d5aC": "#00ffff",
    "Pd4C": "#00ffff",
    "5d5C": "#00ffff",
    "5d5mgC": "#00ffff",
    "5d5aC": "#00ffff",
    "Pd4sC": "#00ffff",
    "3d5sC": "#00ffff",
    "2d5sC": "#00ffff",
    "7d5C": "#00ffff",
    "9d5C": "#00ffff",
    "4d6C": "#00ffff",
    "3d6C": "#00ffff",
    "3d6aC": "#00ffff",
    "4d6aC": "#00ffff",
    "5d6C": "#00ffff",
    "5d6mgC": "#00ffff",
    "7d6C": "#00ffff",
    "7d6mgC": "#00ffff",
    "2d6C": "#00ffff",
    "5d6aC": "#00ffff",
    "10d6C": "#00ffff",
    "9d6C": "#00ffff",
    "3d6sC": "#00ffff",
    "4d6sC": "#00ffff",
    "2d6sC": "#00ffff",
    "Pd5C": "#00ffff",
    "4d7C": "#00ffff",
    "3d7C": "#00ffff",
    "4d7aC": "#00ffff",
    "7d7C": "#00ffff",
    "Pd5sC": "#00ffff",
    "2d7fC": "#00ffff",
    "3d7aC": "#00ffff",
    "Pd6fC": "#00ffff",
    "10d7C": "#00ffff",
    "7d7mgC": "#00ffff",
    "5d7C": "#00ffff",
    "5d7mgC": "#00ffff",
    "5d7aC": "#00ffff",
    "4d8fC": "#00ffff",
    "3d8fC": "#00ffff",
    "4d7sC": "#00ffff",
    "3d7sC": "#00ffff",
    "9d7C": "#00ffff",
    "4d8sfC": "#00ffff",
    "Pd7fmC": "#00ffff",
    "2d8fmC": "#00ffff",
    "2d7sfC": "#00ffff",
    "4d8faC": "#00ffff",
    "3d8faC": "#00ffff",
    "5d8fC": "#00ffff",
    "7d8C": "#00ffff",
    "3d8sfC": "#00ffff",
    "Pd6sfC": "#00ffff",
    "4d9fC": "#00ffff",
    "3d9fmC": "#00ffff",
    "Pd8fmpC": "#00ffff",
    "": "#ffffff"
}


const participants = 6

function color_posicio(posicio) {  
    // colors inicial i final
    const start = { r: 0, g: 0, b: 255 };     // #0000FF
    const end   = { r: 255, g: 255, b: 255 }; // #FFFFFF

    const factor = participants === 1
      ? 0
      : posicio / (participants - 1);

    const r = Math.round(start.r + (end.r - start.r) * factor);
    const g = Math.round(start.g + (end.g - start.g) * factor);
    const b = Math.round(start.b + (end.b - start.b) * factor);

    const toHex = v => v.toString(16).padStart(2, "0");

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  
function color_puntuacio(valor) {
  if (valor < 5) {
    return "#ff0000"
  }
  if (valor > 10) {
    return "#0000ff"
  }

  // colors inicial i final
  const start = { r: 0, g: 0, b: 255 };     // blau
  const end   = { r: 255, g: 255, b: 255 }; // blanc

  // normalitzem: 10 → 0, 5 → 1
  const factor = (10 - valor) / 5;

  const r = Math.round(start.r + (end.r - start.r) * factor);
  const g = Math.round(start.g + (end.g - start.g) * factor);
  const b = Math.round(start.b + (end.b - start.b) * factor);

  const toHex = v => v.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
