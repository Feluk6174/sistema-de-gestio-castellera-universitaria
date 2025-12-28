const blau_generic = "#0b5ed7"
const gris_fons_taules = "#F7F7FF"


const colors_colles = {
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

const colors_grups = {
    "0": {
      "bg": gris_fons_taules,
      "txt": "#000000"
    },
    "1": {
      "bg": "#E6E6FF",
      "txt": "#000000"
    },
    "2": {
      "bg": "#CCCCFF",
      "txt": "#000000"
    },
    "3": {
      "bg": "#9999ff",
      "txt": "#000000"
    },
    "4": {
      "bg": "#6666ff",
      "txt": "#000000"
    },
    "5": {
      "bg": "#4D4DB3",
      "txt": "#000000"
    },
    "6": {
      "bg": "#333366",
      "txt": "#ffffff"
    },
    "7": {
      "bg": "#1A1A33",
      "txt": "#ffffff"
    },
    "8": {
      "bg": "#000000",
      "txt": "#ffffff"
    },
    "C": {
      "bg": "#00ffff",
      "txt": "#000000"
    }
}



grups_castells = {
    "Pd3": "0",
    "Pd3s": "0",
    "3d5": "0",
    "4d5": "0",
    "2d5": "0",
    "3d5a": "0",
    "4d5a": "0",
    "Pd4": "0",
    "5d5": "0",
    "5d5mg": "0",
    "5d5a": "0",
    "Pd4s": "0",
    "3d5s": "0",
    "2d5s": "0",
    "7d5": "0",
    "9d5": "0",
    "4d6": "1",
    "3d6": "1",
    "3d6a": "1",
    "4d6a": "1",
    "5d6": "2",
    "5d6mg": "2",
    "7d6": "2",
    "7d6mg": "2",
    "2d6": "2",
    "5d6a": "2",
    "10d6": "2",
    "9d6": "2",
    "3d6s": "3",
    "4d6s": "3",
    "2d6s": "3",
    "Pd5": "3",
    "4d7": "3",
    "3d7": "3",
    "4d7a": "4",
    "7d7": "4",
    "Pd5s": "4",
    "2d7f": "4",
    "3d7a": "4",
    "Pd6f": "4",
    "10d7": "4",
    "7d7mg": "4",
    "5d7": "4",
    "5d7mg": "5",
    "5d7a": "5",
    "4d8f": "5",
    "3d8f": "5",
    "4d7s": "6",
    "3d7s": "6",
    "9d7": "6",
    "4d8sf": "6",
    "Pd7fm": "6",
    "2d8fm": "6",
    "2d7sf": "7",
    "4d8fa": "7",
    "3d8fa": "7",
    "5d8f": "7",
    "7d8": "7",
    "3d8sf": "7",
    "Pd6sf": "7",
    "4d9f": "8",
    "3d9fm": "8",
    "Pd8fmp": "8",
    "Pd3C": "C",
    "Pd3sC": "C",
    "3d5C": "C",
    "4d5C": "C",
    "2d5C": "C",
    "3d5aC": "C",
    "4d5aC": "C",
    "Pd4C": "C",
    "5d5C": "C",
    "5d5mgC": "C",
    "5d5aC": "C",
    "Pd4sC": "C",
    "3d5sC": "C",
    "2d5sC": "C",
    "7d5C": "C",
    "9d5C": "C",
    "4d6C": "C",
    "3d6C": "C",
    "3d6aC": "C",
    "4d6aC": "C",
    "5d6C": "C",
    "5d6mgC": "C",
    "7d6C": "C",
    "7d6mgC": "C",
    "2d6C": "C",
    "5d6aC": "C",
    "10d6C": "C",
    "9d6C": "C",
    "3d6sC": "C",
    "4d6sC": "C",
    "2d6sC": "C",
    "Pd5C": "C",
    "4d7C": "C",
    "3d7C": "C",
    "4d7aC": "C",
    "7d7C": "C",
    "Pd5sC": "C",
    "2d7fC": "C",
    "3d7aC": "C",
    "Pd6fC": "C",
    "10d7C": "C",
    "7d7mgC": "C",
    "5d7C": "C",
    "5d7mgC": "C",
    "5d7aC": "C",
    "4d8fC": "C",
    "3d8fC": "C",
    "4d7sC": "C",
    "3d7sC": "C",
    "9d7C": "C",
    "4d8sfC": "C",
    "Pd7fmC": "C",
    "2d8fmC": "C",
    "2d7sfC": "C",
    "4d8faC": "C",
    "3d8faC": "C",
    "5d8fC": "C",
    "7d8C": "C",
    "3d8sfC": "C",
    "Pd6sfC": "C",
    "4d9fC": "C",
    "3d9fmC": "C",
    "Pd8fmpC": "C",
    "": "0"
}


const participants = 6

function color_posicio(posicio) {  
    // colors inicial i final
    const start = { r: 0, g: 0, b: 255 };     // #0000FF
    const end   = { r: 247, g: 247, b: 255 }; // #f9f9ff

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
  const end   = { r: 247, g: 247, b: 255 }; // fons basic

  // normalitzem: 10 → 0, 5 → 1
  const factor = (10 - valor) / 5;

  const r = Math.round(start.r + (end.r - start.r) * factor);
  const g = Math.round(start.g + (end.g - start.g) * factor);
  const b = Math.round(start.b + (end.b - start.b) * factor);

  const toHex = v => v.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
