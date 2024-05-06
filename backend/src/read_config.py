"""Module providing a function."""
import configparser
import os


def check_clean_inputpath(inputpath):
    """Function to clean path."""
    # remove " and ' from path
    inputpath = inputpath.replace('"', "")
    inputpath = inputpath.replace("'", "")

    # raise a TypeError if it's not an excel file
    if not (
        inputpath.endswith(".xls")
        or inputpath.endswith(".xlsx")
        or inputpath.endswith(".xlsm")
    ):
        print(inputpath)
        raise TypeError("Provided Input File not an Excel file!")

    return inputpath


def check_clean_outputpath(outputpath):
    """Function to clean outputpath."""
    # remove " and ' from path
    outputpath = outputpath.replace('"', "")
    outputpath = outputpath.replace("'", "")

    # append "\\" if the path does not end with "/" or "\\"
    if not (outputpath.endswith("\\") or outputpath.endswith("/")):
        outputpath += "\\"

    # raise a TypeError if the provided filepath is not
    # a directory
    if not os.path.isdir(outputpath):
        msg = "Provided output directory "
        msg += f"'{outputpath}' is not a directory!"
        raise TypeError(msg)

    return outputpath


def check_clean_filename(filename):
    """Function to clean filename."""
    # remove " and ' from path
    filename = filename.replace('"', "")
    filename = filename.replace("'", "")

    # add ".xml" if the filename does not end with it
    if not filename.endswith(".xml"):
        filename += ".xml"

    # raise a ValueError if there are forbidden characters in
    # the filename
    if ("<" or ">" or ":" or '"' or "/" or "\\" or "|" or "?" or "*") in filename:
        msg = f"Illegal character in output filename {filename}"
        raise ValueError(msg)

    return filename


def read_config():
    """Function to read config."""
    # read the config
    config = configparser.ConfigParser()
    config.read("./docs/config.ini")

    # get the inputpath, check and clean it
    inputpath = config["INPUT"]["INPUTPATH"]
    inputpath = check_clean_inputpath(inputpath)

    # get the outputpath, check and clean it
    outputpath = config["OUTPUT"]["OUTPUTPATH"]
    outputpath = check_clean_outputpath(outputpath)

    # empty list to store filenames in
    filenames = []

    # for each filename
    for key in config["OUTPUT"]:
        # ignore if it's the outputpath
        if key == "outputpath":
            continue
        # read the filename, check and clean it
        filename = config["OUTPUT"][key]
        if not filename:
            continue
        filename = check_clean_filename(filename)

        # append filename to list of filenames
        filenames.append(filename)

    return inputpath, outputpath, filenames
