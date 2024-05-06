"""Module providing a functions python version."""
import yaml
from yaml.loader import SafeLoader
from flask import request, jsonify, Blueprint
from logger.log import info_logger
from src.utils import get_all_use_case, user_is_authenticate

use_case_module = Blueprint(
    "usecase", __name__, url_prefix="/usecase", template_folder="templates"
)
use_case = use_case_module


@use_case.route("/get", methods=["GET"])
@user_is_authenticate
def load():
    """get use cases"""
    info_logger(request)
    return jsonify(
        {
            "use_cases": get_all_use_case(),
        }
    )


@use_case.route("/add", methods=["POST"])
@user_is_authenticate
def create_use_case():
    """create use case"""
    info_logger(request)
    data = request.get_json()
    with open("case.yaml", "r", encoding="utf-8") as yamlfile:
        cur_yaml = yaml.load(yamlfile, Loader=SafeLoader)
        cur_yaml.update(data)
        print(cur_yaml)

    with open("case.yaml", "w", encoding="utf-8") as yamlfile:
        yaml.safe_dump(cur_yaml, yamlfile)  # Also note the safe_dump

    return jsonify(
        {
            "result": "yaml_output",
        }
    )
