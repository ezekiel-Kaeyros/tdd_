"""Module."""
import uuid
import pandas as pd


def create_remedial_action_schedule(row):  # pylint: disable=too-many-locals
    """Function."""
    remedial_action_schedule = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0

    mrid = str(uuid.uuid4())
    remedial_action_schedule.at[index_df, "VALUE"] = 'rdf:ID="_' + mrid + '"'
    remedial_action_schedule.at[index_df,
                                "FIELD"] = "nc:RemedialActionSchedule"
    index_df += 1

    tm_von = row["tm_von"].replace("/", ".")
    # tm_von = row["tm_von"].replace("-", ".")
    if '-' in row["tm_von"]:
        tm_von = row["tm_von"].replace("-", ".")

    dates = tm_von.split(".")
    str_date = dates[2] + dates[1] + dates[0]

    remedial_action_schedule.at[index_df, "VALUE"] = (
        str_date + "_DA_CROSA_ORA_" + row["tages_tm_ident"]
    )
    remedial_action_schedule.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionSchedule/cim:IdentifiedObject.name"
    index_df += 1

    remedial_action_schedule.at[index_df, "VALUE"] = '_' + mrid
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

    remedial_action_schedule.at[
        index_df, "VALUE"
    ] = "rdf:resource=http://energy.referencedata.eu/energy/EIC/22XCORESO------Ss"
    remedial_action_schedule.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionSchedule/nc:RemedialActionSchedule.ProposingEntity"
    index_df += 1

    # remedial_action_schedule.at[index_df,
    #                             "VALUE"] = "rdf:resource=http://energy.referencedata.eu/energy/EIC/22XCORESO------Ss"
    # remedial_action_schedule.at[
    #     index_df, "FIELD"
    # ] = "nc:RemedialActionSchedule.ProposingEntity"
    # index_df += 1

    return remedial_action_schedule
