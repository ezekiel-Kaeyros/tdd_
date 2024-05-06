"""Module providingFunction to interact with system os."""
import os
import configparser
from flask_migrate import Migrate
from dotenv import load_dotenv
from src.database import db
from src.app_loader import create_app
from src.app_loader import get_socketio
from flask_session import Session
from routes.company import handle_tso
from routes.builder import builder
from routes.user import handle_user
from routes.admin import admin_module
from routes.auth import authentication
from routes.usecase import use_case_module
from routes.notification import notification_module
from routes.sftp import sftp

from logger.log import create_and_send_email, error_logger

# from flask_request_params import bind_request_params

UPLOAD_FOLDER = "/static/img/"
load_dotenv()

# create and get app function
app = create_app()
app.config["SECRET_KEY"] = os.environ.get("APP_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")


db.app = app
migrate = Migrate(app, db)
db.init_app(app)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# app.before_request(bind_request_params)
Session(app)
with app.app_context():
    db.create_all()
migrate = Migrate(app, db)

migrate.init_app(app, db, command="migrate")
# get elements from config ini
config = configparser.ConfigParser()
socketio = get_socketio()


# app.register_blueprint(home)
app.register_blueprint(handle_tso)
app.register_blueprint(builder)
app.register_blueprint(handle_user)
app.register_blueprint(admin_module)
app.register_blueprint(authentication)
app.register_blueprint(notification_module)
app.register_blueprint(use_case_module)

get_socketio().emit("test", 1)


def start():
    """This Function Load app"""
    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=5000, debug=True)
        socketio.run(app)


try:
    start()
except Exception as e:  # pylint: disable=broad-except
    error_logger(e, "Builder_Module")
    create_and_send_email(e, "Builder_Module")
