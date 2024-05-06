"""Module providing a functions to generate xmlfile python version."""

from flask import Blueprint, request, jsonify, send_file, Response
from src.utils import user_is_authenticate

sftp = Blueprint(
    "sftp", __name__, url_prefix="/sftp", template_folder="templates"
)


@sftp.route("/", methods=["POST"])
@user_is_authenticate
def activate():
    """
    Handles the activation route.
    """

    return jsonify({"success": True})
