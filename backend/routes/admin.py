"""Module providing a functions python version."""
import yaml
from yaml.loader import SafeLoader
from flask import session, redirect, request, render_template, jsonify, Blueprint
from logger.log import create_and_send_email, info_logger, error_logger
from src.utils import get_path_to_yaml
from src.app_loader import get_socketio
from src.database import db, User
from src.utils import (
    user_is_authenticate,
)

admin_module = Blueprint(
    "admin", __name__, url_prefix="/admin", template_folder="templates"
)
admin = admin_module


@admin.route("/get/<user_id>", methods=["GET"])
@user_is_authenticate
def user_auth_func(userid):
    """decorator"""
    info_logger(request)
    if not session.get("name"):
        print("no name ")
        return redirect("/")
    user = db.get_or_404(User, userid)
    if user.role == 2:
        return redirect("/")

    users = db.session.execute(
        db.select(User).order_by(User.username)).scalars()
    filtered = []
    for _user in users:
        if _user.company == user.company:
            filtered.append(_user)

    return render_template("admin.html", users=filtered)


@admin.route("/super_admin")
@user_is_authenticate
def start():
    """dcecorator"""
    info_logger(request)
    if not session.get("name"):
        get_socketio().emit(f"session-false-{request.args.get('email')}")
        print(444)
        return redirect("/")
    user = User.query.filter_by(email=session.get("name")).first()

    if user:
        path = get_path_to_yaml(session.get("name"))

        if user.role == 1:
            with open(path, "rb") as file:
                data = yaml.load(file, Loader=SafeLoader)
            users = db.session.execute(
                db.select(User).order_by(User.username)
            ).scalars()
            userslist = []
            company = request.args.get("company")
            print(users)
            for user in users:
                if user.company == company:
                    userslist.append(user)
            return render_template(
                "dashboard.html", configfile=list(data.keys()), users=userslist
            )
        if user.role == 0:
            url = f"/admin/get/{user.id}"
            return redirect(url)
    return redirect("/")


@admin.route("/tso/getconfig", methods=["POST"])
@user_is_authenticate
def get_config():
    """cached data."""
    info_logger(request)
    if not session.get("name"):
        get_socketio().emit(f"session-false-{request.args.get('email')}")
    #   return redirect("/")
    path = get_path_to_yaml(session.get("name"))
    target = request.form.get("config_key")

    if "cached_data" not in session:
        with open(path, "rb") as file:
            data = yaml.load(file, Loader=SafeLoader)
            session["cached_data"] = data
    else:
        data = session["cached_data"]
    arr = []

    for k, item in data.items():
        if k == target:
            arr.append(item)
    return jsonify(arr)


@admin.route("/tso/update_config", methods=["POST"])
@user_is_authenticate
def update_config():
    """configuration"""
    info_logger(request)

    if not session.get("name"):
        return redirect("/")

    try:
        data = request.get_json()
        key = request.args.get("key")
        path = get_path_to_yaml(session.get("name"))

        with open(path, "r+b") as file:
            update_file = yaml.safe_load(file)
            update_file[key] = data
            file.seek(0)
            yaml.safe_dump(update_file, file, sort_keys=False)
            file.truncate()

        return jsonify(update_file[key])

    except FileNotFoundError as error:
        error_logger(error, "ADMIN")
        create_and_send_email(error, "ADMIN")
        return "File not found error"

    except yaml.YAMLError as error:
        error_logger(error, "ADMIN")
        create_and_send_email(error, "ADMIN")
        return "YAML error"
