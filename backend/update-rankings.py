import json
import os
from util import *
from config import *

def parse_ronda(ronda:str) -> list[tuple[str, int]]:
    construccions = ronda.split("+")
    temp = []
    for castell in construccions:
        if castell[1:3] == "Pd" and not castell[0] == "i": 
            temp.append((castell[1:], int(castell[0])))
        else:
            temp.append((castell, 1))
    return temp

def parse_castells_from_file(file:str) -> dict[str]:
    parsed_data = {}
    data = csv_to_matrix(file)
    for i in range(1, len(data)):
        parsed_data[data[i][0]] = {}
    for row in data[1:]:
        for i in range(4, 13):
            if row[i] == "": continue
            for castell, num in parse_ronda(row[i]):
                try:
                    parsed_data[row[0]][castell] += num
                except KeyError:
                    parsed_data[row[0]][castell] = num
    
    return parsed_data

def merge(original: dict[str], new:dict[str]):
    merged = {
        "Ganàpies": {},
        "Marracos": {},
        "Arreplegats": {},
        "Pataquers": {},
        "Bergants": {},
        "Xoriguers": {},
        "Trempats": {},
        "Emboirats": {},
        "Engrescats": {},
        "Penjats": {},
        "Descargolats": {},
        "Llunàtics": {},
        "Passerells": {},
        "Grillats": {},
        "Gambirots": {}
    }
    
    for colla, castells in original.items():
        for castell in castells.keys():
            if not colla in new.keys():
                merged[colla][castell] = original[colla][castell]
            elif not castell in new[colla].keys():
                merged[colla][castell] = original[colla][castell]
            else:
                merged[colla][castell] = original[colla][castell] + new[colla][castell]
    
    for colla, castells in new.items():
        for castell in castells.keys():
            if not castell in original[colla].keys():
                merged[colla][castell] = new[colla][castell]
    
    return merged


def parse_castells():
    castells = {
        "Ganàpies": {},
        "Marracos": {},
        "Arreplegats": {},
        "Pataquers": {},
        "Bergants": {},
        "Xoriguers": {},
        "Trempats": {},
        "Emboirats": {},
        "Engrescats": {},
        "Penjats": {},
        "Descargolats": {},
        "Llunàtics": {},
        "Passerells": {},
        "Grillats": {},
        "Gambirots": {}
    }
    
    for file in reversed(sorted(os.listdir(os.fsencode("diades")))):
        filename = f"diades/{os.fsdecode(file)}"
        print(filename)
        castells_diada = parse_castells_from_file(filename)
        castells = merge(castells, castells_diada)

    return castells


def parse_animacions_from_file(file:str):
    puntuacio = {}
    posicio_norm = {}
    posicio = {}
    data = transpose(csv_to_matrix(file))

    anfitrio = data[19][1]

    if not any(data[1][1:]): return anfitrio, {}, {}, {}


    for i, colla in enumerate(data[0][1:]):
        posicio_norm[colla] = (len(data[1][1:]) - int(data[1][i+1]))/(len(data[1][1:])-1)
        posicio[colla] = data[1][i+1]

    

    puntuacio[anfitrio] = round(sum(map(lambda x: float(x.replace(",", ".")), filter(lambda x: not x == "", data[3][1:]))), ndigits=2)/len(list(filter(lambda x: not x == "", data[3][1:])))

    return anfitrio, posicio_norm, posicio, puntuacio



def parse_animacions():
    dades = {
        "Ganàpies": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Marracos": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Arreplegats": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Pataquers": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Bergants": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Xoriguers": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Trempats": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Emboirats": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Engrescats": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Penjats": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Descargolats": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Llunàtics": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Passerells": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Grillats": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        },
        "Gambirots": {
            "Puntuacio": [],
            "PosicioNorm": [],
            "PosicionsNom": {},
            "Posicio": []
        }
    }
    
    for file in reversed(sorted(os.listdir(os.fsencode("diades")))):
        filename = f"diades/{os.fsdecode(file)}"
        print(filename)
        anfitrio, posicio_norm, posicio, puntuacio = parse_animacions_from_file(filename)
        if puntuacio == {}: continue
        dades[list(puntuacio.keys())[0]]["Puntuacio"].append(list(puntuacio.values())[0])

        for colla, p in posicio.items():
            dades[colla]["Posicio"].append(p)
            dades[colla]["PosicionsNom"][anfitrio] = p
        for colla, p in posicio_norm.items():
            dades[colla]["PosicioNorm"].append(p)
        
    return dades


