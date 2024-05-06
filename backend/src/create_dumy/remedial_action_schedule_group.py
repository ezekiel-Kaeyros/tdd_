"""Module."""
import uuid
from datetime import datetime
import pandas as pd


def create_remedial_action_schedule_group(row):  # pylint: disable=too-many-locals
    """Function."""
    remedial_action_schedule_group = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0

    mrid = str(uuid.uuid4())
    remedial_action_schedule_group.at[index_df, "VALUE"] = 'rdf:ID="_' + mrid + '"'
    remedial_action_schedule_group.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionScheduleGroup"
    index_df += 1
    tm_von = row["tm_von"].replace("/", ".")
    date_time_obj = date_time_obj = datetime.strptime(tm_von, "%d.%m.%Y").date()

    remedial_action_schedule_group.at[
        index_df, "VALUE"
    ] = f'FAP_Replacment_{date_time_obj}T{row["zeit_von"]}'
    remedial_action_schedule_group.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionScheduleGroup/cim:IdentifiedObject.name"
    index_df += 1

    remedial_action_schedule_group.at[index_df, "VALUE"] = mrid
    remedial_action_schedule_group.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionScheduleGroup/cim:IdentifiedObject.mRID"
    index_df += 1

    remedial_action_schedule_group.at[
        index_df, "VALUE"
    ] = "This is the redispatch action"
    remedial_action_schedule_group.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionScheduleGroup/cim:IdentifiedObject.description"
    index_df += 1

    return remedial_action_schedule_group
