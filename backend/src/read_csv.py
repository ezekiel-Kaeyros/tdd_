"""Module providing a function."""
import pandas as pd
from skimpy import clean_columns
import time
pd.set_option("display.max_columns", None)
pd.set_option("display.max_rows", None)


def clean_columns_name(wv_file):
    """Function to clean name."""
    columns = wv_file.columns
    messy_df = pd.DataFrame(data=[], columns=columns, index=[0])
    clean_df = clean_columns(messy_df)
    wv_file.rename(columns=dict(zip(columns, clean_df)), inplace=True)
    return wv_file


def rename_column(min_index, max_index, file, str_prefix_col):
    """Function to rename column."""
    cols = file.columns[min_index:max_index]
    # cols
    cols_number = []
    for item in cols:
        cols_number.append(item.split(".", 1)[0])

    file = file.rename(
        dict(zip(file.columns[min_index:max_index], cols_number)), axis=1
    )
    cols_b = file.columns[min_index:max_index]
    file.rename(columns=dict(
        zip(cols_b, str_prefix_col + cols_b)), inplace=True)
    return file


def renam_column_name_one(wv_file):
    """Function to rename column."""
    print(".... renam_column_name_one ....")
    cols = wv_file.columns[17:117]
    wv_file.rename(columns=dict(
        zip(cols, "Art der Anweisung_" + cols)), inplace=True)
    return wv_file


def filter_file(wv_file, client_name):
    """Function to filter file."""
    arr = []
    wv_file = wv_file.loc[wv_file["ursache"] == "I"]
    wv_file = wv_file.fillna(0)
    wv_file = wv_file.loc[wv_file["zustandiger_ras_unb"] == client_name]
    if len(wv_file) == 0 and len(wv_file.loc[wv_file["zustandiger_ras_unb"] == client_name]) == 0:
        arr.append(
            f"Not found value {client_name} in zustandiger_ras_unb column")
    return wv_file, arr


def readCsv(
    path, client_name, socketio, econdage, user_email, tso
):  # pylint: disable=invalid-name,too-many-arguments
    """Function to read csv."""

    try:

        wv_file1 = pd.read_csv(
            path,
            # header= 0,
            encoding=econdage,
            on_bad_lines="skip",
            # sep=";",
            skiprows=1,
        )
        cols1 = wv_file1.columns[17:117]
        socketio.emit("display-step" + user_email, "verify variable")
        wv_file1.rename(
            columns=dict(zip(cols1, "Art der Anweisung_" + cols1)), inplace=True
        )
        wv_file1 = rename_column(135, 235, wv_file1, "Leistung_")
        wv_file1 = rename_column(
            236, 336, wv_file1, "variable_Erzeugungsauslagen_")
        wv_file1 = rename_column(339, 439, wv_file1, "Sonstige_Kosten_")
        wv_file1 = rename_column(
            441, 541, wv_file1, "Anteiliger_Werteverbrauch_")
        wv_file1 = rename_column(542, 642, wv_file1, "Entgangene_Intraday_")
        wv_file1 = clean_columns_name(wv_file1)
        wv_file1.drop(wv_file1.columns[644:830], axis=1, inplace=True)

        socketio.emit("display-step" + user_email, "Filter File")
        wv_file, arr = filter_file(wv_file1, tso)
        return wv_file
    except ValueError as error:  # pylint: disable=broad-except
        print(error)
        socketio.emit("except-progress" + user_email, 1)
        return None


def strip_colonnes(liste_colonnes):
    """ retire les espaces inutiles sur les noms de colonne"""
    colonnes = [col.strip() for col in liste_colonnes if len(col) > 0]
    return colonnes


