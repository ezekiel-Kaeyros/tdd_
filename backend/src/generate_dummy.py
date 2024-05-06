"""Module providing a function printing python version."""
import os
from datetime import datetime
import configparser
import yaml
import pandas as pd
from src.create_dumy.full_model import create_full_model
from src.cases.casesone import create_case_one
from src.cases.casestwo import create_case_two
from src.cases.casesthree import build_all_data_df
from src.cases.casesfive import create_case_five
from src.cases.casesfour import create_case_four
from src.cases.casesix import create_case_six
from src.filter_data import filter_case_one
from src.filter_data import filter_case_two
from src.filter_data import filter_case_three
from src.filter_data import filter_case_four
from src.filter_data import filter_case_five, filter_case_6
from src.utils import get_path_to_yaml

import time
# load config file


def load_config_file(email, abreviation_name):
    """Function to load config file."""
    # path = os.path.abspath("input/config_files/config.yaml")
    path = get_path_to_yaml(email, abreviation_name)
    with open(path, "r", encoding="utf-8") as stream:
        try:
            return yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)
    return None


class CreateDummy:  # pylint: disable=too-many-instance-attributes
    """Class to create dummy."""

    def __init__(
        self,
        wv_file,
        path_csv,
        socketio,
        socketid,
        encodage,
        user_email,
        path_to_yaml,
        abreviation_name,
        tso,
    ):  # pylint: disable=too-many-arguments
        self.actions = []
        self.mrid = {}
        self.config_yaml = load_config_file(user_email, abreviation_name)
        self.path_csv = path_csv
        self.abreviation_name = abreviation_name
        self.client, self.client_name = self.get_client_name()
        self.socketio = socketio
        self.socketid = socketid
        self.encodage = encodage
        self.user_email = user_email
        self.path_to_yaml = path_to_yaml
        self.tso = (tso,)
        self.wv_file = wv_file

        self.min_date_list = []
        self.max_date_list = []
        for index, row in self.wv_file.iterrows():
            self.min_date_list.append(
                str(row["tm_von"]) + " " + str(row["zeit_von"]) + ":00"
            )

            self.max_date_list.append(
                str(row["tm_bis"]) + " " + str(row["zeit_bis"]) + ":00"
            )

        if len(self.wv_file) == 0:
            msg = f"No data in this file for Tso {self.client_name}"
            socketio.emit("except-file" + self.user_email, [msg])
        else:
            # total_progress = len(self.wv_file) / 15
            total_progress = 7
            socketio.emit("star-progress" + self.user_email, total_progress)

            # self.create_dummy()

    def get_client_name(self):
        """get client name from yaml file."""
        client = os.path.basename(self.path_csv).split(".")[0]
        client = client.split("_")[1]
        client_name = self.config_yaml["clients"][client]
        return client, client_name

    def create_dummy(
        self, tso, abreviation_aame
    ):  # pylint: disable=too-many-locals, too-many-branches, too-many-statements
        """function to create dummy."""
        try:
            # create FullModel dataframe

            self.socketio.emit(
                "display-step" + self.user_email, "Create full model")
            full_model = create_full_model(
                self.path_csv,
                self.config_yaml,
                self.client,
                self.max_date_list,
                self.min_date_list,
            )

            self.actions.append(full_model)
            reste = []

            # build case six
            data_case_6, reste = filter_case_6(self.wv_file)
            if len(data_case_6) > 0:
                case6 = create_case_six(
                    data_case_6,
                    self.config_yaml,
                    # self.client,
                    self.config_yaml["tso"][self.client],
                    self.socketio,
                    self.user_email,
                )

                self.socketio.emit("update-progress" +
                                   self.user_email, "Case 6")
                if len(case6) > 0:
                    self.actions.append(case6)

            # build case four
            # first of all filter data frame
            if len(reste) > 0:
                data_case_4, reste = filter_case_four(self.wv_file)

                if len(data_case_4) > 0:
                    self.socketio.emit("update-progress" +
                                       self.user_email, "Case 4")
                    case4 = create_case_four(
                        data_case_4,
                        self.config_yaml,
                        self.config_yaml["tso"][self.client],
                        self.socketio,
                    )

                    # self.socketio.emit("update-progress" +
                    #                    self.user_email, "Case 4")
                    if len(case4) > 0:
                        self.actions.append(case4)
                    # build case two
                    # first of all filter data frame
            if len(reste) > 0:
                print(len(reste))
                data_case_2, reste = filter_case_two(reste)

                if len(data_case_2) > 0:
                    self.socketio.emit("update-progress" +
                                       self.user_email, "Case 2")
                    case2 = create_case_two(
                        data_case_2,
                        self.config_yaml,
                        self.config_yaml["tso"][self.client],
                    )

                    if len(case2) > 0:
                        self.actions.append(case2)
                        print("case two")
                    else:
                        print("len(case2)")

            # build case five
            # first of all filter data frame

            if len(reste) > 0:
                data_case_5, reste = filter_case_five(reste)
                if len(data_case_5) > 0:
                    self.socketio.emit("update-progress" +
                                       self.user_email, "Case 5")
                    case5 = create_case_five(
                        data_case_5,
                        self.config_yaml,
                        self.config_yaml["tso"][self.client],
                        self.socketio,
                    )
                    if len(case5) > 0:
                        self.actions.append(case5)
                        print("case 5")
                else:
                    print("value")
            if len(reste) > 0:
                self.socketio.emit(
                    "display-step" + self.user_email, "filter Case 3")
                data_case_3, reste = filter_case_three(reste)
                if len(data_case_3) > 0:
                    # print('case 3 here ====>')
                    # time.sleep(2000)

                    self.socketio.emit("update-progress" +
                                       self.user_email, "Case 3")
                    case3 = build_all_data_df(
                        data_case_3,
                        self.config_yaml,
                        self.config_yaml["tso"][self.client],
                        self.socketio,
                        self.user_email,
                    )
                    if len(case3) > 0:
                        self.actions.append(case3)
                        print("case 3")
                    else:
                        print("no data case 3")
                else:
                    print("not found data case 3")

            # build case one
            # first of all filter data frame

            if len(reste) > 0:
                data_case_1, reste = filter_case_one(reste)
                if len(data_case_1) > 0:

                    self.socketio.emit("update-progress" +
                                       self.user_email, "Case 1")
                    case1 = create_case_one(
                        data_case_1,
                        self.config_yaml,
                        self.config_yaml["tso"][self.client]
                    )
                    if len(case1) > 0:
                        self.actions.append(case1)
                        # print(f" case1")
                    else:
                        print("no data case 1")
                else:
                    print("no data found")

            dumy_df = pd.concat(self.actions, axis=0)

            self.socketio.emit(
                "update-progress" + self.user_email, "Generate dummy excel"
            )

            # create ouput folder if not exist
            file_path = "./output"
            if os.path.exists(file_path):
                pass
            else:
                os.makedirs(file_path)

            # generate dummy excel
            relative_path_excel_file = (
                "output/Dummy_Export_Tabelle"
                + datetime.today().strftime("%Y-%m-%d_%H%M%S")
                + ".xlsx"
            )

            writer = pd.ExcelWriter(
                relative_path_excel_file, engine="openpyxl")

            dumy_df.to_excel(writer, index=False)

            writer.save()
            # get path excel file
            absolut_path_excel_file = os.path.join(relative_path_excel_file)

            # get elements from config ini
            config = configparser.ConfigParser()
            config.read("./docs/config.ini")

            # set path excel file in config ini
            config["INPUT"]["INPUTPATH"] = absolut_path_excel_file
            config["OUTPUT"]["outputpath"] = os.path.abspath("output") + "/"
            if abreviation_aame:
                TSO_Name = abreviation_aame
            else:
                TSO_Name = tso
            outp = str(TSO_Name) + "outputpath"
            config["OUTPUT"][outp] = os.path.abspath("output") + "/"

            csv_fine_name = self.path_csv.split("\\")[-1]
            csv_fine_name = csv_fine_name.replace("WV_", "")
            csv_fine_name = csv_fine_name.replace(".csv", "")
            config["OUTPUT"]["outputfilename01"] = csv_fine_name + ".xml"
            config["OUTPUT"][str(TSO_Name)] = csv_fine_name + ".xml"
            # update config ini

            with open("./docs/config.ini", "w", encoding="utf-8") as configfile:
                config.write(configfile)
                # print(config["INPUT"]["INPUTPATH"])

        except ValueError as error:
            print("---------------------")
            print(error)
            # print('exist =====>')
            # time.sleep(2000)
            return error
            # self.socketio.emit("except-progress" + self.user_email, 1)
