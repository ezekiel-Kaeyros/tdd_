"""functions python version."""
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
# create the extension
db = SQLAlchemy()


# migrate= Migrate(db)
class User(db.Model):  # pylint: disable=too-few-public-methods
    """
    This class create user for tso
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    role = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    password = db.Column(db.String(100))
    email = db.Column(db.String(80), unique=True)
    company_id = db.Column(db.String(100), nullable=False)
    is_actif = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        # pylint: disable=line-too-long
        return f"user: {self.username}, {self.company}, {self.id}, {self.role}, {self.company_id}, {self.company}"


class Tso(db.Model):  # pylint: disable=too-few-public-methods
    """This class create Tso"""

    id = db.Column(db.Integer, primary_key=True)
    logo_path = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    stammdatei_file_path = db.Column(db.String(100), nullable=False)
    config_file_path = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    tsoAbbreviation = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    is_actif = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f"tso: {self.logo_path}, {self.company}, {self.id}, {self.stammdatei_file_path}"


class Historical(db.Model):  # pylint: disable=too-few-public-methods
    """
    Class for notification
    """

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    body = db.Column(db.Text(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    tso = db.Column(db.Integer, nullable=False)


class Historicale(db.Model):  # pylint: disable=too-few-public-methods
    """
    Class for notification
    """

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    body = db.Column(db.Text(), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    tso = db.Column(db.Integer, nullable=False)
    read = db.Column(db.Boolean, nullable=False)
