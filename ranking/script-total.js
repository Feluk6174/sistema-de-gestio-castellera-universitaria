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
                <td bgcolor=${gris_fons_taules}>${index + 1}</td>
                <td bgcolor=${colors_colles[nom]}>${nom}</td>
                <td style="background-color:${colors_grups[grups_castells[colla.millorsCastells[0]]]["bg"]}; color:${colors_grups[grups_castells[colla.millorsCastells[0]]]["txt"]}">${colla.millorsCastells[0]}</td>
                <td style="background-color:${colors_grups[grups_castells[colla.millorsCastells[1]]]["bg"]}; color:${colors_grups[grups_castells[colla.millorsCastells[1]]]["txt"]}">${colla.millorsCastells[1]}</td>
                <td style="background-color:${colors_grups[grups_castells[colla.millorsCastells[2]]]["bg"]}; color:${colors_grups[grups_castells[colla.millorsCastells[2]]]["txt"]}">${colla.millorsCastells[2]}</td>
                <td style="background-color:${colors_grups[grups_castells[colla.millorPilar]]["bg"]}; color:${colors_grups[grups_castells[colla.millorPilar]]["txt"]}">${colla.millorPilar}</td>
                <td bgcolor=${gris_fons_taules}>${animacions}</td>
                <td bgcolor=${color_posicio(colla.posicioMitjaAnim, 5)}>${colla.posicioMitjaAnim}</td>
                <td bgcolor=${color_puntuacio(colla.puntuacioAnimacio)}>${colla.puntuacioAnimacio}</td>
            `;

            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error carregant les dades:", error);
    });
