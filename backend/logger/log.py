"""Module providingFunction to create log file and send error via email to developper team."""
from flask_mail import Message
from logger.logger_setup import setup_logger
from src.app_loader import get_app


def create_and_send_email(mes, module_name="unknown"):
    """send error when occured via mail to developper teams."""
    print(mes)
    mail = get_app()
    send_to = [
        "eric2mballa@gmail.com",
        "patrice.kwemo@kaeyros-analytics.de",
        "ariel.mboma@kaeyros-analytics.com",
        "thierry.monthe@kaeyros-analytics.com",
    ]
    send_to = ["eric2mballa@gmail.com"]
    location = "In Module" + module_name
    msg = Message(
        "TDD APP MESSAGE ERROR LOG TEST!" + location,
        sender="info@kaeyros-analytics.de",
        recipients=send_to,
    )
    msg.body = str(mes)
    mail.send(msg)
    return True


def notify_by_email(body):
    """send error when occured via mail to developper teams."""
    print(body)
    mail = get_app()
    send_to = [
        "eric2mballa@gmail.com",
        "patrice.kwemo@kaeyros-analytics.de",
        "ariel.mboma@kaeyros-analytics.com",
        "thierry.monthe@kaeyros-analytics.com",
    ]
    send_to = ["eric2mballa@gmail.com"]
    msg = Message(
        "TDD APP NOTIFICATION PLEASE CHECK THAT",
        sender="info@kaeyros-analytics.de",
        recipients=send_to,
    )
    msg.body = str(body)
    mail.send(msg)
    return True


def info_logger(request):
    """write info log to info_logger file."""
    log_location = "Info_"
    logger = setup_logger(__name__, log_location + __name__)
    logger.info(str(request.url))
    return "1"


def error_logger(error, module_name="unknown"):
    """write log to error log file."""
    log_location = "Error_" + module_name
    logger = setup_logger(__name__, log_location + __name__)
    logger.error(str(error))
    return "1"
