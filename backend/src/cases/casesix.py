"""Module providing a function printing python version."""
import math
import pandas as pd
from src.create_dumy.remedial_action_schedule import create_remedial_action_schedule
from src.create_dumy.remedial_action_cost import create_remedial_action_cost
from src.create_dumy.redispatch_schedule_action import create_redispatch_schedule_action
from src.create_dumy.power_schedule import create_power_schedule
from src.create_dumy.power_time_point import create_power_time_point
from src.create_dumy.remedial_action_schedule_acceptance import (
    create_remedial_action_schedule_acceptance,
)
from src.create_dumy.proposing_remedial_action_schedule_share import (
    create_proposing_remedial_action_schedule_share,
)



def create_case_six(wv_file, config_yaml, client, socketio, user_email): # pylint: disable=too-many-locals
    """Function to create case six."""
    try:
        array_action_ora = []
        print(socketio)
        print(user_email)
        for idx, row in wv_file.iterrows():
            # socketio.emit('update-progress', "Case 1")
            remedial_action_schedule = create_remedial_action_schedule(row)
            power_schedule = create_power_schedule(row, config_yaml, client)
            redispatch_schedule_action = create_redispatch_schedule_action(
                row, remedial_action_schedule, power_schedule, config_yaml, client
            )
            remedial_action_cost = create_remedial_action_cost(
                row, remedial_action_schedule, config_yaml
            )

            n = 11

            # for ind in result.index:
            #     print(ind)
            #     print(result.columns)
            for q in range(1, n):
                col = "share_factor_" + str(q)
                val = wv_file.loc[idx][col]
                val = float(val)
                if not math.isnan(val):
                    print(val)
                    if val > 0:
                        remedial_action_schedule_accepatnce = (
                            create_remedial_action_schedule_acceptance(
                                row, config_yaml, client, remedial_action_schedule
                            )
                        )
                        proposing_remedial_action_schedule_share = (
                            create_proposing_remedial_action_schedule_share(
                                row, config_yaml, client, remedial_action_schedule, val
                            )
                        )
                        array_action_ora.append(remedial_action_schedule_accepatnce)
                        array_action_ora.append(
                            proposing_remedial_action_schedule_share
                        )
            power_time_point = create_power_time_point(row, power_schedule)
            array_action_ora.append(remedial_action_schedule)
            array_action_ora.append(redispatch_schedule_action)
            array_action_ora.append(remedial_action_cost)
            array_action_ora.append(power_schedule)
            array_action_ora.append(power_time_point)

        if len(array_action_ora) == 0:
            return []

        dumy_ora = pd.concat(array_action_ora, axis=0)
        return dumy_ora
    except ValueError as e:
        print(e)
        return None
        # socketio.emit("except-progress", 1)
