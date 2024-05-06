"""Module providing a function printing python version."""
import uuid
import pandas as pd


def create_countertrade_schedule_action(
    row, remedial_action_schedule, config_yamlp, client_p
):# pylint: disable=too-many-locals
    """Function."""
    countertrade_schedule_action = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0
    mrid = str(uuid.uuid4())

    countertrade_schedule_action.at[index_df, "VALUE"] = 'rdf:ID="_' + mrid + '"'
    countertrade_schedule_action.at[index_df, "FIELD"] = "nc:CountertradeScheduleAction"
    index_df += 1

    countertrade_schedule_action.at[index_df, "VALUE"] = row["aktivierungsobjekt"]
    countertrade_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:CountertradeScheduleAction/cim:IdentifiedObject.name"
    index_df += 1

    countertrade_schedule_action.at[index_df, "VALUE"] = mrid
    countertrade_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:CountertradeScheduleAction/cim:IdentifiedObject.mRID"
    index_df += 1

    countertrade_schedule_action.at[
        index_df, "VALUE"
    ] = "This is the countertrade action"
    countertrade_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:CountertradeScheduleAction/cim:IdentifiedObject.description"
    index_df += 1

    countertrade_schedule_action.at[index_df, "VALUE"] = (
        'rdf:resource="'
        + config_yamlp["CountertradeScheduleAction/nc:PowerScheduleAction.currency"][
            client_p
        ]
        + '"'
    )
    countertrade_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:CountertradeScheduleAction/nc:PowerScheduleAction.currency"
    index_df += 1
    if "rdf:ID=" in remedial_action_schedule["VALUE"][0]:
        remedial_action_schedule["VALUE"][0] = remedial_action_schedule["VALUE"][
            0
        ].replace("rdf:ID=", "rdf:resource=#")
    #  .replace("rdf:ID=\"_", "rdf:resource=\"#_")
    # remedial_action_schedule["VALUE"][0]= remedial_action_schedule["VALUE"][0].replace('_', '#_')
    # print(remedial_action_schedule["VALUE"][0])
    # time.sleep(5000)
    val = remedial_action_schedule["VALUE"][0]
    # str="Hello, World!"
    if val.find("#") != -1:
        print("Found the string")
    else:
        val = val.replace("_", "#_")

    # val= val.replace('_', '#_')
    countertrade_schedule_action.at[index_df, "VALUE"] = val
    countertrade_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:CountertradeScheduleAction/nc:PowerScheduleAction.RemedialActionSchedule"
    index_df += 1

    countertrade_schedule_action.at[index_df, "VALUE"] = "..."
    countertrade_schedule_action.at[
        index_df, "FIELD"
    ] = "nc:CountertradeScheduleAction/nc:PowerScheduleAction.PowerSchedule"
    index_df += 1

    return countertrade_schedule_action
