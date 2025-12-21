console.log(colors_colles)
fetch("dades.json")
    .then(response => response.json())
    .then(data => {

        const tbody = document.querySelector("#ranking-table tbody");

        data["Ordre"].forEach((nom, index) => {
            const row = document.createElement("tr");

            colla = data[nom]

            const animacions = Object.entries(colla["animacions"])
                .map(([nom, punt]) => `${nom}: ${punt}<br>`)
                .join("\n");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td bgcolor=${colors_colles[nom]}>${nom}</td>
                <td bgcolor=${colors_castells[colla.millorsCastells[0]]}>${colla.millorsCastells[0]}</td>
                <td bgcolor=${colors_castells[colla.millorsCastells[1]]}>${colla.millorsCastells[1]}</td>
                <td bgcolor=${colors_castells[colla.millorsCastells[2]]}>${colla.millorsCastells[2]}</td>
                <td bgcolor=${colors_castells[colla.millorPilar]}>${colla.millorPilar}</td>
                <td>${animacions}</td>
                <td bgcolor=${color_posicio(colla.posicioMitjaAnim, 5)}>${colla.posicioMitjaAnim}</td>
                <td bgcolor=${color_puntuacio(colla.puntuacioAnimacio)}>${colla.puntuacioAnimacio}</td>
            `;

            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error carregant les dades:", error);
    });
