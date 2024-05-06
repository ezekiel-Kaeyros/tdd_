"""Module providing a functions python version."""
from sqlalchemy.exc import SQLAlchemyError
from flask import request, jsonify, Blueprint
from logger.log import create_and_send_email, info_logger, error_logger, notify_by_email
from src.utils import create_user_with_password
from src.database import User
from src.database import db
from src.utils import (
    update_some_row,
    is_authenticate,
    notification,
    user_is_authenticate,
    get_tso_abbrevition,
    update_user_password,
)
from src.app_loader import get_socketio

handle_user = Blueprint(
    "user", __name__, url_prefix="/users", template_folder="templates"
)
user = handle_user


@user.get("/")
@user_is_authenticate
def user_list():
    """Function Handle user"""
    info_logger(request)
    users = User.query.order_by(User.username).all()
    result = []

    if is_authenticate(request)["role"] == 2:
        return jsonify(
            (
                {
                    "notifications": "you do not have the necessary authorizations",
                }
            ),
            404,
        )

    for x in users:
        tso_abbreviation = "not found"
        if get_tso_abbrevition(x.company):
            tso_abbreviation = get_tso_abbrevition(x.company)

        us = {
            "username": x.username,
            "id": x.id,
            "company": x.company,
            "role": x.role,
            "email": x.email,
            "is_actif": x.is_actif,
            "tsoAbbreviation": tso_abbreviation,
        }
        result.append(us)
    return jsonify(
        {
            "usersList": result,
        }
    )


@user.get("/<user_id>")
@user_is_authenticate
def user_detail(user_id):
    """Function Handle user Auth"""
    info_logger(request)

    us = db.get_or_404(User, user_id)
    if us:
        return jsonify(
            {
                "username": us.username,
                "id": us.id,
                "company": us.company,
                "role": us.role,
                "email": us.email,
                "is_actif": us.is_actif,
            }
        )
    return (
        jsonify(
            {
                "error": "user not found",
            }
        ),
        409,
    )


@user.route("/create", methods=["POST"])
@user_is_authenticate
def user_create():
    """Function Handle user Auth"""
    info_logger(request)

    if request.method == "POST":
        email = request.get_json()["email"]
        check_email = User.query.filter_by(email=email).first()
        if check_email:
            send_error("email exist please provide another one")
        if not request.get_json()["password"]:
            send_error("password is required")
        if len(request.get_json()["password"]) < 8:
            send_error("password must be at least 8 characters")
        if not request.get_json()["username"]:
            send_error("username is required")
        try:
            new_user = create_user_with_password(
                request.get_json(), db, notify_by_email
            )
            return jsonify(
                {
                    "new user": new_user,
                }
            )

        except NameError as error:
            create_and_send_email(error, "Users")
            error_logger(error, "Users")

        except SQLAlchemyError as error:
            create_and_send_email(error, "Users")
            error_logger(error, "Users")
            return (
                jsonify(
                    {
                        "error": "something wrong in dataBASE",
                    }
                ),
                500,
            )
        except Exception as error:  # pylint: disable=broad-except
            error_logger("somenthing wrong in database")
            return (
                jsonify(
                    {
                        "error": "something wrong in dataBASE",
                    }
                ),
                500,
            )

    return (
        jsonify(
            {
                "error": "something wrong",
            }
        ),
        500,
    )


@user.post("/super-admin")
def super_admin_create():
    """Function Handle user Admin"""
    info_logger(request)

    if request.method == "POST":
        email = request.get_json()["email"]
        check_email = User.query.filter_by(email=email).first()

        if check_email:
            return (
                jsonify(
                    {
                        "error": "email exist please provide another one",
                    }
                ),
                404,
            )
        try:
            new_user = create_user_with_password(
                request.get_json(), db, notify_by_email
            )

            return jsonify(
                {
                    "new user": new_user,
                }
            )
        except NameError as error:
            create_and_send_email(error, "Users")
            error_logger(error, "Users")
        except SQLAlchemyError as error:
            create_and_send_email(error, "Users")
            error_logger(error, "Users")
            return (
                jsonify(
                    {
                        "error": "something wrong",
                    }
                ),
                402,
            )
        except Exception as error:  # pylint: disable=broad-except
            error_logger("somenthing wrong in database")
            return (
                jsonify(
                    {
                        "error": "something wrong in dataBASE",
                    }
                ),
                500,
            )
    return (
        jsonify(
            {
                "error": "bad request",
            }
        ),
        500,
    )


