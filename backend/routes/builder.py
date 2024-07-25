"""Module providing a functions to generate xmlfile python version."""

import configparser
import os
import re
import yaml
from flask import Blueprint, request, jsonify, send_file, Response
from bs4 import UnicodeDammit
from logger.log import create_and_send_email, info_logger, error_logger
from src.app_loader import get_socketio
from src.generate_dummy import CreateDummy
from src.converter import Converter
from src.read_config import read_config
from src.read_csv import verify_variable_dataframe
from src.utils import get_path_to_yaml, user_is_authenticate, allow_download
from src.convert_xlsx import convert_to_csv
import time
import json
import sys
import traceback
import threading
builder = Blueprint(
    "builder", __name__, url_prefix="/builder", template_folder="templates"
)
config = configparser.ConfigParser()


@builder.route("/", methods=["POST"])
@user_is_authenticate
def activate():
    """
    Handles the activation route.
    """

    file_name = request.files["file"].filename
    abreviation_aame = file_name.split("_")[1]
    info_logger(request)
    get_socketio().emit("update-progress", 25, to="socketid")
    if request.method == "POST":

        if re.search("WV_", file_name):
            request.files["file"].save(file_name)
            path_csv = os.path.abspath(file_name)
            name, file_extension = os.path.splitext(os.path.abspath(file_name))
            if file_extension == ".xlsx":
                path_csv = convert_to_csv(path_csv, file_name)

            path = get_path_to_yaml(
                request.args.get("email"), abreviation_aame)

            with open(path, "r", encoding="utf-8") as stream:
                try:
                    config_yaml = yaml.safe_load(stream)
                except yaml.YAMLError as exc:
                    error_logger(exc, "Builder_Module")
                    create_and_send_email(exc, "Builder_Module")
                    raise exc

            client = os.path.basename(path_csv).split(".")[0].split("_")[1]

            clent_name = config_yaml["clients"][client]
            tso = config_yaml["tso"][client]
            with open(path_csv, "rb") as file:
                content = file.read()
            encodage = UnicodeDammit(content).original_encoding

            is_valid, columns_expects, wv_file, arr_not_found_row = verify_variable_dataframe(
                path_csv, encodage, get_socketio(), request.args.get("email"), tso
            )

            if len(arr_not_found_row) > 0:
                print('error one', arr_not_found_row)
                return jsonify(
                    {
                        "error": arr_not_found_row,
                    }
                ), 400

            if is_valid is False and len(columns_expects) > 0:
                print('error two', columns_expects)
                # get_socketio().emit(
                #     "except-progress" +
                #     request.args.get("email"), set(columns_expects)
                # )
                return jsonify(
                    {
                        "error": columns_expects,
                    }
                ), 400

            if len(wv_file) == 0:
                print('error three', wv_file)
                msg = f"No data in this file for Tso {clent_name}"
                return jsonify(
                    {
                        "error": [msg],
                    }
                ), 400

            child = CreateDummy(
                # path_csv=path_csv,
                wv_file=wv_file,
                path_csv=file_name,
                socketio=get_socketio(),
                socketid="1",
                encodage=encodage,
                user_email=request.args.get("email"),
                path_to_yaml=path,
                abreviation_name=abreviation_aame,
                tso=tso,
            )

            try:
                child.create_dummy(tso, abreviation_aame)
                # t = threading.Thread(
                #     target=child.create_dummy, args=(tso, abreviation_aame))
                # t.start()

            except Exception:  # pylint: disable=broad-except
                e = sys.exc_info()
                traceback.print_tb(e[2], None, sys.stdout)
                # time.sleep(5000)
                # error_logger(error, "Builder_Module")
                # create_and_send_email(str(error), "Builder_Module")
                return jsonify({"error": ["invalide file format!"]}), 400

            inputpath, outputpath, filenames = read_config()

            get_socketio().emit(
                "update-progress" +
                request.args.get("email"), "Generate xml file"
            )

            try:
                Converter(inputpath, outputpath, filenames)
            except Exception as error:  # pylint: disable=broad-except
                error_logger(error, "Converter_Module")
                create_and_send_email(error, "Converter_Module")
                return jsonify({"error": [error]}), 400

            get_socketio().emit("process-end" + request.args.get("email"), "End")
            return jsonify({"sucess": True})
        return jsonify({"error": ["invalide file format!"]}), 400
    return jsonify({"error": ["invalide method request!"]}), 400


@builder.route("/", methods=["GET"])
@allow_download
def download_file(args, filename):
    """
    Download xml file route.
    """
    info_logger(request)
    print(args)
    print(filename)
    if request.args.get("tso"):
        tso = request.args.get("tso")
        print(tso)
        config.read("./docs/config.ini")
        path = config["OUTPUT"][f"{tso}" +
                                "outputpath"] + config["OUTPUT"][f"{tso}"]
        return send_file(path, as_attachment=True)
    return (
        jsonify(
            {
                "error": ["File not found"],
            }
        ),
        400,
    )
