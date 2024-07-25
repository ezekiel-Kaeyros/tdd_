"""functions python version."""

import os
import math
import uuid
from datetime import time as times
from datetime import datetime, timedelta
from functools import wraps
import dataclasses
import pathlib
import configparser
from itertools import groupby
import yaml
import time
from yaml.loader import SafeLoader
import pandas as pd
from werkzeug.utils import secure_filename

# from werkzeug.wrappers import Request
from passlib.hash import pbkdf2_sha256
from skimpy import clean_columns
import jwt
from flask import jsonify
from flask import request  # <- added
from flask import Flask
from src.database import User, Historicale
from src.database import Tso
from src.database import db

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
ALLOWED_EXTENSION = [".jpg", ".jpeg", ".png", ".gif"]


def find_mr_id(mrids, day, aktivierungsobjekt):
    """Function to get mrID"""
    obj = list(
        filter(
            lambda mrid: mrid["day"] == day
            and mrid["aktivierungsobjekt"] == aktivierungsobjekt,
            mrids,
        )
    )
    return obj[0]["mRID"]


def find_name(mrids, day, aktivierungsobjekt):
    """Function find colums name"""
    obj = list(
        filter(
            lambda mrid: mrid["day"] == day
            and mrid["aktivierungsobjekt"] == aktivierungsobjekt,
            mrids,
        )
    )
    return obj[0]["name"]


def incremente_hour(initial_hour):
    """Function Handle ora hours"""
    if initial_hour.hour == 23:
        hour = 0
    else:
        hour = initial_hour.hour + 1
    initial_hour = times(hour, 30)
    return initial_hour


def read_ao_code(client, path_file):
    """Function Ao code client"""
    print(client)
    try:
        ao_code_df = pd.read_excel(path_file)
        columns = ao_code_df.columns
        # print(columns)
        messy_df = pd.DataFrame(data=[], columns=columns, index=[0])
        clean_df = clean_columns(messy_df)
        ao_code_df.rename(columns=dict(zip(columns, clean_df)), inplace=True)
        ao_code_df = ao_code_df[ao_code_df["w_code"].notna()]
        return ao_code_df
    except Exception as error:  # pylint: disable=broad-except
        print(error)
        return []


def find_mrid_by_ao_code(ao_code, client):
    """Function mrID and aocode"""
    try:
        print(pathlib.Path().absolute())
        path_abs1 = pathlib.Path().absolute()
        path_file = f"{path_abs1}/input/Stammdatei_mRID_{client}.xlsx"
        if os.path.exists(path_file) is False:
            return ao_code
        ao_code_dfp = read_ao_code(client, path_file)

        if len(ao_code_dfp) == 0:
            if len(ao_code) > 0:
                return f"_{uuid.uuid4()}"
            return f"_{uuid.uuid4()}"
        dataframe = ao_code_dfp[ao_code_dfp["w_code"] != ao_code]

        m_rid = None
        for idx, _ in dataframe.iterrows():
            print(idx)
            m_rid = dataframe["m_rid"][idx]
        _x = float(m_rid)
        if math.isnan(_x) is True:
            return f"_{uuid.uuid4()}"
        return m_rid
    except Exception as error:  # pylint: disable=broad-except
        print(error)
        return ao_code


def create_user_with_password(form, database, notify_by_email):
    """Function Handle user"""
    password = form["password"]
    pass_hash = pbkdf2_sha256.hash(password)
    company_id = "none"
    role = form["role"]

    if role == 0:
        return create_super_admin(form, pass_hash, database, notify_by_email)
    tso = Tso.query.filter_by(company=form["company"]).first()
    if tso:
        company_id = str(tso.id)
    user = User(
        username=form["username"],
        company=form["company"],
        password=pass_hash,
        role=role,
        email=form["email"],
        company_id=company_id,
        is_actif=True,
    )

    database.session.add(user)
    database.session.commit()

    return {
        "username": user.username,
        "company": user.company,
        "id": user.id,
        "role": user.role,
        "email": user.email,
        "company_id": user.company_id,
        "is_actif": user.is_actif,
    }


