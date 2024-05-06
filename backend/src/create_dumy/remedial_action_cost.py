"""Module."""
import uuid
import pandas as pd


def create_remedial_action_cost(
    row, remedial_action_schedule, config_yaml, modifie="case"
): # pylint: disable=too-many-locals
    """Function."""
    remedial_action_cost = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0
    mrid = str(uuid.uuid4())

    try:
        remedial_action_cost.at[index_df, "VALUE"] = 'rdf:ID="_' + mrid + '"'
        remedial_action_cost.at[index_df, "FIELD"] = "nc:RemedialActionCost"
        index_df += 1

        remedial_action_cost.at[index_df, "VALUE"] = mrid
        remedial_action_cost.at[
            index_df, "FIELD"
        ] = "nc:RemedialActionCost/cim:RemedialActionCost.mRID"
        index_df += 1

        startup_cost = "0"
        if row["tm_richtung"] == "Quelle":
            startup_cost = str(row["kosten_fur_an_und_abfahrt"])

        remedial_action_cost.at[index_df, "VALUE"] = startup_cost
        remedial_action_cost.at[
            index_df, "FIELD"
        ] = "nc:RemedialActionCost/nc:RemedialActionCost.startupCost"
        index_df += 1

        shutdown_cost = "0"
        if row["tm_richtung"] == "Senke":
            shutdown_cost = str(row["kosten_fur_an_und_abfahrt"])

        remedial_action_cost.at[index_df, "VALUE"] = shutdown_cost
        remedial_action_cost.at[
            index_df, "FIELD"
        ] = "nc:RemedialActionCost/nc:RemedialActionCost.shutdownCost"
        index_df += 1
        andere_kosten = row["andere_kosten"]
        remedial_action_cost.at[index_df, "VALUE"] = str(andere_kosten)
        remedial_action_cost.at[
            index_df, "FIELD"
        ] = "nc:RemedialActionCost/nc:RemedialActionCost.otherCost"
        index_df += 1
    except Exception as error:  # pylint: disable=broad-except
        print(error)
        print("error remedial action coast here")
        # time.sleep(2000)
        # print(e)
    # print(f'remedial schedule ====> {remedial_action_schedule["VALUE"][0]}')
    try:
        val = remedial_action_schedule["VALUE"][0].split("_")
        newval = val[0] + "#" + "_" + val[1]
        # time.sleep(200)

        if modifie == "case5":
            newval = newval.replace("rdf:ID", "rdf:resource")
            # print(newval)
        else:
            newval = newval.replace("rdf:ID", "rdf:resource")
        # print(newval)
        if len(newval.split("=#")) == 2:
            newval = newval.replace("=#", "=")

        remedial_action_cost.at[index_df, "VALUE"] = newval
        remedial_action_cost.at[
            index_df, "FIELD"
        ] = "nc:RemedialActionCost/nc:RemedialActionCost.RemedialActionSchedule"
        index_df += 1

        remedial_action_cost.at[index_df, "VALUE"] = (
            "rdf:resource=http://entsoe.eu/ns/nc#CostSettledKind."
            + config_yaml["RemedialActionCost/nc:RemedialActionCost.kind"]["value1"]
        )
        remedial_action_cost.at[
            index_df, "FIELD"
        ] = "nc:RemedialActionCost/nc:RemedialActionCost.kind"
        index_df += 1

    except Exception as error:  # pylint: disable=broad-except
        print(error)
        print("error remedial action coast here second block try catch")
        # time.sleep(2000)

    return remedial_action_cost
