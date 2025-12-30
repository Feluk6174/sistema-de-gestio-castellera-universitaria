console.log(colors_colles)
fetch("/data/puntuacions.json")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i <= 8; i++) {
            const tbody = document.querySelector(`#ranking-table-${i} tbody`);
            let grup = `${i}`
            document.getElementById(`th-titile-${i}`).style = `background-color: ${colors_grups[grup]["bg"]}; color: ${colors_grups[grup]["txt"]}`

            for (const [nom, punts] of Object.entries(data[grup])) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td bgcolor=${gris_fons_taules}>${nom}</td>
                    <td style="background-color:${colors_grups["C"]["bg"]}; color: ${colors_grups["C"]["txt"]}">${punts[0]}</td>
                    <td style="background-color:${blau_generic}">${punts[1]}</td>
                `;

                tbody.appendChild(row);
            }
        }
    })
    .catch(error => {
        console.error("Error carregant les dades:", error);
    });