@user.route("/update/<user_id>", methods=["POST"])
@user_is_authenticate
def password_update(user_id):
    """Function Handle user Credentials"""
    info_logger(request)
    if is_authenticate(request):
        credential = request.get_json()
        if credential["new_email"]:
            email = credential["new_email"]
            check_email = User.query.filter_by(email=email).first()
            if check_email:
                return (
                    jsonify(
                        {
                            "error": "email exist please provide another one",
                        }
                    ),
                    404,
                )
        user_data = User.query.filter_by(id=user_id).first()
        verify = True
        if verify:
            for val in credential.keys():
                if val in ("oldpassword", "newpassword"):
                    upd = update_user_password(
                        user_data.id, credential["newpassword"], db
                    )
                    print(upd)
                elif val in ("new_email"):
                    update_some_row(user_data.id, "email",
                                    credential["new_email"], db)

                    notification(
                        request,
                        f"update {user_data} email value",
                        get_socketio,
                        notify_by_email,
                    )

                elif val in ("email"):
                    pass
                else:
                    update_some_row(user_data.id, val, credential[val], db)
                    notification(
                        request,
                        f"update {user_data} {credential[val]}",
                        get_socketio,
                        notify_by_email,
                    )
            return (
                jsonify(
                    {
                        "message": "Updated successfully",
                    }
                ),
                200,
            )
        for val in credential.keys():
            update_some_row(user_data.id, val, credential[val], db)

        return (
            jsonify(
                {
                    "message": "Updated successfully",
                }
            ),
            200,
        )
    return {
        "user not authenticate": 500,
    }


@user.route("/delete/<user_id>", methods=["POST"])
@user_is_authenticate
def user_delete(user_id):
    """Function Handle user"""
    info_logger(request)

    user_data = User.query.filter_by(id=user_id).first()

    if request.method == "POST":
        print(user_data)
        # print(user_data.is_actif)
        # time.sleep(2000)
        user_data.is_actif = False
        db.session.commit()
        notification(request, "delete", get_socketio, notify_by_email)
        return (
            jsonify(
                {
                    "id": user_data.id,
                    "name": user_data.username,
                    "is_actif": user_data.is_actif,
                }
            ),
            200,
        )
    return jsonify(
        {
            "error": "invalid method request",
        }
    )


@user.post("/reset/password/<email>")
@user_is_authenticate
def reset_password(email):
    """Function Handle user Password"""
    info_logger(request)

    user_data = User.query.filter_by(email=email).first()

    if user_data:
        notification(
            request,
            f"user: {user_data.username}, id: {user_data.id} want to reset password",
            get_socketio,
            notify_by_email,
            user_data.email,
        )
        return (
            jsonify(
                {
                    "succesful": "waiting for you admin confirmation",
                }
            ),
            200,
        )
    return (
        jsonify(
            {
                "error": "user not found iwith this email",
            }
        ),
        204,
    )


@user.route("/activate/<userid>", methods=["POST"])
@user_is_authenticate
def user_activate(user_id):
    """Function Handle user Auth"""
    info_logger(request)
    user_data = db.get_or_404(User, user_id)

    if user_data:
        user_data.is_actif = True
        db.session.commit()
        return jsonify(
            {
                "id": user_data.id,
                "name": user_data.username,
                "is_actif": user_data.is_actif,
            }
        )
    return jsonify({"error": "user not found"}), 404


def send_error(msg):
    """Function to send error"""
    return jsonify({"error": msg}), 404
