"""Module providingFunction to created tso."""
import logging
from marshmallow import Schema, fields
import yaml
from sqlalchemy.exc import SQLAlchemyError
from flask import request, jsonify, Blueprint
from logger.log import create_and_send_email, info_logger, error_logger, notify_by_email
from src.database import db, User, Tso
import time
from src.utils import (
    create_user_with_password,
    create_new_tso,
    upload_file,
    save_stammdatei_file,
    update_some_tso_row,
    is_authenticate,
    user_is_authenticate,
    update_user,
    add_tso_to_ref_zone,
)
import time

handle_tso = Blueprint(
    "tso", __name__, url_prefix="/companies", template_folder="templates"
)


class UserSchema(Schema):
    """
    all USERs from the database and returns them as a JSON response.
    """

    username = fields.String()
    id = fields.Integer()
    company = fields.String()
    role = fields.Integer()
    email = fields.String()
    is_actif = fields.Boolean()


class TsoSchema(Schema):
    """
    all TSOs from the database and returns them as a JSON response.
    """

    logo_path = fields.String()
    id = fields.Integer()
    company = fields.String()
    tsoAbbreviation = fields.String()
    stammdatei_file_path = fields.String()
    email = fields.String()
    userList = fields.Nested(UserSchema, many=True)
    is_actif = fields.Boolean()


@handle_tso.get("/")
@user_is_authenticate
def get_all_tso():
    """
    Retrieves all TSOs from the database and returns them as a JSON response.

    Returns:
        A JSON response containing a list of TSOs.
    """
    user = is_authenticate(request)
    info_logger(request)
    tso_list = Tso.query.order_by(Tso.company).all()
    result = []

    user_dict = {}
    for user in User.query:
        if user.company not in user_dict:
            user_dict[user.company] = []
        us = {
            "username": user.username,
            "id": user.id,
            "company": user.company,
            "role": user.role,
            "email": user.email,
            "is_actif": user.is_actif,
        }
        user_dict[user.company].append(us)

    for x in tso_list:
        user_list = user_dict.get(x.company, [])
        user = {
            "logo_path": x.logo_path,
            "id": x.id,
            "company": x.company,
            "tsoAbbreviation": x.tsoAbbreviation,
            "stammdatei_file_path": x.stammdatei_file_path,
            "email": x.email,
            "userList": user_list,
            "is_actif": x.is_actif,
        }
        result.append(user)

    # tso_schema = TsoSchema(many=True)
    # result = tso_schema.dump(result)

    return jsonify(
        {
            "tso_list": result,
        }
    )


@handle_tso.get("/<tso_id>")
@user_is_authenticate
def get_company(tso_id):
    """
    Get company information by TSO ID.

    Parameters:
        tso_id (int): The ID of the TSO.

    Returns:
        dict: A dictionary containing the company information.

    Raises:
        404: If the TSO is not found.
    """
    info_logger(request)
    try:
        tso = Tso.query.get_or_404(tso_id)
    except NameError:
        return jsonify({"error": "companie not found"}), 404

    user_list = []
    users = User.query.filter_by(
        company=tso.company).order_by(User.username).all()
    for user in users:
        us = {
            "username": user.username,
            "id": user.id,
            "company": user.company,
            "role": user.role,
            "email": user.email,
        }
        user_list.append(us)

    company = {
        "logo_path": tso.logo_path,
        "id": tso.id,
        "company": tso.company,
        "tsoAbbreviation": tso.tsoAbbreviation,
        "stammdatei_file_path": tso.stammdatei_file_path,
        "email": tso.email,
        "userList": user_list,
    }

    return jsonify(
        {
            "company": company,
        }
    )


@handle_tso.route("/create", methods=["POST"])
@user_is_authenticate
def create_tso():
    """
    This function creates a new TSO (Transmission System Operator) based on the provided form data.
    """
    info_logger(request)

    try:
        logo_path = ""
        if request.form["company"]:
            tso = Tso.query.filter_by(company=request.form["company"]).first()
            if tso:
                return jsonify({"error": "company already exist"}), 409
        if request.form["role"] == 1:
            pass
        if request.files["file"]:
            logo_path = upload_file(request)

        if request.files["stammdatei_file"]:
            stammdatei_file_path = ""
            stammdatei_file_path = save_stammdatei_file(request)

        admin = create_user_with_password(request.form, db, notify_by_email)

        admin["stammdatei_file_path"] = stammdatei_file_path
        admin["logo_path"] = logo_path
        admin["tsoAbbreviation"] = request.form["tsoAbbreviation"]
        admin["config_file_path"] = "hello"
        tso = create_new_tso(admin, db)
        update_user("company_id", tso["id"], admin["id"], "none", db)
        add_tso_to_ref_zone(tso["company"], "Europe/Berlin")
        admin["company_id"] = tso["id"]

        return jsonify(admin)
    except (NameError, SQLAlchemyError) as error:  # pylint: disable=broad-except
        error_logger(error)
        create_and_send_email(error)
        return (
            jsonify(
                {
                    "error": "something wrong in dataBASE",
                }
            ),
            401,
        )


