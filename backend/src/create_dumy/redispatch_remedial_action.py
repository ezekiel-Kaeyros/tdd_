"""Module to create power time point."""
import uuid
import pandas as pd


def create_redispatch_remedial_action(
    wv_file, aktivierungsobjekt, mrids, full_model, socketio, socketid
):  # pylint: disable=too-many-locals, too-many-statements,too-many-arguments
    """Function."""
    try:
        redispatch_remedial_action = pd.DataFrame({"FIELD": [], "VALUE": []})
        index_df = 0
        array_mrid_redispatch_remedial_action = []
        for item in enumerate(aktivierungsobjekt):
            socketio.emit("update-progress", "Redispatch remedial action")
            dataframe = wv_file.loc[wv_file["aktivierungsobjekt"] == item]
            wv_file_date = dataframe.drop_duplicates(
                subset=["tm_von"], keep="first")
            for row in wv_file_date.iterrows():
                redispatch_remedial_action.at[index_df, "VALUE"] = (
                    "rdf:about=" + '"_' + str(uuid.uuid1()) + '"'
                )
                redispatch_remedial_action.at[
                    index_df, "FIELD"
                ] = "RedispatchRemedialAction"
                index_df += 1
                redispatch_remedial_action.at[index_df, "VALUE"] = (
                    "RD_ORA_" + row["tm_von"] + "_" + row["tm_bis"]
                )
                redispatch_remedial_action.at[
                    index_df, "FIELD"
                ] = "RedispatchRemedialAction/cim:IdentifiedObject.name"
                index_df += 1
                redispatch_remedial_action.at[index_df, "VALUE"] = full_model["VALUE"][
                    12
                ]
                redispatch_remedial_action.at[
                    index_df, "FIELD"
                ] = "RedispatchRemedialAction/cim:IdentifiedObject.mRID"
                index_df += 1

                array_mrid_redispatch_remedial_action.append(
                    {
                        "day": row["tm_von"],
                        "aktivierungsobjekt": item,
                        "mRID": full_model["VALUE"][12],
                        "name": "RD_ORA_" + row["tm_von"] + "_" + row["tm_bis"],
                    }
                )

        mrids["redispatch_remedial_action"] = array_mrid_redispatch_remedial_action
        return redispatch_remedial_action, mrids
    except Exception as error:  # pylint: disable=broad-except
        print(error)
        return None
