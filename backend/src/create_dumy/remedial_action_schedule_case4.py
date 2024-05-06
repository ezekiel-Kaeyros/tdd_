"""Module."""
import uuid
import pandas as pd
import time


def create_remedial_action_schedule(row):  # pylint: disable=too-many-locals
    """Function."""

    remedial_action_schedule = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0
    mrid = str(uuid.uuid4())
    remedial_action_schedule.at[index_df, "VALUE"] = 'rdf:ID="_' + mrid + '"'
    remedial_action_schedule.at[index_df,
                                "FIELD"] = "nc:RemedialActionSchedule"

    index_df += 1
    input = row["tm_von"].split("/")
    if len(input) < 2:
        input = row["tm_von"].split(".")
    str_date = input[2] + input[1] + input[0]

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

    remedial_action_schedule.at[
        index_df, "VALUE"
    ] = "rdf:resource=http://entsoe.eu/ns/nc#RemedialActionScheduleStatusKind.implemented"
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

    remedial_action_schedule.at[index_df, "VALUE"] = (
        'rdf:resource="#_' + str(uuid.uuid4()) + '"'
    )
    remedial_action_schedule.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionSchedule/nc:RemedialActionSchedule.Contingency"
    index_df += 1

    return remedial_action_schedule
