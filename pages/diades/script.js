fetch("/data/diades-25-26.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("diades-container");

        Object.entries(data).forEach(([nomDiada, colles]) => {
            const diadaDiv = document.createElement("div");
            diadaDiv.classList.add("diada");

            diadaDiv.innerHTML = `<h2>${nomDiada}</h2>`;
            const dateDiv = document.createElement("div");
            dateDiv.innerHTML = `<p class="diada-date colla">${colles["Data"]}</p>`;
            diadaDiv.appendChild(dateDiv);

            const castellsDiv = document.createElement("div");
            castellsDiv.classList.add("colla");
            castellsDivHTML = '<h3> Castells </h3><table class="table-castells">';

            const puntsDiv = document.createElement("div");
            puntsDiv.classList.add("colla");

            const animacioDiv = document.createElement("div");
            animacioDiv.classList.add("colla");

            Object.entries(colles).forEach(([nomColumna, columna]) => {
                console.log(nomColumna)
                if (nomColumna === "Data") {return}
                if (nomColumna === "Animacio") {
                    const posicions = columna
                        .map((colla, index) => colla !== "" ? `
                            <tr class="tr-castells">
                                <td class="td-castells" style="background-color:${color_posicio(index, columna.length)};">
                                    ${index+1}
                                </td>
                                <td class="td-castells" style="background-color:${colors_colles[colla]};">
                                    ${colla}
                                </td>
                            </tr>` : "")
                        .join("\n");
                    animacioDiv.innerHTML = `
                        <h3>Posició Animació</h3>
                        <table>
                            <tr class="tr-castells">
                                <td class="td-castells td-title">
                                    Posicio
                                </td>
                                <td class="td-castells td-title">
                                    Colla
                                </td>
                            </tr>
                            ${posicions}
                        </table>
                        `
                    return
                }
                if (nomColumna === "PuntuacionsAnimacio") {
                    const punts = Object.entries(columna)
                        .map(([nom, punts]) => punts !== "" ? `
                            <tr class="tr-castells">
                                <td class="td-castells">
                                    ${nom}
                                </td>
                                <td class="td-castells">
                                    ${punts}
                                </td>
                            </tr>` : `
                            <tr class="tr-castells">
                                <td class="td-castells">
                                    ${nom}
                                </td>
                                <td class="td-castells td-buit"">
                                    buit
                                </td>
                            </tr>`)
                        .join("\n");
                    console.log(punts);
                    puntsDiv.innerHTML = `
                        <h3>Puntuació Animacions</h3>
                        <table>
                            <tr class="tr-castells">
                                <td class="td-castells td-title">
                                    Komando
                                </td>
                                <td class="td-castells td-title">
                                    Puntuacio
                                </td>
                            </tr>
                            ${punts}
                        </table>
                        `
                    return
                }

                let construccionsHTML = "";
                if (nomColumna !== "Colles") {
                    construccionsHTML = columna.length
                        ? `${columna.map(c => c !== "" ? `<td class="td-castells">${c}</td>` : `<td class="td-castells td-buit" color="${gris_fons_taules}">buit</td>`).join("")}`
                        : "";
                }
                else {
                    construccionsHTML = columna.length
                    ? `${columna.map(c => c !== "" ? `<td class="td-castells" style="background-color:${colors_colles[c]};">${c}</td>` : `<td class="td-castells td-buit" color="${gris_fons_taules}">buit</td>`).join("")}`
                    : "";
                }

                castellsDivHTML += `
                    <tr class="tr-castells">
                        <td class="td-castells td-title">${nomColumna}</td>
                        ${construccionsHTML}
                    </tr>
                `;

            });
            castellsDivHTML += "</table>"
            castellsDiv.innerHTML = castellsDivHTML
            diadaDiv.appendChild(castellsDiv);
            diadaDiv.appendChild(animacioDiv);
            diadaDiv.appendChild(puntsDiv);


            container.appendChild(diadaDiv);
        });
    })
    .catch(error => {
        console.error("Error carregant les diades:", error);
    });
