from util import *

def parse(file):
    pass

def main():
    castells = {}
    
    for file in reversed(sorted(os.listdir(os.fsencode("diades")))):
        filename = f"diades/{os.fsdecode(file)}"
        print(filename)
        nom, info = parse(filename)
        diades[nom] = info

    with open(f"diades-{TEMPORADA}.json", "w") as f:
        json.dump(diades, f)

    
if __name__ == "__main__":
    main()