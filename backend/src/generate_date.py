"""functions python version."""
import datetime
from datetime import timedelta
from datetime import datetime
import time
import pytz


def build_min_date(date_list, time_zone):
    """Function to get min date."""
    arr = []

    for index, dateti in enumerate(date_list):  # pylint: disable=unused-variable
        dateti = str(dateti).strip()
        d = dateti.split(" ")
        start = d[0]
        t = d[1].split(":")
        if len(t) >= 3:
            t.pop()
            t = ":".join(t)
            if len(t.split(":")) <= 2:
                t = t + ":00"
                dateti = start + " " + t
            dateti = start + " " + t
        try:
            dateti = dateti.replace(".", "/")
            datetime_obj = generate_date(dateti)
        except ValueError as e:
            print(dateti)
            print(t)
            print("generate date error line 34 #########################")
            time.sleep(3000)

        # checking timezone information

        # Listing all available time zones
        # zones = pytz.all_timezones

        # defining the required timezone
        # 'Europe/Berlin'

        # utc_dt = datetime(2002, 10, 27, 6, 0, 0, tzinfo=utc)
        # loc_dt = utc_dt.astimezone(eastern)

        local_tz = pytz.timezone(time_zone)
        # localising the datetime object to the timezone
        datetime_obj_local_tz = local_tz.localize(datetime_obj)
        utc_tz = pytz.timezone("UTC")
        datetime_obj_utc = datetime_obj_local_tz.astimezone(utc_tz)
        # datetime_obj_utc = datetime_obj_utc + timedelta(minutes=30)
        arr.append(str(datetime_obj))
        # arr.append(str(datetime_obj_utc))
    return min(arr)


def build_max_date(date_list, time_zone):
    """Function to get max date."""
    # "19.12.2022 07:59:02"
    # create a datetime-object using the string-format from WV-file
    #
    arr = []
    for index, dateti in enumerate(date_list):  # pylint: disable=unused-variable
        dateti = str(dateti).strip()
        d = dateti.split(" ")
        start = d[0]
        t = d[1].split(":")
        if len(t) >= 3:
            t.pop()
            t = ":".join(t)
            if len(t.split(":")) <= 2:
                t = t + ":00"
                dateti = start + " " + t
            dateti = start + " " + t
        try:
            dateti = dateti.replace(".", "/")
            datetime_obj = generate_date(dateti)
        except ValueError as e:
            print(e)
            print(t)
            print("generate date error line 86 #########################")
            time.sleep(3000)
        local_tz = pytz.timezone(time_zone)
        # localising the datetime object to the timezone
        datetime_obj_local_tz = local_tz.localize(datetime_obj)
        #    print(datetime_obj_local_tz)
        utc_tz = pytz.timezone("UTC")
        datetime_obj_utc = datetime_obj_local_tz.astimezone(utc_tz)
        # datetime_obj_utc = datetime_obj_utc + timedelta(minutes=30)
        arr.append(str(datetime_obj))
        # arr.append(str(datetime_obj_utc))

    return max(arr)


def generate_date(date_string):
    """Function to genarate date."""

    # "19.12.2022 07:59:02"
    # create a datetime-object using the string-format from WV-file
    date_string1 = date_string.replace(".", "/")
    date_string1 = date_string.replace("-", "/")
    # arr1= date_string1.split("/")
    # if len(arr1[0]) == 4:
    #     date_string1 = arr1[2] + "/" + arr1[1] + "/" + arr1[0]

    arr = date_string1.split(" ")

    if len(arr[1]) == 5:
        date_string1 = arr[0] + " " + arr[1] + ":" + "00"
    if len(date_string1.split(" ")[0].split("/")[0]) == 4:
        dat = date_string1.split(" ")
        dat1 = dat[0].split('/')
        date_string1 = dat1[2] + "/" + dat1[1] + "/" + dat1[0] + " " + dat[1]

    try:
        # print('hello enter with ===>', date_string1)
        # # date_string1= '02/11/2022 00:00:00'
        # print(date_string1)

        datetime_obj = datetime.strptime(
            f"{date_string1}", "%d/%m/%Y %H:%M:%S")

        return datetime_obj
    except NameError as e:
        print(e)
        time.sleep(30000)
    return None
    #   time.sleep(20000) 02/11/2022 06:00   04.12.2022 02:00  02.11.2022 06:00
