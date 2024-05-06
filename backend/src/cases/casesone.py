"""Module providing a function printing python version."""
import pandas as pd
from src.create_dumy.remedial_action_schedule import create_remedial_action_schedule
from src.create_dumy.remedial_action_cost import create_remedial_action_cost
from src.create_dumy.redispatch_schedule_action import create_redispatch_schedule_action
from src.create_dumy.power_schedule import create_power_schedule
from src.create_dumy.power_time_point import create_power_time_point


def create_case_one(wv_file, config_yaml, client):  # pylint: disable=too-many-locals
    """Function to create case one."""
    try:
        # wv_file = wv_file.loc[wv_file['auslosender_prozess'] == "PRD2 (DACF)"]
        # wv_file = wv_file.loc[wv_file['gm_art'] == "Redispatch"]

        if len(wv_file) == 0:
            return wv_file

        wv_file_date = wv_file.drop_duplicates(subset=["tm_von"], keep="first")

        if len(wv_file_date) == 0:
            return wv_file_date

        array_action_ora = []
        for idx, row in wv_file_date.iterrows():
            # socketio.emit('update-progress', "Case 1")
            print('create_remedial_action_schedule')
            remedial_action_schedule = create_remedial_action_schedule(row)
            print(idx)
            print('create_power_schedule')

            power_schedule = create_power_schedule(row, config_yaml, client)

            # print(power_schedule.iloc[:10, :10])
            # time.sleep(3000)
            #     print(remedial_action_schedule)
            redispatch_schedule_action = create_redispatch_schedule_action(
                row, remedial_action_schedule, power_schedule, config_yaml, client
            )

            remedial_action_cost = create_remedial_action_cost(
                row, remedial_action_schedule, config_yaml
            )

            # print(remedial_action_cost.iloc[:10, :10])
            # time.sleep(3000)
            # print(remedial_action_cost)

            power_time_point = create_power_time_point(row, power_schedule)

            # powerSchedule = power_schedule.at[0, "VALUE"].replace(
            #     'rdf:ID="_', 'rdf:resource="#_'
            # )
            # redispatch_schedule_action.at[6,'VALUE'] = powerSchedule

            array_action_ora.append(remedial_action_schedule)
            array_action_ora.append(redispatch_schedule_action)
            array_action_ora.append(remedial_action_cost)
            array_action_ora.append(power_schedule)
            array_action_ora.append(power_time_point)
        # print('============ array length ======>')
        # print(len(array_action_ora))
        # time.sleep(2000)
        if len(array_action_ora) == 0:
            return []

        dumy_ora = pd.concat(array_action_ora, axis=0)
        return dumy_ora
    except ValueError as e:
        print(e)
        return None
        # socketio.emit("except-progress", 1)
