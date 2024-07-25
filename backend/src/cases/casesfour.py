"""Module providing a function printing python version."""
import pandas as pd
from src.create_dumy.remedial_action_schedule_case4 import (
    create_remedial_action_schedule,
)
from src.create_dumy.remedial_action_cost import create_remedial_action_cost
from src.create_dumy.redispatch_schedule_action import create_redispatch_schedule_action
from src.create_dumy.power_schedule import create_power_schedule
from src.create_dumy.power_time_point import create_power_time_point

import time
import sys
import traceback


def create_case_four(
    wv_file, config_yaml, client, socketio, client_zone
):  # pylint: disable=too-many-locals
    """Function to create case four."""
    # wv_file = wv_file.loc[wv_file['auslosender_prozess'] == "Intraday"]

    wv_file_date = wv_file
    array_action_ora = []

    for idx, row in wv_file_date.iterrows():
        power_schedule = create_power_schedule(row, config_yaml, client)
        remedial_action_schedule = create_remedial_action_schedule(
            row, 'case4')

        #     print(remedial_action_schedule)

        redispatch_schedule_action = create_redispatch_schedule_action(
            row, remedial_action_schedule, power_schedule, config_yaml, client, client_zone
        )

        #     print(redispatch_schedule_action)
        remedial_action_cost = create_remedial_action_cost(
            row, remedial_action_schedule, config_yaml
        )

        # time.sleep(1000)
        try:
            power_time_point = create_power_time_point(
                row, power_schedule, client_zone)
        except:
            print('got error')
            e = sys.exc_info()
            print('error found here', e)
            print(sys.exc_info()[0])
            print(e[1])
            print(e[2])
            traceback.print_tb(e[2], None, sys.stdout)
            time.sleep(1000)

        power_schedule.at[0, "VALUE"] = power_schedule.at[0, "VALUE"].replace(
            "rdf:ID", "rdf:resource"
        )

        power_schedule.at[0, "VALUE"] = power_schedule.at[0,
                                                          "VALUE"].replace("_", "#_")

        # redispatch_schedule_action.at[6,'VALUE'] = power_schedule.at[0,'VALUE']

        array_action_ora.append(remedial_action_schedule)
        array_action_ora.append(redispatch_schedule_action)
        array_action_ora.append(remedial_action_cost)
        array_action_ora.append(power_schedule)
        array_action_ora.append(power_time_point)
    # time.sleep(1000)

    if len(array_action_ora) == 0:
        return []

    dumy_ora = pd.concat(array_action_ora, axis=0)
    return dumy_ora
