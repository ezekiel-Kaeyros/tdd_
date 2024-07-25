"""Module providing a functions python version."""
from datetime import datetime, timedelta
from flask import session, redirect, request, jsonify, Blueprint
import jwt
import sys
import traceback
from logger.log import info_logger
from src.database import User, Tso
from src.utils import check_password

from src.utils import refresh_token

authentication = Blueprint(
    "auth", __name__, url_prefix="/auth", template_folder="templates"
)
auth = authentication


@auth.route("/login", methods=["POST"])
def user_login():
    """Authenticates"""
    info_logger(request)
    user = request.get_json()

    try:
        found = User.query.filter_by(email=user["email"]).first()
        if not found.is_actif:
            return (
                jsonify(
                    {
                        "error": "authentification fail this user is not activated",
                    }
                ),
                401,
            )

        if check_password(user["password"], found.password):
            session["name"] = found.email
            abbreviation = "ABB"
            if found.role == 0:
                token = jwt.encode(
                    {
                        "id": found.id,
                        "exp": datetime.utcnow() + timedelta(minutes=90),
                        "username": found.username,
                        "email": found.email,
                        "company": "superadmin",
                        "role": found.role,
                        "company_id": "21",
                        "tsoAbbreviation": "superadmin",
                    },
                    "tdd_app_token",
                    algorithm="HS256",
                )
                res = {
                    "username": found.username,
                    "id": found.id,
                    "company": "superadmin",
                    "role": found.role,
                    "email": found.email,
                    "token": token,
                    "tsoAbbreviation": "superadmin",
                    "company_id": "21",
                }
                return jsonify(res)
            tso = Tso.query.filter_by(company=found.company).first()
            abbreviation = tso.tsoAbbreviation
            token = jwt.encode(
                {
                    "id": found.id,
                    "exp": datetime.utcnow() + timedelta(minutes=90),
                    "username": found.username,
                    "email": found.email,
                    "company": found.company,
                    "role": found.role,
                    "company_id": found.company_id,
                    "tsoAbbreviation": abbreviation,
                },
                "tdd_app_token",
                algorithm="HS256",
            )
        res = {
            "username": found.username,
            "id": found.id,
            "company": found.company,
            "role": found.role,
            "email": found.email,
            "token": token,
            "tsoAbbreviation": abbreviation,
            "company_id": found.company_id,
        }
        return jsonify(res)
    except Exception:  # pylint: disable=broad-except
        e = sys.exc_info()
        traceback.print_tb(e[2], None, sys.stdout)
        # time.sleep(5000)
        # error_logger(error, "Builder_Module")
        # create_and_send_email(str(error), "Builder_Module")

    return (
        jsonify(
            {
                "error": "authentification fail",
            }
        ),
        401,
    )


@auth.route("/refresh", methods=["POST", "GET"])
@refresh_token
def login():
    """A function that handles"""
    info_logger(request)


@auth.route("/logout")
def logout():
    """Logs the user"""
    info_logger(request)
    session["name"] = None
    return redirect("/")