@handle_tso.route("/configfiles/update/<tso>", methods=["POST"])
@user_is_authenticate
def create_or_update_config_file(tso):
    """Create or update a config file for a given TSO."""
    info_logger(request)
    credential = None
    if request.is_json:
        credential = request.get_json()
    else:
        return jsonify({"error": "Request does not contain JSON"}), 400

    list(credential["clients"])
    tso_name = tso
    if credential:
        path = f"./input/config_files/{tso_name}.yaml"
        try:
            with open(path, "w", encoding="utf-8") as yamlfile:
                yaml.dump(credential, yamlfile)
            get_tso = Tso.query.filter_by(company=tso_name).first()
            if get_tso:
                update_some_tso_row(get_tso.id, "config_file_path", path, db)

            return {
                "ok": 200,
            }
        except NameError as error:
            logging.error(error)
            return jsonify({"error": f"no such configfile for {tso_name}"})
    else:
        return {
            "no data provides": 500,
        }


@handle_tso.route("/configfiles/<tso_name>", methods=["GET"])
@user_is_authenticate
def read_config_file(tso_name):
    """Retrieves and returns the content of a configuration file for a given TSO"""
    info_logger(request)
    path = f"./input/config_files/{tso_name}.yaml"
    try:
        with open(path, "r", encoding="utf-8") as f:
            output = yaml.safe_load(f)
        if output:
            return output
        return None
    except NameError as error:
        print(error)
        return jsonify(
            (
                {
                    "notifications": "you do not have the necessary authorizations",
                }
            ),
            500,
        )


@handle_tso.route("/update/<tso_id>", methods=["POST"])
@user_is_authenticate
def tso_update(tso_id):
    """A function that handles the update of a TSO"""
    info_logger(request)
    if tso_id:
        # id = tso_id
        check_if_exist = Tso.query.filter_by(id=tso_id).first()
        if not check_if_exist:
            return (
                jsonify(
                    {
                        "error": "tso not found",
                    }
                ),
                404,
            )
        tso_data = check_if_exist
    print()
    # print()

    if request.files and request.files["stammdatei_file"]:
        # time.sleep(1000)
        stammdatei_file_path = save_stammdatei_file(request)
        update_some_tso_row(
            tso_data.id, "stammdatei_file_path", stammdatei_file_path, db)

    # if request.files['file']:
    #     logo_path = upload_file(request)
    #     update_some_tso_row(tso_data.id, "logo_path", logo_path, db)

    if request.form.get('tsoAbbreviation'):
        tso_data.tsoAbbreviation = request.form.get('tsoAbbreviation')
        update_some_tso_row(tso_data.id, "tsoAbbreviation",
                            tso_data.tsoAbbreviation, db)

    if request.form.get('email'):
        tso_data.email = request.form.get('email')
        update_some_tso_row(tso_data.id, "email", tso_data.email, db)

    if request.form.get('is_actif'):
        tso_data.is_actif = request.form.get('is_actif')
        update_some_tso_row(tso_data.id, "is_actif", tso_data.is_actif, db)

    if request.form.get('company'):
        tso_data.company = request.form.get('company')
        update_some_tso_row(tso_data.id, "company", tso_data.company, db)

    return jsonify({
        "id": tso_data.id,
        "logo_path": tso_data.logo_path,
        "company": tso_data.company,
        "stammdatei_file_path": tso_data.stammdatei_file_path,
        "config_file_path": tso_data.config_file_path,
        "created_at": tso_data.created_at,
        "tsoAbbreviation": tso_data.tsoAbbreviation,
        "email": tso_data.email,
        "is_actif": tso_data.is_actif,
    })


@handle_tso.route("/update/tso_logo/<tso_id>", methods=["POST"])
@user_is_authenticate
def tso_update_logo(tso_id):
    """Update the logo of a TSO (Third-Party Service Operator)."""
    info_logger(request)
    if request.files["file"]:
        logo_path = upload_file(request)
        tso = db.get_or_404(Tso, tso_id)

        if tso:
            tso.logo_path = logo_path
            db.session.commit()
            return jsonify({"id": tso.id, "logo_path": tso.logo_path}), 200
        return jsonify({"error": "this companie not found !"}), 404
    return jsonify({"error": "please provide file !"}), 404


@handle_tso.route("/delete/<tso_id>", methods=["DELETE"])
# @user_is_authenticate
def tso_delete(tso_id):
    """Deletes a TSO (Technical Support Officer) based on the provided TSO"""
    info_logger(request)
    tso_data = db.get_or_404(Tso, tso_id)

    if tso_data:
        db.session.delete(tso_data)
        db.session.commit()
        users = User.query.order_by(User.username).all()
        for user in users:
            if str(user.company_id) == str(tso_data.id):
                db.session.delete(user)
                db.session.commit()

        return jsonify({'message': 'TSO deleted successfully'}), 200

    return jsonify({"error": "this companie not found !"}), 404


@handle_tso.route("/activate/<int:tso_id>", methods=["GET"])
@user_is_authenticate
def tso_activate(tso_id):
    """Activate a TSO."""
    try:
        info_logger(request)
        tso = Tso.query.get_or_404(tso_id)

        if tso:
            if tso.is_actif:
                return jsonify({"message": "Tso is already active"}), 200
            tso.is_actif = True
            db.session.commit()
            info_logger(f"TSO activation result: {tso.is_actif}")
            return jsonify({"id": tso.id, "is_actif": tso.is_actif}), 200
        info_logger("TSO activation failed: company not found")
        return jsonify({"error": "this companie not found !"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
