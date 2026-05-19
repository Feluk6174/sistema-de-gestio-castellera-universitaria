#!/usr/bin/env python3

import argparse
import csv
import json
from pathlib import Path


def parse_csv(input_path: Path) -> dict:
    with input_path.open("r", encoding="utf-8", newline="") as file:
        rows = list(csv.reader(file))

    if len(rows) < 2:
        raise ValueError("El CSV ha de tenir almenys capcalera i fila de dates")

    header = rows[0]
    dates_row = rows[1]

    if len(header) % 2 != 0 or len(dates_row) != len(header):
        raise ValueError("Format de CSV invalid: s'esperen columnes en parelles")

    result = {}
    event_count = len(header) // 2

    for event_idx in range(event_count):
        colla_col = event_idx * 2
        pos_col = colla_col + 1

        host = header[colla_col].strip()
        date_value = dates_row[pos_col].strip()

        if not host:
            continue

        ranking = {}
        for row in rows[2:]:
            if len(row) <= pos_col:
                continue

            colla_name = row[colla_col].strip()
            pos_raw = row[pos_col].strip()

            if not colla_name or not pos_raw:
                continue

            try:
                ranking[colla_name] = int(pos_raw)
            except ValueError as exc:
                raise ValueError(
                    f"Posicio invalida per '{colla_name}' a l'amfitrio '{host}': {pos_raw}"
                ) from exc

        result[host] = {
            "Data": date_value,
            "Ranking": ranking,
        }

    return result


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Converteix backend/data/primavera-2026.csv a data/primavera-2026.json"
    )
    parser.add_argument(
        "--input",
        default="backend/data/primavera-2026.csv",
        help="Ruta del CSV d'entrada",
    )
    parser.add_argument(
        "--output",
        default="data/primavera-2026.json",
        help="Ruta del JSON de sortida",
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    data = parse_csv(input_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)
        file.write("\n")

    print(f"JSON generat a {output_path}")


if __name__ == "__main__":
    main()
