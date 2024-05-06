"""Module providing a function printing python version."""
import os
import uuid
from datetime import datetime as dt
import yaml
from pytz import timezone
import pandas as pd
from yaml.loader import SafeLoader
from src.generate_date import build_min_date
from src.generate_date import build_max_date


# socketio.emit("update-progress", "Full model")
# client_time_zone = timezone('Europe/Berlin')


def get_min_date(date_list, client_zone):  # pylint: disable=too-many-locals
    """Function."""
    if len(client_zone) == 0:
        client_zone = "UTC"
    client_zone = timezone(str(client_zone))

    time_zone = build_min_date(date_list, str(client_zone))
    print('eeeeeeeeee', time_zone)

    fully = str(time_zone).split(" ", maxsplit=1)[0]
    fullt = str(time_zone).split(" ")[1]
    return fully + "T" + fullt + "Z"


def get_max_date(date_list, client_zone):  # pylint: disable=too-many-locals
    """Function."""
    if len(client_zone) == 0:
        client_zone = "UTC"
    client_zone = timezone(str(client_zone))

    times = build_max_date(date_list, str(client_zone))
    time_b = str(times).split(" ")
    fully = time_b[0]
    fullt = time_b[1]

    return fully + "T" + fullt + "Z"


def create_full_model(path_csv, config_yaml, client, max_date_list, min_date_list):  # pylint: disable=too-many-locals, too-many-statements
    """Function."""

    tso = config_yaml["tso"][client]
    full_model = pd.DataFrame({"FIELD": [], "VALUE": []})
    path = os.path.abspath("./input/config_files/refzone.yaml")
    client_zone = ""
    with open(path, "rb") as file:
        try:
            client_zone_yaml = yaml.load(file, Loader=SafeLoader)
            for data in client_zone_yaml:
                for key in list(client_zone_yaml[data]):
                    if key == client:
                        client_zone = client_zone_yaml[data][key]
        except yaml.YAMLError as exc:
            print(exc)

    # add FullModel value
    timestamp = os.path.basename(path_csv).split(".")[0]
    timestamp = os.path.basename(timestamp).split("_")[-1]
    timestamp = int(timestamp)
    # 202211071015
    date_obj = pd.to_datetime(timestamp, format="%Y%m%d%H%M")

    date_str = date_obj.strftime("%Y-%m-%dT%H:%M:%SZ")
    uuid_full_model = str(uuid.uuid4())
    index_df = 0
    full_model.at[index_df, "VALUE"] = (
        "rdf:about=" + '"urn:uuid:' + uuid_full_model + '"'
    )
    full_model.at[index_df, "FIELD"] = "md:FullModel"
    index_df += 1

    full_model.at[index_df, "VALUE"] = date_str
    full_model.at[index_df, "FIELD"] = "md:FullModel/prov:generatedAtTime"
    index_df += 1

    full_model.at[index_df, "VALUE"] = dt.now().isoformat()
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:issued"
    index_df += 1

    full_model.at[
        index_df, "VALUE"
    ] = "rdf:resource=http://energy.referencedata.eu/EIC/10X1001A1001A094"
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:publisher"
    index_df += 1

    full_model.at[index_df, "VALUE"] = "RAS"
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcat:keyword"
    index_df += 1

    full_model.at[index_df, "VALUE"] = 'rdf:resource=' + \
        "urn:uuid:" + str(uuid.uuid1())
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:references"
    index_df += 1

    full_model.at[index_df, "VALUE"] = 'rdf:resource=' + config_yaml["FullModel/dcterms:Model.license"][
        tso
    ]
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:license"
    index_df += 1

    full_model.at[
        index_df, "VALUE"
    ] = "rdf:resource=http://energy.referencedata.eu/Confidentiality/4cd9b326-1275-4da7-9724-28c5e1deeb87"
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:accessRights"
    index_df += 1

    full_model.at[index_df, "VALUE"] = "1.0"
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcat:version"
    index_df += 1

    full_model.at[index_df, "VALUE"] = config_yaml[
        "FullModel/dcterms:Model.description"
    ][tso]
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:description"
    index_df += 1

    start_date = get_min_date(min_date_list, client_zone)
    # time.sleep(3000)

    end_date = get_max_date(max_date_list, client_zone)

    full_model.at[index_df, "VALUE"] = start_date
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcat:startDate"
    index_df += 1

    full_model.at[index_df, "VALUE"] = end_date
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcat:endDate"
    index_df += 1

    full_model.at[index_df, "VALUE"] = "urn:uuid:" + uuid_full_model
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:identifier"
    index_df += 1

    full_model.at[index_df, "VALUE"] = 'rdf:resource=' + config_yaml[
        "FullModel/dcterms:Model.conformsTo.RemedialActionSchedule"
    ][tso]
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:conformsTo"
    index_df += 1

    full_model.at[index_df, "VALUE"] = 'rdf:resource=' + config_yaml[
        "FullModel/dcterms:Model.conformsTo.PowerSchedule"
    ][tso]
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:conformsTo"
    index_df += 1

    full_model.at[
        index_df, "VALUE"
    ] = "rdf:resource=http://energy.referencedata.eu/CGM/Action/CGM-1D-RAS"
    full_model.at[index_df, "FIELD"] = "md:FullModel/prov:wasGeneratedBy"
    index_df += 1

    full_model.at[
        index_df, "VALUE"
    ] = "rdf:resource=http://energy.referencedata.eu/Model/ELIA_CGM-RAS"
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcat:isVersionOf"
    index_df += 1

    full_model.at[
        index_df, "VALUE"
    ] = "rdf:resource=http://energy.referencedata.eu/Frame/BE_Transmission_Grid"
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:spatial"
    index_df += 1

    full_model.at[index_df, "VALUE"] = start_date + \
        "_" + tso + "_" + "CGM-1D-RAS"
    full_model.at[index_df, "FIELD"] = "md:FullModel/dcterms:title"
    index_df += 1
    return full_model
