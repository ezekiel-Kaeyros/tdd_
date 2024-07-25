"""Module providing a function printing python version."""
import pandas as pd
from src.create_dumy.remedial_action_schedule_case4 import (
    create_remedial_action_schedule,
)
from src.create_dumy.remedial_action_cost import create_remedial_action_cost
from src.create_dumy.redispatch_schedule_action import create_redispatch_schedule_action
from src.create_dumy.power_schedule import create_power_schedule
from src.create_dumy.power_time_point import create_power_time_point

# import time


def create_case_four(
    wv_file, config_yaml, client, socketio
):  # pylint: disable=too-many-locals
    """Function to create case four."""
    # wv_file = wv_file.loc[wv_file['auslosender_prozess'] == "Intraday"]
    # print(len(wv_file))

    # wv_file = wv_file.loc[wv_file['gm_art'] == "Redispatch"]
    # wv_file = wv_file.loc[wv_file['tm_art'] == "Markt-KW 13(1)"]

    # wv_file_date = wv_file.drop_duplicates(subset=["tm_von"], keep = 'first')
    print(socketio)
    wv_file_date = wv_file
    array_action_ora = []

    for idx, row in wv_file_date.iterrows():
        # socketio.emit('update-progress', "Case 4")
        # print(idx)
        # print(row['tm_von'])
        power_schedule = create_power_schedule(row, config_yaml, client)
        print('end ----------------33')
        remedial_action_schedule = create_remedial_action_schedule(row)
        print('end ----------------35')

        #     print(remedial_action_schedule)

        redispatch_schedule_action = create_redispatch_schedule_action(
            row, remedial_action_schedule, power_schedule, config_yaml, client
        )
        print('end ----------------42')
        #     print(redispatch_schedule_action)
        remedial_action_cost = create_remedial_action_cost(
            row, remedial_action_schedule, config_yaml
        )

        power_time_point = create_power_time_point(row, power_schedule)
        print('end ----------------49')

        #     power_schedule.at[1,'VALUE']
        power_schedule.at[0, "VALUE"] = power_schedule.at[0, "VALUE"].replace(
            "rdf:ID", "rdf:resource"
        )
        print('end ----------------55')

        power_schedule.at[0, "VALUE"] = power_schedule.at[0,
                                                          "VALUE"].replace("_", "#_")

        # redispatch_schedule_action.at[6,'VALUE'] = power_schedule.at[0,'VALUE']

        array_action_ora.append(remedial_action_schedule)
        array_action_ora.append(redispatch_schedule_action)
        array_action_ora.append(remedial_action_cost)
        array_action_ora.append(power_schedule)
        array_action_ora.append(power_time_point)

    if len(array_action_ora) == 0:
        return []

    dumy_ora = pd.concat(array_action_ora, axis=0)
    return dumy_ora
