"""Module providing a function printing python version."""
import pandas as pd
from src.create_dumy.remedial_action_schedule import create_remedial_action_schedule
from src.create_dumy.remedial_action_cost import create_remedial_action_cost
from src.create_dumy.countertrade_schedule_action import (
    create_countertrade_schedule_action,
)
from src.create_dumy.power_schedule import create_power_schedule
from src.create_dumy.power_time_point import create_power_time_point


def create_case_two(wv_file, config_yaml, client, client_zone):  # pylint: disable=too-many-locals
    """Function to create case five."""
    wv_file.head(1)

    wv_file_date = wv_file.drop_duplicates(subset=["tm_von"], keep="first")
    array_action_ora = []
    for idx, row in wv_file_date.iterrows():
        # socketio.emit('update-progress', "Case 2")
        remedial_action_schedule = create_remedial_action_schedule(row)

        countertrade_schedule_action = create_countertrade_schedule_action(
            row, remedial_action_schedule, config_yaml, client
        )

        remedial_action_cost = create_remedial_action_cost(
            row, remedial_action_schedule, config_yaml
        )

        power_schedule = create_power_schedule(row, config_yaml, client)

        power_time_point = create_power_time_point(
            row, power_schedule, client_zone)
        val = power_schedule.at[0, "VALUE"].replace("rdf:ID=", "rdf:resource=")
        val = val.replace("_", "#_")
        countertrade_schedule_action.at[6, "VALUE"] = val

        array_action_ora.append(remedial_action_schedule)
        array_action_ora.append(countertrade_schedule_action)
        array_action_ora.append(remedial_action_cost)
        array_action_ora.append(power_schedule)
        array_action_ora.append(power_time_point)

    if len(array_action_ora) == 0:
        return []

    dumy_ora = pd.concat(array_action_ora, axis=0)
    return dumy_ora
