"""Module."""
import uuid
import pandas as pd
from src.utils import find_mr_id, find_mrid_by_ao_code


def create_remedial_action_schedule_acceptance(
    row, config_yaml, client, remedial_action_schedule
):  # pylint: disable=too-many-locals
    """Function."""
    remedial_action_schedule_acceptance = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0
    remedial_action_schedule_acceptance.at[index_df, "VALUE"] = (
        "rdf:ID=" + '"_' + str(uuid.uuid1()) + '"'
    )
    remedial_action_schedule_acceptance.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionScheduleAcceptance"
    index_df += 1

    remedial_action_schedule_acceptance.at[
        index_df, "VALUE"
    ] = "rdf:resource=http://entsoe.eu/ns/nc#RemedialActionScheduleAcceptanceKind.waiting"
    remedial_action_schedule_acceptance.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionScheduleAcceptance/nc:RemedialActionScheduleAcceptance.kind"
    index_df += 1

    if "rdf:ID=" in remedial_action_schedule["VALUE"][0]:
        remedial_action_schedule["VALUE"][0] = remedial_action_schedule["VALUE"][
            0
        ].replace("rdf:ID=", "rdf:resource=#")
    val = remedial_action_schedule["VALUE"][0]
    # str="Hello, World!"
    if val.find("#") != -1:
        print("Found the string")
    else:
        val = val.replace("_", "#_")

    remedial_action_schedule_acceptance.at[index_df, "VALUE"] = val
    remedial_action_schedule_acceptance.at[
        index_df, "FIELD"] ="nc:RemedialActionScheduleAcceptance/nc:RemedialActionScheduleAcceptance.RemedialActionSchedule"
    index_df += 1

    remedial_action_schedule_acceptance.at[index_df, "VALUE"] = (
        "rdf:resource="
        + "http://energy.referencedata.eu/energy/EIC/"
        + config_yaml["EIC"][client]
    )
    remedial_action_schedule_acceptance.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionScheduleAcceptance/nc:RemedialActionScheduleAcceptance.SystemOperator"
    index_df += 1

    ao_code = row["ao_code"]
    mrid = ""
    if len(str(ao_code)) > 0:
        mrid = find_mrid_by_ao_code(str(ao_code), client)
    else:
        mrid = f"_{uuid.uuid4()}"

    if "_" in mrid:
        print(True)
    else:
        mrid = "_" + str(mrid)

    remedial_action_schedule_acceptance.at[index_df, "VALUE"] = mrid
    remedial_action_schedule_acceptance.at[
        index_df, "FIELD"
    ] = "nc:RemedialActionScheduleAcceptance/nc:RemedialActionScheduleAcceptance.mRID"
    index_df += 1

    return remedial_action_schedule_acceptance
