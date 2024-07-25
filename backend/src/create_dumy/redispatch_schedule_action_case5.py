"""Module to create power time point."""
import uuid
import pandas as pd
from src.utils import get_utc_time


def create_redispatch_schedule_action_case5(
    row, remedial_action_schedule, power_schedule, config_yamlp, client_p, client_zone
):  # pylint: disable=too-many-locals
    """Function."""
    redispatch_schedule_action = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0
    mrid = str(uuid.uuid4())

    redispatch_schedule_action.at[index_df, "VALUE"] = 'rdf:ID="_' + mrid + '"'
    redispatch_schedule_action.at[index_df,
                                  "FIELD"] = "nc:RedispatchScheduleAction"
    index_df += 1

    redispatch_schedule_action.at[index_df,
                                  "VALUE"] = row["aktivierungsobjekt"]
    redispatch_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:RedispatchScheduleAction/cim:IdentifiedObject.name"
    index_df += 1

    redispatch_schedule_action.at[index_df, "VALUE"] = mrid
    redispatch_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:RedispatchScheduleAction/cim:IdentifiedObject.mRID"
    index_df += 1

    hours = row["zeit_von"].split(":")
    hour = hours[0]
    time_convert = row["tm_von"].replace("/", "-")
    time_convert = time_convert.replace(".", "-")
    time_convert = time_convert.split('-')
    time_convert = time_convert[2] + '-' + \
        time_convert[1] + '-' + time_convert[0]
    row_date = row["zeit_von"]
    if len(str(row["zeit_von"]).split(":")) == 2:
        row_date = str(row["zeit_von"]) + ':00'
    t_to_utc = f'{time_convert} {row_date}'
    time_utc = get_utc_time(client_zone, str(t_to_utc))
    tab = time_utc.split(' ')[1].split(':')

    redispatch_schedule_action.at[index_df, "VALUE"] = (
        row["zustandiger_ras_unb"]
        + "_"
        # + remedial_action_schedule["VALUE"][1][-8:]
        + row["tages_tm_ident"]
        + "_"
        # + row["zeit_von"]
        # + str(time_utc).split(' ')[1]
        + str(tab[0]) + ':' + str(tab[1])
    )
    redispatch_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:RedispatchScheduleAction/cim:IdentifiedObject.description"
    index_df += 1

    redispatch_schedule_action.at[index_df, "VALUE"] = (
        'rdf:resource="'
        + config_yamlp["RedispatchScheduleAction/nc:PowerScheduleAction.currency"][
            client_p
        ]
        + '"'
    )
    redispatch_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:RedispatchScheduleAction/nc:PowerScheduleAction.currency"
    index_df += 1

    # print('debug here =====>')
    # print(remedial_action_schedule["VALUE"][0])
    # time.sleep(2000)
    # fullstring = "StackAbuse"
    substring = False

    if 'rdf:ID="_' in remedial_action_schedule["VALUE"][0]:
        substring = remedial_action_schedule["VALUE"][0].replace(
            "rdf:ID=_", "rdf:resource=#_"
        )
    #  .replace("rdf:ID=\"_", "rdf:resource=\"#_")
    elif 'rdf:resource="_' in remedial_action_schedule["VALUE"][0]:
        substring = remedial_action_schedule["VALUE"][0].replace(
            "rdf:resource==_", "rdf:resource=#_"
        )
        # .replace("rdf:resource=\"_", "rdf:resource=\"#_")
    else:
        substring = remedial_action_schedule["VALUE"][0].replace(
            "rdf:ID=_", "rdf:resource=#_"
        )
    #  replace("rdf:ID=\"_", "rdf:resource=\"#_")
    substring = substring.replace("rdf:ID=", "rdf:resource=")
    substring = substring.replace("_", "#_")
    redispatch_schedule_action.at[index_df, "VALUE"] = substring
    redispatch_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:RedispatchScheduleAction/nc:PowerScheduleAction.RemedialActionSchedule"
    index_df += 1

    id_1 = power_schedule["VALUE"][0].replace("rdf:ID=", "rdf:resource=")
    id_2 = id_1.replace("_", "#_")
    # print(id)
    redispatch_schedule_action.at[index_df, "VALUE"] = id_2
    redispatch_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:RedispatchScheduleAction/nc:PowerScheduleAction.PowerSchedule"
    index_df += 1

    return redispatch_schedule_action
