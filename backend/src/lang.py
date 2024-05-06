"""Module providing a function."""
import os
import pandas as pd
from deep_translator import GoogleTranslator
import yaml

pd.set_option("display.max_columns", None)
pd.set_option("display.max_rows", None)


def translate_colums(path, econdage, lng):  # pylint: disable=too-many-locals
    """Function to translate column name."""
    file_path = "./translate"
    if os.path.exists(file_path):
        pass
    else:
        os.makedirs(file_path)
    yaml_file = f"{file_path}/{lng}.yaml"
    check_file = os.path.isfile(yaml_file)
    print(check_file)
    if check_file:
        try:
            with open(yaml_file, "r", encoding="utf-8") as stream:
                try:
                    yamlfile = yaml.safe_load(stream)
                #    print(yamlfile)
                except yaml.YAMLError as exc:
                    print(exc)
                # pass
        except NameError as error:
            print(error)

    try:
        wv_file = pd.read_csv(
            path,
            encoding=econdage,
            on_bad_lines="skip",
            sep=";",
            skiprows=1,
            low_memory=False,
        )
        cols = wv_file.columns
        obj_dict = {}
        for item in cols:
            if check_file:
                column_name = yamlfile[item]
                wv_file = wv_file.rename({item: column_name})
            else:
                translated = GoogleTranslator(source="auto", target="de").translate(
                    item
                )
                obj_dict[item] = translated
        # path = f"{file_path}/{lng}.yaml"
        if len(obj_dict):
            try:
                with open(yaml_file, "w", encoding="utf-8") as new_yaml_file:
                    yaml.dump(obj_dict, new_yaml_file)
                translate_colums(path, econdage, lng="de")
            except NameError as error:
                print(error)
        # time.sleep(2000)
        return wv_file

    except ValueError as error:  # pylint: disable=broad-except
        print(error)
        return None
