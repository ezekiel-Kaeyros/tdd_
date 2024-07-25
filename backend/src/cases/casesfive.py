"""Module providing a function printing python version."""
import pandas as pd
from src.create_dumy.remedial_action_schedul_case5 import (
    create_remedial_action_schedule_case5,
)
from src.create_dumy.redispatch_schedule_action_case5 import (
    create_redispatch_schedule_action_case5,
)
from src.create_dumy.remedial_action_cost import create_remedial_action_cost

# from src.create_dumy.redispatch_schedule_action import create_redispatch_schedule_action
# from src.create_dumy.countertrade_schedule_action import (
#     create_countertrade_schedule_action,
# )
from src.create_dumy.power_schedule import create_power_schedule
from src.create_dumy.power_time_point import create_power_time_point
from src.create_dumy.remedial_action_schedule_group import (
    create_remedial_action_schedule_group,
)

# import time


def create_case_five(
    wv_file, config_yaml, client, socketio, client_zone
):  # pylint: disable=too-many-locals
    """Function to create case five."""
    # fap_df = wv_file.loc[wv_file['auslosender_prozess'] == "FAP-Replacement"]
    # print(socketio)
    fap_df = wv_file
    if len(fap_df) == 0:
        return fap_df

    df_sup = fap_df[["tages_tm_ident"]].copy()
    group_data = df_sup.drop_duplicates(subset="tages_tm_ident", keep="last")
    array_action_ora = []
    for p in range(len(group_data)):
        tmp_df = group_data.loc[
            group_data["tages_tm_ident"] == group_data.iloc[p]["tages_tm_ident"]
        ]

        res = fap_df.merge(tmp_df, on="tages_tm_ident",
                           how="left", indicator=True)
        remedial_action_schedule_group = create_remedial_action_schedule_group(
            res.iloc[p]
        )

        array_action_ora.append(remedial_action_schedule_group)
        for idx, row in res.iterrows():
            remedial_action_schedule = create_remedial_action_schedule_case5(
                row, remedial_action_schedule_group
            )
            power_schedule = create_power_schedule(row, config_yaml, client)
            redispatch_schedule_action = create_redispatch_schedule_action_case5(
                row, remedial_action_schedule, power_schedule, config_yaml, client, client_zone
            )
            remedial_action_cost = create_remedial_action_cost(
                row, remedial_action_schedule, config_yaml
            )
            power_time_point = create_power_time_point(
                row, power_schedule, client_zone)

            array_action_ora.append(remedial_action_schedule)
            array_action_ora.append(redispatch_schedule_action)
            array_action_ora.append(remedial_action_cost)
            array_action_ora.append(power_schedule)
            array_action_ora.append(power_time_point)
            # print(res.head())
    # dumy_ora = pd.concat(array_action_ora, axis=0)
    if len(array_action_ora) == 0:
        return []

    dumy_ora = pd.concat(array_action_ora, axis=0)
    return dumy_ora
