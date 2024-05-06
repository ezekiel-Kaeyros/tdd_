"""Module providingFunction to created tso."""
from flask_marshmallow import Marshmallow
from marshmallow import fields
from flask import request, jsonify, Blueprint
from logger.log import info_logger
from src.utils import user_is_authenticate, is_authenticate
from src.database import db, Historicale, Tso

notification_module = Blueprint(
    "notification", __name__, url_prefix="/notification", template_folder="templates"
)

ma = Marshmallow()


class HistoricaleSchema(ma.Schema):
    """Class representing a Historicale"""

    created_at = fields.DateTime()
    body = fields.String()
    id = fields.Integer()
    user_id = fields.Integer()
    tso = fields.Integer()


@notification_module.get("/")
@user_is_authenticate
def get_notification():
    """
    Get the notifications for the authenticated user.
    """
    info_logger(request)

    user = is_authenticate(request)

    tso = []
    notifi = []
    if user:
        if user["role"] == 1:
            tso = get_tso_by_user_id(user.get("company_id"))
            notifi = get_notifications_by_tso_id(tso.id)
        elif user["role"] == 0:
            notifi = get_all_notifications()
        else:
            return (
                jsonify(
                    {
                        "notifications": "Invalid user role",
                    }
                ),
                404,
            )

        result = serialize_notifications(notifi)

        return jsonify(
            {
                "notifications": result,
            }
        )
    return (
        jsonify(
            {
                "notifications": "you do not have the necessary authorizations",
            }
        ),
        404,
    )


def get_tso_by_user_id(user_id):
    """
    Get the TSO by user ID.
    """
    return Tso.query.filter_by(id=user_id).first()


def get_notifications_by_tso_id(tso_id):
    """
    Get the notifications by TSO ID.
    """
    return Historicale.query.filter_by(tso=tso_id).order_by("created_at").all()


def get_all_notifications():
    """
    Get all notifications.
    """
    return Historicale.query.order_by("created_at").all()


def serialize_notifications(notifications):
    """Serialize the notifications"""
    schema = HistoricaleSchema(many=True)
    return schema.dump(notifications)


class NotificationSchema(ma.Schema):
    """Class representing a Notification"""

    created_at = fields.String(required=True)
    body = fields.String(required=True)
    id = fields.Integer(required=True)
    user_id = fields.Integer(required=True)
    tso = fields.Integer(required=True)
    read = fields.Boolean(required=True)


notification_schema = NotificationSchema(many=True)


@notification_module.get("/all")
@user_is_authenticate
def get_all_notification():
    """
    Get all notifications.

    Returns:
        tuple: A tuple containing the JSON response and the status code.
    """
    info_logger(request)
    notifi = Historicale.query.order_by("created_at").all()
    result = notification_schema.dump(notifi)
    return (
        jsonify(
            {
                "notifications": result,
            }
        ),
        200,
    )


@notification_module.route("/update/<notification_id>", methods=["POST"])
@user_is_authenticate
def user_activate(notification_id):
    """Function to update a notification"""
    info_logger(request)
    notification = Historicale.query.get_or_404(notification_id)
    notification.read = True
    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"error": "Failed to save changes to the database"}), 500
    return (
        jsonify(
            {
                "read": notification.read,
            }
        ),
        200,
    )
