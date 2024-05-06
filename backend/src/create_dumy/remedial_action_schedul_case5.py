"""Module."""
import uuid
import pandas as pd


def create_remedial_action_schedule_case5(row, remedial_action_schedule_group): # pylint: disable=too-many-locals
    """Function."""
    remedial_action_schedule = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0

    mrid = str(uuid.uuid4())
    remedial_action_schedule.at[index_df, "VALUE"] = 'rdf:ID="_' + mrid + '"'
    remedial_action_schedule.at[index_df, "FIELD"] = "nc:RemedialActionSchedule"
    index_df += 1

    tm_von = row["tm_von"].replace("/", ".")
    dates = tm_von.split(".")
    str_date = dates[2] + dates[1] + dates[0]

    remedial_action_schedule.at[index_df, "VALUE"] = (
        str_date + "_DA_CROSA_ORA_" + row["tages_tm_ident"]
    )
    remedial_action_schedule.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionSchedule/cim:IdentifiedObject.name"
    index_df += 1

    remedial_action_schedule.at[index_df, "VALUE"] = mrid
    remedial_action_schedule.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionSchedule/cim:IdentifiedObject.mRID"
    index_df += 1

    if row["auslosender_prozess"] == "FAP-Replacement":
        remedial_action_schedule.at[
            index_df, "VALUE"
        ] = "rdf:resource=http://entsoe.eu/ns/nc#RemedialActionScheduleStatusKind.implemented"
        remedial_action_schedule.at[
            index_df, "FIELD"
        ] = "nc:RemedialActionSchedule/nc:RemedialActionSchedule.statusKind"
    else:
        remedial_action_schedule.at[
            index_df, "VALUE"
        ] = "rdf:resource=http://entsoe.eu/ns/nc#RemedialActionScheduleStatusKind.notUsed"
        remedial_action_schedule.at[
            index_df, "FIELD"
        ] = "nc:RemedialActionSchedule/nc:RemedialActionSchedule.statusKind"
    index_df += 1

    remedial_action_schedule.at[index_df, "VALUE"] = (
        'rdf:resource="#_' + str(uuid.uuid4()) + '"'
    )
    remedial_action_schedule.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionSchedule/nc:RemedialActionSchedule.RemedialAction"
    index_df += 1
    val = str(remedial_action_schedule_group["VALUE"][0]).replace(
        "rdf:ID", "rdf:resource"
    )
    val = val.replace("_", "#_")
    remedial_action_schedule.at[index_df, "VALUE"] = val
    remedial_action_schedule.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionScheduleGroup/nc:RemedialActionSchedule.RemedialActionScheduleGroup"
    index_df += 1

    return remedial_action_schedule
