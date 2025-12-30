fetch("/data/ranking-25-26.json")
    .then(response => response.json())
    .then(data => {

        const tbody = document.querySelector("#ranking-table tbody");

        data["OrdreCastells"].forEach((nom, index) => {
            const row = document.createElement("tr");

            colla = data[nom]
            console.log(colors_colles[nom])
            row.innerHTML = `
                <td>${index + 1}</td>
                <td style="background-color:${colors_colles[nom]}">${nom}</td>
                <td style="background-color:${colors_grups[grups_castells[colla.millorsCastells[0]]]["bg"]}; color:${colors_grups[grups_castells[colla.millorsCastells[0]]]["txt"]}">${colla.millorsCastells[0]}</td>
                <td style="background-color:${colors_grups[grups_castells[colla.millorsCastells[1]]]["bg"]}; color:${colors_grups[grups_castells[colla.millorsCastells[1]]]["txt"]}">${colla.millorsCastells[1]}</td>
                <td style="background-color:${colors_grups[grups_castells[colla.millorsCastells[2]]]["bg"]}; color:${colors_grups[grups_castells[colla.millorsCastells[2]]]["txt"]}">${colla.millorsCastells[2]}</td>
                <td style="background-color:${colors_grups[grups_castells[colla.millorPilar]]["bg"]}; color:${colors_grups[grups_castells[colla.millorPilar]]["txt"]}">${colla.millorPilar}</td>
            `;

            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error carregant les dades:", error);
    });