def create_super_admin(form, pass_hash, database, notify_by_email):
    """Function Handle super admin"""
    print(notify_by_email)
    user = User(
        username=form["username"],
        company="super_admin",
        password=pass_hash,
        role=0,
        email=form["email"],
        company_id=0,
        is_actif=True,
    )

    database.session.add(user)
    database.session.commit()

    return {
        "username": user.username,
        "company": user.company,
        "id": user.id,
        "role": user.role,
        "email": user.email,
        "company_id": user.company_id,
        "is_actif": user.is_actif,
    }


def update_user(field, value, user_id, query, database):
    """Function Handle user"""
    print(query)
    print(database)
    print(field)
    user = User.query.filter_by(id=user_id).first()
    user.company_id = value
    db.session.commit()
    new_user = User.query.filter_by(company_id=value).first()

    return {
        "username": new_user.username,
        "company": new_user.company,
        "id": new_user.id,
        "role": new_user.role,
        "email": new_user.email,
        "company_id": new_user.company_id,
    }


def check_password(password, pass_hash):
    """Function Handle user"""
    return pbkdf2_sha256.verify(password, pass_hash)


def update_user_password(user_id, newpassword, database):
    """Function Handle user"""
    pass_hash = pbkdf2_sha256.hash(newpassword)
    user = User.query.filter_by(id=user_id).first()
    # user.username= 'eric mballa'
    user.password = pass_hash
    database.session.commit()
    # users = User.query.filter_by(id=user_id).first()
    return True


def update_some_row(user_id, row, newvalue, database):
    """Function Handle user"""
    user = User.query.filter_by(id=user_id).first()
    if row == "username":
        user.username = newvalue
        database.session.commit()
    if row == "email":
        user.email = newvalue
        database.session.commit()
    if row == "role":
        user.role = newvalue
        database.session.commit()
    return True


def update_some_tso_row(tso_id, row, newvalue, database):
    """Function Handle user"""
    print(row)
    tso = Tso.query.filter_by(id=tso_id).first()
    if row == "company":
        tso.company = newvalue
        database.session.commit()
    if row == "stammdatei_file_path":
        tso.stammdatei_file_path = newvalue
        database.session.commit()
    if row == "config_file_path":
        tso.config_file_path = newvalue
        database.session.commit()
    if row == "tsoAbbreviation":
        tso.tsoAbbreviation = newvalue
        database.session.commit()
    return True


def create_new_company(safe_loader, yml, data, path, config_file):
    """Function Handle tso"""
    print(data)
    arr = []
    list_dict = {}
    config_file.save(config_file.filename)
    path_csv = os.path.abspath(config_file.filename)

    client = ""
    small_name = ""
    data_f = pd.read_csv(path_csv, on_bad_lines="skip",
                         sep=";", low_memory=False)
    with open(path, "rb") as file:
        update_file = yml.load(file, Loader=safe_loader)

    # print(data_f.head())
    # time.sleep(2000)
    for column_name, column_data in data_f.items():
        if column_name == "clients":
            client = column_data.values[0]
        if column_name == "abbreviation":
            small_name = column_data.values[0]

    for column_name, column_data in data_f.items():
        if column_name == "clients":
            update_file[column_name][small_name] = client
            #   d[column_name][small_name] = client
            arr.append({"clients": small_name})
            list_dict["clients"] = small_name
        else:
            if update_file.get(column_name) is not None:
                if data_f[column_name].isnull().values.any():
                    pass
                else:
                    update_file[column_name][small_name] = column_data.values[0]
                    #    d.setdefault(column_name, small_name)
                    obj = {column_name: {small_name: column_data.values[0]}}
                    arr.append(obj)
                    list_dict[column_name] = {
                        small_name: column_data.values[0]}

            else:
                pass
    client = client.replace(" ", "")
    new_yaml_file = f"./input/config_files/{client}.yaml"
    list_dict["config_file_path"] = new_yaml_file
    list_dict["admin_tso"] = client
    with open(new_yaml_file, "w", encoding="utf-8") as file:
        yaml.safe_dump(list_dict, file)
    return list_dict


