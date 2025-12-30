import csv
import json
import os

import numpy

from config import *

def csv_to_matrix(file:str) -> list[list[str]]:
    with open(file, 'r') as csvfile:
        reader = csv.reader(csvfile)
        matrix = [row for row in reader]
    return matrix

def transpose(matrix:list[list[str]]) -> list[list[str]]:
    a_np = numpy.array(matrix) # converting `a` to numpyarray
    res_np = a_np.T
    return res_np.tolist()

def parse(file:str) -> tuple[str, dict[str]]:
    res = {}

    dades = transpose(csv_to_matrix(file))
    #print(dades)

    res["Data"] = res["Data"] = dades[17][1]
    nom = dades[15][1]

    res["Colles"] = dades[0][1:]
    if any(dades[4][1:]):
        res["Entrada"] = dades[4][1:]

    for i in range(5, 11):
        if any(dades[i][1:]):
            res[f"Ronda {i-4}"] = dades[i][1:]

    if any(dades[11][1:]):
        res["Pilar"] = dades[11][1:]
    if any(dades[12][1:]):
        res["Sortida"] = dades[12][1:]
    if any(dades[1][1:]):
        res["Animacio"] = transpose(sorted(transpose(dades)[1:], key=lambda x: x[1], reverse=False))[0]
    if any(dades[3][1:]):
        res["PuntuacionsAnimacio"] = {dades[2][i]:float(dades[3][i].replace(",", ".")) for i in range(1,len(dades[0])) if not dades[2][i] == "Cap"}
        res["PuntuacionsAnimacio"]["Mitja"] = round(sum(res["PuntuacionsAnimacio"].values())/len(res["PuntuacionsAnimacio"]), ndigits=2)

    return nom, res


def main():
    diades = {}
    
    for file in reversed(sorted(os.listdir(os.fsencode("diades")))):
        filename = f"diades/{os.fsdecode(file)}"
        print(filename)
        nom, info = parse(filename)
        diades[nom] = info

    with open(f"diades-{TEMPORADA}.json", "w") as f:
        json.dump(diades, f)

    
if __name__ == "__main__":
    main()