import logging
from pathlib import Path

formatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s"
)


def setup_logger(name, log_file, level=logging.DEBUG):
    my_file = Path(log_file)

    if my_file.is_file():
        if len(logging.getLogger(name).handlers) > 0:
            return logging.getLogger(name)
        else:
            handler = logging.FileHandler(log_file, mode="a")
            handler.setFormatter(formatter)
            logger = logging.getLogger(name)
            logger.setLevel(level)
            logger.addHandler(handler)
            logger.propagate = False
            return logger
    else:
        handler = logging.FileHandler(log_file, mode="a")
        handler.setFormatter(formatter)

        logger = logging.getLogger(name)
        logger.setLevel(level)
        logger.addHandler(handler)
        logger.propagate = False
        return logger
