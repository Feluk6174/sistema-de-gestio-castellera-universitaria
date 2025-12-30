import csv
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