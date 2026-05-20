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

function getTeamColor(colla) {
  if (typeof colors_colles !== "undefined" && colors_colles[colla]) {
    return colors_colles[colla];
  }
  return "#d3d8e5";
}

function sortedParticipants(ranking) {
  return Object.entries(ranking)
    .map(([colla, posicio]) => ({ colla, posicio }))
    .sort((a, b) => a.posicio - b.posicio || a.colla.localeCompare(b.colla, "ca"));
}

function isWinnerOnlyCase(participants) {
  if (participants.length < 2) {
    return false;
  }

  const winners = participants.filter((team) => team.posicio === 1);
  if (winners.length !== 1) {
    return false;
  }

  const rest = participants.filter((team) => team.posicio !== 1);
  if (!rest.length) {
    return false;
  }

  const arbitraryValue = rest[0].posicio;
  return arbitraryValue > 1 && rest.every((team) => team.posicio === arbitraryValue);
}

function createPodiItem({ colla, posicio }) {
  const item = document.createElement("article");
  item.className = "podi-item";

  const color = getTeamColor(colla);
  item.style.backgroundColor = color;
  item.style.color = getContrastTextColor(color);

  const pos = document.createElement("p");
  pos.className = "podi-pos";
  pos.textContent = `${posicio}a posicio`;

  const name = document.createElement("h3");
  name.className = "podi-team";
  name.textContent = colla;

  item.appendChild(pos);
  item.appendChild(name);
  return item;
}

function createParticipantRow({ colla, posicio }) {
  const li = document.createElement("li");
  li.className = "participant-row";

  const posChip = document.createElement("span");
  posChip.className = "participant-pos";
  posChip.textContent = String(posicio);

  const teamBadge = document.createElement("span");
  teamBadge.className = "participant-team";
  teamBadge.textContent = colla;

  const color = getTeamColor(colla);
  teamBadge.style.backgroundColor = color;
  teamBadge.style.color = getContrastTextColor(color);

  li.appendChild(posChip);
  li.appendChild(teamBadge);
  return li;
}

function renderDiades(data) {
  const container = document.getElementById("diades-list");
  const entries = Object.entries(data);

  if (!entries.length) {
    container.innerHTML = '<p class="status">No hi ha diades disponibles.</p>';
    return;
  }

  container.innerHTML = "";

  entries.forEach(([amfitrio, info]) => {
    const ranking = info && info.Ranking ? info.Ranking : {};
    const participants = sortedParticipants(ranking);
    const hasRanking = participants.length > 0;

    const card = document.createElement("section");
    card.className = "diada-card";

    const title = document.createElement("h2");
    title.className = "diada-title";
    title.textContent = amfitrio;
    const hostColor = getTeamColor(amfitrio);
    title.style.backgroundColor = hostColor;
    title.style.color = getContrastTextColor(hostColor);

    const subtitle = document.createElement("p");
    subtitle.className = "diada-date";
    subtitle.textContent = info && info.Data ? info.Data : "Data no disponible";

    const podiTitle = document.createElement("h3");
    podiTitle.className = "section-title";
    podiTitle.textContent = "Podi";

    const podi = document.createElement("div");
    podi.className = "podi";

    const winnerOnly = hasRanking && isWinnerOnlyCase(participants);
    const podiTeams = winnerOnly ? participants.slice(0, 1) : participants.slice(0, 3);

    podiTeams.forEach((team) => {
      podi.appendChild(createPodiItem(team));
    });

    let winnerOnlyWarning = null;
    if (winnerOnly) {
      podi.classList.add("podi-single");

      winnerOnlyWarning = document.createElement("p");
      winnerOnlyWarning.className = "winner-only-note";
      winnerOnlyWarning.textContent = "* En aquesta diada nomes s'ha anunciat la colla guanyadora.";
    }

    let missingDataWarning = null;
    if (!hasRanking) {
      missingDataWarning = document.createElement("p");
      missingDataWarning.className = "winner-only-note";
      missingDataWarning.textContent = "* Falten les dades del ranking encara.";
    }

    const listTitle = document.createElement("h3");
    listTitle.className = "section-title";
    listTitle.textContent = "Classificacio";

    const list = document.createElement("ol");
    list.className = "participants-list";
    participants.forEach((team) => {
      list.appendChild(createParticipantRow(team));
    });

    const noDataText = document.createElement("p");
    noDataText.className = "status";
    noDataText.textContent = "Sense classificacio disponible.";

    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(podiTitle);
    if (hasRanking) {
      card.appendChild(podi);
    }
    if (winnerOnlyWarning) {
      card.appendChild(winnerOnlyWarning);
    }
    if (missingDataWarning) {
      card.appendChild(missingDataWarning);
    }
    card.appendChild(listTitle);
    if (hasRanking) {
      card.appendChild(list);
    } else {
      card.appendChild(noDataText);
    }
    container.appendChild(card);
  });
}

async function initDiades() {
  const container = document.getElementById("diades-list");

  try {
    const response = await fetch("data/primavera-2026.json");
    if (!response.ok) {
      throw new Error(`Error carregant el JSON (${response.status})`);
    }

    const data = await response.json();
    renderDiades(data);
  } catch (error) {
    container.innerHTML = '<p class="status">No s\'han pogut carregar les dades.</p>';
  }
}

initDiades();
