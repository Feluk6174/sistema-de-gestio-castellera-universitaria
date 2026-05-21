function hexToRgb(hexColor) {
  const cleanHex = hexColor.replace("#", "");
  const normalized = cleanHex.length === 3
    ? cleanHex.split("").map((ch) => ch + ch).join("")
    : cleanHex;

  const value = parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

function getContrastTextColor(backgroundHex) {
  const { r, g, b } = hexToRgb(backgroundHex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#111111" : "#ffffff";
}

function toRgba(hexColor, alpha) {
  const { r, g, b } = hexToRgb(hexColor);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatAverage(positions) {
  const total = positions.reduce((acc, value) => acc + value, 0);
  return (total / positions.length).toFixed(2);
}

function buildTeamRows(rawData) {
  const teams = {};

  Object.entries(rawData).forEach(([amfitrio, eventInfo]) => {
    if (!eventInfo || !eventInfo.Ranking) {
      return;
    }

    const participantCount = Object.keys(eventInfo.Ranking).length;
    if (participantCount === 0) {
      return;
    }

    Object.entries(eventInfo.Ranking).forEach(([colla, posicio]) => {
      if (!teams[colla]) {
        teams[colla] = [];
      }

      teams[colla].push({
        posicio,
        amfitrio,
        normalized: posicio / participantCount
      });
    });
  });

  return Object.entries(teams)
    .map(([colla, participacions]) => {
      const onlyPositions = participacions.map((entry) => entry.posicio);
      const normalizedScores = participacions.map((entry) => entry.normalized);
      return {
        colla,
        participacions,
        average: Number(formatAverage(onlyPositions)),
        normalizedAverage: Number(formatAverage(normalizedScores))
      };
    })
    .sort((a, b) => a.normalizedAverage - b.normalizedAverage || a.colla.localeCompare(b.colla, "ca"));
}

function renderRanking(rows) {
  const tbody = document.getElementById("ranking-body");

  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="status">No hi ha dades disponibles.</td></tr>';
    return;
  }

  tbody.innerHTML = "";

  rows.forEach((row) => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.className = "team-name";
    const collaBg = (typeof colors_colles !== "undefined" && colors_colles[row.colla])
      ? colors_colles[row.colla]
      : "#d3d8e5";
    const nameBadge = document.createElement("span");
    nameBadge.className = "team-name-badge";
    nameBadge.textContent = row.colla;
    nameBadge.style.backgroundColor = toRgba(collaBg, 0.9);
    nameBadge.style.color = getContrastTextColor(collaBg);
    nameTd.appendChild(nameBadge);

    const positionsTd = document.createElement("td");
    const positionsWrap = document.createElement("div");
    positionsWrap.className = "positions";

    row.participacions.forEach(({ posicio, amfitrio }) => {
      const chip = document.createElement("span");
      chip.className = "position-chip";
      chip.textContent = String(posicio);

      const bgColor = (typeof colors_colles !== "undefined" && colors_colles[amfitrio])
        ? colors_colles[amfitrio]
        : "#d3d8e5";

      chip.style.backgroundColor = bgColor;
      chip.style.color = getContrastTextColor(bgColor);
      chip.title = `Amfitrio: ${amfitrio}`;

      positionsWrap.appendChild(chip);
    });

    positionsTd.appendChild(positionsWrap);

    const averageTd = document.createElement("td");
    averageTd.className = "average";
    averageTd.textContent = row.average.toFixed(2);

    const normalizedAverageTd = document.createElement("td");
    normalizedAverageTd.className = "average";
    normalizedAverageTd.textContent = row.normalizedAverage.toFixed(2);

    tr.appendChild(nameTd);
    tr.appendChild(positionsTd);
    tr.appendChild(averageTd);
    tr.appendChild(normalizedAverageTd);
    tbody.appendChild(tr);
  });
}

async function initRanking() {
  const tbody = document.getElementById("ranking-body");

  try {
    const response = await fetch("data/primavera-2026.json");
    if (!response.ok) {
      throw new Error(`Error carregant el JSON (${response.status})`);
    }

    const data = await response.json();
    const rows = buildTeamRows(data);
    renderRanking(rows);
  } catch (error) {
    tbody.innerHTML = "<tr><td colspan=\"4\" class=\"status\">No s'han pogut carregar les dades.</td></tr>";
  }
}

initRanking();
