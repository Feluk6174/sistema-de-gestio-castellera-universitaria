fetch("diades-25-26.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("diades-container");

        Object.entries(data).forEach(([nomDiada, colles]) => {
            const diadaDiv = document.createElement("div");
            diadaDiv.classList.add("diada");

            diadaDiv.innerHTML = `<h2>${nomDiada}</h2>`;

            Object.entries(colles).forEach(([nomColla, actuacio]) => {
                const collaDiv = document.createElement("div");
                collaDiv.classList.add("colla");

                const construccionsHTML = actuacio.Construccions.length
                    ? `<ul>${actuacio.Construccions.map(c => `<li>${c}</li>`).join("")}</ul>`
                    : "<p>-</p>";

                collaDiv.innerHTML = `
                    <h3>${nomColla}</h3>
                    <div class="castells"><strong>Entrada:</strong> ${actuacio.Entrada || "-"}</div>
                    <div class="castells">
                        <strong>Construccions:</strong>
                        ${construccionsHTML}
                    </div>
                    <div class="castells"><strong>Pilar:</strong> ${actuacio.Pilar || "-"}</div>
                    <div class="castells"><strong>Sortida:</strong> ${actuacio.Sortida || "-"}</div>
                `;

                diadaDiv.appendChild(collaDiv);
            });

            container.appendChild(diadaDiv);
        });
    })
    .catch(error => {
        console.error("Error carregant les diades:", error);
    });
