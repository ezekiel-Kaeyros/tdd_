"""Module providing a function printing python version."""
import pandas as pd
from src.create_dumy.remedial_action_schedule import create_remedial_action_schedule
from src.create_dumy.remedial_action_cost import create_remedial_action_cost
from src.create_dumy.redispatch_schedule_action import create_redispatch_schedule_action
from src.create_dumy.power_schedule import create_power_schedule
from src.create_dumy.power_time_point import create_power_time_point
import time


def build_all_data_df(
    wv_file, config_yaml, client, socketio, user_email
):  # pylint: disable=too-many-locals, broad-exception-caught
    """Function."""
    socketio.emit("update-progress" + user_email, "build case 3")

    fap_df = wv_file
    if len(fap_df) == 0:
        return fap_df

    fap_df["key"] = (
        fap_df["tm_von"] + fap_df["tm_bis"] +
        fap_df["zeit_von"] + fap_df["zeit_bis"]
    )

    df_sup = fap_df[["key"]].copy()
    group_data = df_sup.drop_duplicates(subset="key", keep="last")

    array_action_ora = []

    for p in range(len(group_data)):
        # try:
        tmp_df = group_data.loc[group_data["key"] == group_data.iloc[p]["key"]]
        res = fap_df.merge(tmp_df, on="key", how="left", indicator=True)
        remedial_action_schedule = create_remedial_action_schedule(res.iloc[p])

        # socketio.emit('display-step' + user_email, "create remedial_action cost")
        remedial_action_cost = create_remedial_action_cost(
            res.iloc[p], remedial_action_schedule, config_yaml
        )

        array_action_ora.append(remedial_action_schedule)
        array_action_ora.append(remedial_action_cost)
    for idx, row in res.iterrows():
        power_schedule = create_power_schedule(row, config_yaml, client)
        # print(idx)
        # print('hello ===================')
        # time.sleep(2000)

        power_time_point = create_power_time_point(row, power_schedule)

        redispatch_schedule_action = create_redispatch_schedule_action(
            row, remedial_action_schedule, power_schedule, config_yaml, client
        )

        array_action_ora.append(redispatch_schedule_action)
        array_action_ora.append(power_schedule)
        array_action_ora.append(power_time_point)

        # except Exception as error:
        #     print(client)
        #     print(error)

        # for idx, row in res.iterrows():
        #     power_schedule = create_power_schedule(row, config_yaml, client)
        #     print(idx)

        #     power_time_point = create_power_time_point(row, power_schedule)

        #     redispatch_schedule_action = create_redispatch_schedule_action(
        #         row, remedial_action_schedule, power_schedule, config_yaml, client
        #     )

        #     array_action_ora.append(redispatch_schedule_action)
        #     array_action_ora.append(power_schedule)
        #     array_action_ora.append(power_time_point)

    if len(array_action_ora) == 0:
        return []

    dumy_ora = pd.concat(array_action_ora, axis=0)
    return dumy_ora