def get_company_list(safeloader, yml, path):
    """Function Handle tso"""
    #  path= './input/config_files/config.yml'
    arr = []
    with open(path, "rb", encoding="utf-8") as file:
        update_file = yml.load(file, Loader=safeloader)
    for data in update_file:
        if data == "clients":
            for key in list(update_file[data]):
                arr.append(key)
    return arr


def allowed_file(filename):
    """Function Handle file"""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file(req):
    """Function Handle file"""
    file = req.files["file"]
    if file.filename == "":
        return None
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join("./static/img/", filename))
        # return True
        return os.path.join("/static/img/", filename)
    return None


def save_stammdatei_file(req):
    """Function Handle file"""
    file = req.files["stammdatei_file"]
    if file.filename == "":
        return False
    if file.filename:
        # filename = secure_filename(file.filename)
        file.save(os.path.join("./input/", file.filename))
        return os.path.join("./input/", file.filename)
    return None


def get_path_to_yaml(email, abreviation_name=False):
    """Function Handle yaml file"""
    path = "./input/config_files/config.yaml"
    user = User.query.filter_by(email=email).first()
    if user:
        companie = ""
        if user.role == 0:
            companie = Tso.query.filter_by(
                tsoAbbreviation=abreviation_name).first()
        else:
            companie = Tso.query.filter_by(id=user.company_id).first()
        if companie is None:
            print("no company found")
            return path
        path_to_yaml = f"./input/config_files/{companie.company}.yaml"
        is_existing = os.path.exists(path_to_yaml)
        if is_existing:
            return path_to_yaml
        return path

    return path


# custom functions to get employee info
def get_level(element):
    """Function Handle level"""
    return element.get("level")


def get_all_use_case():
    """Function handle usecase"""
    arr = []
    with open("case.yaml", "rb") as file:
        use_case_file = yaml.load(file, Loader=SafeLoader)
    for case in use_case_file:
        use_case_file[case]["name"] = case
        arr.append(use_case_file[case])
    arr = sorted(arr, key=key_func)
    groupby(arr, key_func)
    for value in arr:
        for x in value["action"]:
            print(x)
    #  print(list(value))
    return arr


# define a function for key
def key_func(k):
    """Function"""
    return k["level"]


def create_new_tso(form, database):
    """Function Handle tso"""
    tso = Tso(
        logo_path=form["logo_path"],
        stammdatei_file_path=form["stammdatei_file_path"],
        company=form["company"],
        email=form["email"],
        tsoAbbreviation=form["tsoAbbreviation"],
        config_file_path="hello",
        is_actif=True,
    )
    # print(tso)
    database.session.add(tso)
    database.session.commit()
    return {
        "logo_path": tso.logo_path,
        "company": tso.company,
        "email": form["email"],
        "tsoAbbreviation": tso.tsoAbbreviation,
        "id": tso.id,
        "is_actif": tso.is_actif,
    }


def decode_token(req, secret_key):
    """Function Handle token"""
    data = req.get_json()
    token = data["token"]
    print(secret_key)
    # secret_key= current_app.config["Encoding_Key"]
    return jwt.decode(token, "hello", algorithms=["HS256"])


def is_authenticate(req):
    """Function Handle user"""
    header = req.headers.get("Authorization")
    if header:
        token = header.split(" ")[1]
        try:
            data = jwt.decode(token, "tdd_app_token", algorithms=["HS256"])
            if data:
                return data
            return False

        except ImportError as err:
            print(err)
            return False
    return False


