"""module."""
import uuid
import pandas as pd
from src.utils import find_mrid_by_ao_code


def create_proposing_remedial_action_schedule_share(
    row, config_yaml, client, remedial_action_schedule, factor
):  # pylint: disable=too-many-locals
    """Function to create case five."""
    proposing_remedial_action_schedule_share = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0

    proposing_remedial_action_schedule_share.at[index_df, "VALUE"] = (
        "rdf:ID=" + '"_' + str(uuid.uuid1()) + '"'
    )
    proposing_remedial_action_schedule_share.at[
        index_df, "FIELD"
    ] = "ProposingRemedialActionScheduleShare"
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

    proposing_remedial_action_schedule_share.at[index_df, "VALUE"] = val
    proposing_remedial_action_schedule_share.at[index_df, "FIELD"] = (
        "ProposingRemedialActionScheduleShare/nc:"
        "ProposingRemedialActionScheduleShare.RemedialActionSchedule"
    )
    index_df += 1

    proposing_remedial_action_schedule_share.at[index_df, "VALUE"] = (
        "rdf:resource="
        + "http://energy.referencedata.eu/energy/EIC/"
        + config_yaml["EIC"][client]
    )
    proposing_remedial_action_schedule_share.at[index_df, "FIELD"] = (
        "ProposingRemedialActionScheduleShare/nc:"
        # "ProposingRemedialActionScheduleShare.SystemOperator"
        "ProposingRemedialActionScheduleShare.ProposingEntity"
    )
    index_df += 1

    proposing_remedial_action_schedule_share.at[index_df, "VALUE"] = factor
    proposing_remedial_action_schedule_share.at[index_df, "FIELD"] = (
        "ProposingRemedialActionScheduleShare/nc:"
        "ProposingRemedialActionScheduleShare.costSharingFactor"
    )
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

    proposing_remedial_action_schedule_share.at[index_df, "VALUE"] = mrid
    proposing_remedial_action_schedule_share.at[
        index_df, "FIELD"
    ] = "ProposingRemedialActionScheduleShare/nc:ProposingRemedialActionScheduleShare.mRID"
    index_df += 1

    return proposing_remedial_action_schedule_share
