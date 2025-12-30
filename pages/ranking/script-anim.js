console.log(colors_colles)
fetch("/data/ranking-25-26.json")
    .then(response => response.json())
    .then(data => {

        const tbody = document.querySelector("#ranking-table tbody");

        data["OrdreAnimacions"].forEach((nom, index) => {
            const row = document.createElement("tr");

            colla = data[nom]

            const animacions = Object.entries(colla["animacions"])
                .map(([nom, punt]) => `${nom}: ${punt}<br>`)
                .join("\n");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td bgcolor=${colors_colles[nom]}>${nom}</td>
                <td bgcolor=${gris_fons_taules}>${animacions}</td>
                <td bgcolor=${color_posicio(colla.posicioMitjaAnim, 5)}>${colla.posicioMitjaAnim}</td>
                <td bgcolor=${color_posicio(10-colla.posicioMitjaAnimNorm, 10)}>${colla.posicioMitjaAnimNorm}</td>
                <td bgcolor=${color_puntuacio(colla.puntuacioAnimacio)}>${colla.puntuacioAnimacio}</td>
                <td style="background-color:${blau_generic}; color: #ffffff">${colla.totalAnimacio}</td>
            `;

            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error carregant les dades:", error);
    });