def notification(req, body, get_socketio, send_email=None, email=None):
    """Function"""
    found = {}
    if email:
        found = User.query.filter_by(email=email).first()
    else:
        data = is_authenticate(req)
        found = User.query.filter_by(id=data["id"]).first()

    # tso = Tso.query.filter_by(company=found.company_id).first()
    if found:
        notifi = Historicale(
            body=body, user_id=found.id, tso=found.company_id, read=False
        )

        db.session.add(notifi)
        db.session.commit()

        notifie = {
            "created_at": str(notifi.created_at),
            "body": notifi.body,
            "id": notifi.id,
            "user_id": notifi.user_id,
            "tso": notifi.tso,
            "read": notifi.read,
        }

        get_socketio().emit("new-notification" + found.company_id, notifie)
        get_socketio().emit("new-notification" + "all", notifie)
        # if send_email:
        #     send_email(notifi.body)
        return notifi
    return False


@dataclasses.dataclass
class Middleware:
    """Class"""

    app: Flask

    def __call__(self, environ, start_response):
        return self.app(environ, start_response)


# custom decorator to validate symbol


def token_valid(func):
    """Function"""

    @wraps(func)
    def decorated_function(*args, **kwargs):  # <- removed symbol arg
        # <- paramter is in the request object
        token = request.get_json()["token"]
        if not token:
            return jsonify({"status": "fail"}), 404
        return func(*args, **kwargs)

    return decorated_function


def user_is_authenticate(func):
    """Function"""

    @wraps(func)
    def decorated_function(*args, **kwargs):  # <- removed symbol arg
        header = request.headers.get("Authorization")

        if header:
            token = header.split(" ")[1]
            try:
                data = jwt.decode(token, "tdd_app_token", algorithms=["HS256"])
                if data:
                    print(data)
                    # time.sleep(3000)
                    return func(*args, **kwargs)
            except Exception as error:  # pylint: disable=broad-except
                return jsonify({"status": [f'something wrong with {error}']}), 400
        return (
            jsonify(
                {"error": ["Authorization header not found in the request header!"]}),
            400,
        )

    return decorated_function


def allow_download(func):
    """Function"""

    @wraps(func)
    def decorated_function(*args, **kwargs):
        args = request.args
        token = args["token"]

        try:
            data = jwt.decode(token, "tdd_app_token", algorithms=["HS256"])

            if data:
                return func(*args, **kwargs)
            return jsonify({"status": "authentication34 failed"}), 404

        except:  # pylint: disable=bare-except
            return jsonify({"status": "authentication37 failed"}), 404

    return decorated_function


def refresh_token(func):
    """Function"""

    @wraps(func)
    def decorated_function(*args, **kwargs):  # <- removed symbol arg
        header = request.headers.get("Authorization")

        if header:
            token = header.split(" ")[1]
            try:
                data = jwt.decode(token, "tdd_app_token", algorithms=["HS256"])
                if data:
                    found = User.query.filter_by(id=data["public_id"]).first()
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
                        return jsonify({"token": token}), 200
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
                    return jsonify({"token": token}), 200

                return jsonify({"status": False}), 404

            except:  # pylint: disable=bare-except
                return jsonify({"status": "authentication failed!"}), 404
        return (
            jsonify(
                {"error": "Authorization header not found in the request header!"}),
            404,
        )

    return decorated_function


def add_tso_config_ini():
    """Function"""
    path = "./docs/config.ini"
    config = configparser.ConfigParser()
    config.read(path)
    # print(config['DEFAULT']['path'])     # -> "/path/name/"
    config["DEFAULT"]["path"] = "/var/shared/"  # update
    config["OUTPUT"]["50Hertz"] = "some.csv"  # create

    with open(path, "w", encoding="utf-8") as configfile:  # save
        config.write(configfile)


def add_tso_to_ref_zone(tso, zone):
    """Function"""
    path = "./input/config_files/refzone.yaml"

    with open(path, "rb") as file:
        cur_yaml = yaml.safe_load(file)
        cur_yaml["Time_zone_tso"].update({tso: zone})

    if cur_yaml:
        with open(path, "w", encoding="utf-8") as yamlfile:
            yaml.safe_dump(cur_yaml, yamlfile)  # Also note the safe_dump


def get_tso_abbrevition(tsoname):
    """Function"""
    tso = Tso.query.filter_by(company=tsoname).first()

    if tso:
        return tso.tsoAbbreviation
    return False
