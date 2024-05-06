"""Module providingFunction printing python version."""
import os
from flask import Flask
from flask_mail import Mail
from flask_socketio import SocketIO
from flask_cors import CORS
from src.utils import Middleware

cache = {}


# this is global variable help us to share context off app between request and function
# app = {}
def create_app():
    """Function create app."""
    app = Flask(__name__, template_folder="../templates",
                static_folder="../static")
    app.config["SECRET_KEY"] = os.environ.get("APP_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    app.config["MAIL_SERVER"] = "smtp.ionos.de"
    app.config["MAIL_PORT"] = 465
    app.config["MAIL_USERNAME"] = "rostand.nitcheu@kaeyros-analytics.de"
    app.config["MAIL_PASSWORD"] = "rentable-sub-finalize-tyburn"
    app.config["MAIL_USE_TLS"] = False
    app.config["MAIL_USE_SSL"] = True
    app.config["Encoding_Key"] = "hello"
    app.wsgi_app = Middleware(app.wsgi_app)
    socketio = SocketIO(app, cors_allowed_origins="*")
    cache["app"] = app
    CORS(app)
    cors = CORS(app, resource={
        r"/*": {
            "origins": "*"
        }})
    cache["socketio"] = socketio
    return app


def get_me():
    """Function return cache list"""
    return cache


def get_app():
    """Function return mail instance."""
    mail = Mail(cache["app"])
    return mail


def get_socketio():
    """Function return socket io instance to send notification."""
    socketio = cache["socketio"]
    return socketio
