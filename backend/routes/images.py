"""Module providing a functions python version."""
from flask import request, Blueprint
from werkzeug.utils import secure_filename
from src.utils import (
    user_is_authenticate,
)

image_converter = Blueprint(
    "images", __name__, url_prefix="/images", template_folder="templates"
)
images = image_converter


@images.route("/build", methods=["POST", "GET"])
@user_is_authenticate
def upload_file():
    """upload file"""
    if request.method == "POST":
        f = request.files["file"]
        f.save(secure_filename(f.filename))
        return "file uploaded successfully"
    return None
