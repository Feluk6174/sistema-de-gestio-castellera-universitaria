import csv
import json
import numpy

def csv_to_matrix(file:str) -> list[list[str]]:
    with open(file, 'r') as csvfile:
        reader = csv.reader(csvfile)
        matrix = [row for row in reader]
    return matrix

def transpose(matrix:list[list[str]]) -> list[list[str]]:
    a_np = numpy.array(matrix) # converting `a` to numpyarray
    res_np = a_np.T
    return res_np.tolist()

def load_puntuacions() -> dict[str, str]:
    puntuacions = {}

    with open("../data/puntuacions.json", "r") as f:
        taula = json.load(f)

    for i in range(9):
        castells = taula[str(i)]
        for castell, punts in castells.items():
            puntuacions[castell] = punts[1]
            puntuacions[castell+"C"] = punts[0]
    
    return puntuacions


def get_puntuacio(puntuacions:dict[str], castell:str) -> int: 
    if castell not in puntuacions.keys():
        return 0

    return puntuacions[castell]