def ordres(dades:dict[str]):
    print(list(map(lambda x: dades[x]["totalAnimacio"], dades.keys())))
    ordre_castells = sorted(dades.keys(), key=lambda x: dades[x]["puntsCastells"] if not dades[x]["puntsCastells"] == "NaN" else 0, reverse=True)
    ordre_animacions = sorted(dades.keys(), key=lambda x: dades[x]["totalAnimacio"] if not dades[x]["totalAnimacio"] == "NaN" else 0, reverse=True)
    ordre_total = sorted(dades.keys(), key=lambda x: dades[x]["puntuacioFinal"], reverse=True)

    dades["Ordre"] = ordre_total
    dades["OrdreCastells"] = ordre_castells
    dades["OrdreAnimacions"] = ordre_animacions

    print(ordre_castells, ordre_animacions, ordre_total)

    return dades

def build_data(castells_dict: dict[str], animacions_dict: dict[str]):
    rankings = {}
    puntuacions = load_puntuacions()
    for colla, castells in castells_dict.items():
        rankings[colla] = {}
        pilars = list(filter(lambda x: "Pd" in x, castells.keys()))
        construccions = list(filter(lambda x: "Pd" not in x, castells.keys()))

        print(colla, pilars, construccions)

        rankings[colla]["millorsCastells"] = sorted(construccions, key=lambda x: get_puntuacio(puntuacions, x), reverse=True)[:3]
        rankings[colla]["millorPilar"] = max(pilars, key=lambda x: get_puntuacio(puntuacions, x))
        rankings[colla]["puntsCastells"] = sum(map(lambda x: get_puntuacio(puntuacions, x), rankings[colla]["millorsCastells"])) + get_puntuacio(puntuacions, rankings[colla]["millorPilar"])

    for colla, info in animacions_dict.items():
        if not len(info["Puntuacio"]) == 0:
            rankings[colla]["puntuacioAnimacio"] = sum(info["Puntuacio"]) / len(info["Puntuacio"])
        else:
            rankings[colla]["puntuacioAnimacio"] = "NaN"

        if not len(info["Posicio"]) == 0:
            rankings[colla]["posicioMitjaAnim"] = round(sum(map(lambda x: int(x), info["Posicio"]))/len(info["Posicio"]), ndigits=2)
            rankings[colla]["posicioMitjaAnimNorm"] = round(sum(map(lambda x: int(x), info["PosicioNorm"]))/len(info["Posicio"])*10, ndigits=2)
            rankings[colla]["animacions"] = info["PosicionsNom"]
            rankings[colla]["totalAnimacio"] = (rankings[colla]["posicioMitjaAnimNorm"]+rankings[colla]["puntuacioAnimacio"])/2
        else:
            rankings[colla]["posicioMitjaAnim"] = "NaN"
            rankings[colla]["posicioMitjaAnimNorm"] = "NaN"
            rankings[colla]["animacions"] = {}
            rankings[colla]["totalAnimacio"] = "NaN"


        max_pts_castells = max(map(lambda x: rankings[x]["puntsCastells"], rankings.keys()))
        castells_norm = rankings[colla]["puntuacioAnimacio"]/max_pts_castells*10 if not rankings[colla]["puntuacioAnimacio"] == "NaN" else 0
        print(colla, rankings[colla]["totalAnimacio"])
        anim = rankings[colla]["totalAnimacio"] if not rankings[colla]["totalAnimacio"] == "NaN" else 0
        print(colla, anim)

        rankings[colla]["puntuacioFinal"] = round((anim+castells_norm)/2, ndigits=10)

    rankings = ordres(rankings)
    return rankings


def main():
    castells = parse_castells()
    animacions = parse_animacions()
    rankings = build_data(castells, animacions)
    with open("ranking-25-26.json", "w") as f:
        json.dump(rankings, f)


if __name__ == "__main__":
    main()