def verify_variable_dataframe(wv_file_path, encodage, socketio, user_email, tso):
    """Function to verify dataframe variable"""

    try:

        wv_file1 = pd.read_csv(
            wv_file_path,
            encoding=encodage,
            sep=";",
            skiprows=1,
            on_bad_lines="skip",
            low_memory=False
        )

        # -----------------
        path_csv_example = r"input/WV_AMP_2022_12_202301161652.csv"
        wv_file_example = pd.read_csv(
            path_csv_example,
            encoding="unicode_escape",
            sep=";",
            skiprows=1,
            on_bad_lines="skip"
        )

        # A ce stade, on verifier si les colonnes excedentaires
        # font partie des nouvelles colonnes template..
        col_exceed = wv_file1.columns.difference(wv_file_example.columns)

        col_exceed = strip_colonnes(col_exceed.to_list())

        # lire les colonnes du nouveau fichier modele..
        path_new_colonnes = r'input/WV_AMP_2024_01_202404181542.csv'
        new_sample_columns = pd.read_csv(
            path_new_colonnes,
            encoding="unicode_escape",
            sep=";",
            skiprows=1,
            on_bad_lines="skip",
            low_memory=False
        ).columns.to_list()

        # -----------------

        if 'TM von' in wv_file1.columns:

            for index, row in wv_file1.iterrows():
                input = row["TM von"].split(" ")
                if len(input) > 1:
                    wv_file1.at[index, "TM von"] = input[0].replace("-", ".")
        if len(wv_file1.columns) == 1:
            wv_file1 = pd.read_csv(
                wv_file_path,
                encoding=encodage,
                on_bad_lines="skip",
                skiprows=1,
            )

        cols1 = wv_file1.columns[17:117]
        socketio.emit("display-step" + user_email, "verify variable")

        wv_file1.rename(
            columns=dict(zip(cols1, "Art der Anweisung_" + cols1)), inplace=True
        )

        wv_file1 = rename_column(135, 235, wv_file1, "Leistung_")

        wv_file1 = rename_column(
            236, 336, wv_file1, "variable_Erzeugungsauslagen_")

        wv_file1 = rename_column(339, 439, wv_file1, "Sonstige_Kosten_")

        wv_file1 = rename_column(
            441, 541, wv_file1, "Anteiliger_Werteverbrauch_")

        wv_file1 = rename_column(542, 642, wv_file1, "Entgangene_Intraday_")

        wv_file1 = clean_columns_name(wv_file1)

        wv_file1.drop(wv_file1.columns[644:830], axis=1, inplace=True)

        # time.sleep(200)

        path_csv_example = r"input/WV_AMP_2022_12_202301161652.csv"
        wv_file_example = pd.read_csv(
            path_csv_example,
            encoding="unicode_escape",

            # header= 0,
            # on_bad_lines="skip",
            sep=";",
            skiprows=1,
            on_bad_lines="skip",
            # low_memory=False,
        )
        cols2 = wv_file_example.columns[17:117]
        wv_file_example.rename(
            columns=dict(zip(cols2, "Art der Anweisung_" + cols2)), inplace=True
        )

        wv_file_example = rename_column(135, 235, wv_file_example, "Leistung_")
        wv_file_example = rename_column(
            236, 336, wv_file_example, "variable_Erzeugungsauslagen_"
        )
        wv_file_example = rename_column(
            339, 439, wv_file_example, "Sonstige_Kosten_")
        wv_file_example = rename_column(
            441, 541, wv_file_example, "Anteiliger_Werteverbrauch_"
        )
        wv_file_example = rename_column(
            542, 642, wv_file_example, "Entgangene_Intraday_")
        wv_file_example = clean_columns_name(wv_file_example)
        dif = wv_file_example.columns.difference(wv_file1.columns)

        wv_file, arr = filter_file(wv_file1, tso)

        if len(dif) == 0:
            # wv_file, arr = filter_file(wv_file1, tso)
            return True, dif, wv_file, arr

        elif set(col_exceed).issubset(new_sample_columns):
            # les colonnes excedentaires sont celles du nouveau format..
            return True, [], wv_file, []
        col_list = []
        for col in wv_file_example.columns:
            if col not in wv_file1.columns:
                col_list.append(col)
        if len(col_list) > 0:
            return False, dif, wv_file, col_list

        return False, dif, wv_file, []

    except Exception as error:  # pylint: disable=broad-except
        print(error)
