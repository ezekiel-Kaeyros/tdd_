"""Module power schedule."""
import uuid
import pandas as pd
from src.utils import find_mrid_by_ao_code


def create_power_schedule(row, confi_yaml, client_p):  # pylint: disable=too-many-locals
    """Function."""
    power_schedule = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0
    mrid = str(uuid.uuid4())
    ao_code = row["ao_code"]
    if len(str(ao_code)) > 0:
        generating_unit = find_mrid_by_ao_code(str(ao_code), client_p)
    # time.sleep(40000)

    power_schedule.at[index_df, "VALUE"] = 'rdf:ID="_' + mrid + '"'
    power_schedule.at[index_df, "FIELD"] = "nc:PowerSchedule"
    index_df += 1
    if isinstance(row["aktivierungsobjekt"], str):
        pass
    else:
        row["aktivierungsobjekt"] = str(row["aktivierungsobjekt"])
    power_schedule.at[index_df, "VALUE"] = "Power schedule " + \
        row["aktivierungsobjekt"]
    power_schedule.at[index_df,
                      "FIELD"] = "nc:PowerSchedule/cim:IdentifiedObject.name"
    index_df += 1

    power_schedule.at[index_df, "VALUE"] = mrid
    power_schedule.at[index_df,
                      "FIELD"] = "nc:PowerSchedule/cim:IdentifiedObject.mRID"
    index_df += 1

    power_schedule.at[index_df, "VALUE"] = confi_yaml[
        "PowerSchedule/cim:IdentifiedObject.description"
    ][client_p]
    power_schedule.at[
        index_df, "FIELD"
    ] = "nc:PowerSchedule/cim:IdentifiedObject.description"
    index_df += 1

    power_schedule.at[index_df, "VALUE"] = (
        'rdf:resource="'
        + confi_yaml["PowerSchedule/nc:BaseTimeSeries.interpolationKind"][client_p]
        + '"'
    )
    power_schedule.at[
        index_df, "FIELD"
    ] = "nc:PowerSchedule/nc:BaseTimeSeries.interpolationKind"
    index_df += 1

    # //new field

    power_schedule.at[index_df, "VALUE"] = (
        "rdf:resource=" + "http://entsoe.eu/ns/nc#BaseTimeSeriesKind.actual"
    )
    power_schedule.at[index_df,
                      "FIELD"] = "nc:PowerSchedule/nc:BaseTimeSeries.kind "
    index_df += 1

    return power_schedule
