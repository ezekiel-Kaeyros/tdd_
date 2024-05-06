"""Module to create power time point."""

import uuid
from datetime import time
import time as t
import math
import numpy as np
import pandas as pd
from src.utils import incremente_hour


def create_power_time_point(
    row, power_schedule
):  # pylint: disable=too-many-locals, too-many-statements
    """Function."""
    power_time_point = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0

    np.seterr(divide="ignore", invalid="ignore")

    initial_hour = time(23, 30)

    for i in range(1, 101, 4):
        initial_hour = incremente_hour(initial_hour)

        leistung = row["leistung_" + str(i): "leistung_" + str(i + 3)]
        leistung = leistung.replace(",", ".", regex=True)
        leistung = leistung.astype("float")
        sum_leistung = leistung.sum()
        if sum_leistung == 0.0:
            pass
        else:
            mrid = str(uuid.uuid4())
            power_time_point.at[index_df,
                                "VALUE"] = "rdf:ID=" + '"_' + mrid + '"'
            power_time_point.at[index_df, "FIELD"] = "nc:PowerTimePoint"
            index_df += 1

            print('line 38 ===>', row["tm_von"])

            time_convert = row["tm_von"].replace("/", "-")
            time_convert = time_convert.replace(".", "-")
            print('line 43 ===>', row["tm_von"])

            split_time = time_convert.split("-")
            if len(split_time[0]) < 4:
                time_convert = split_time[2] + "-" + \
                    split_time[1] + "-" + split_time[0]
            # print(time_convert)
            # t.sleep(2000)
            if len(time_convert.split(' ')):
                time_convert = time_convert.split(' ')[0]

            a = t.strftime(
                "%Y-%m-%d %H:%M:%S",
                t.gmtime(
                    t.mktime(
                        t.strptime(
                            f"{time_convert} {initial_hour}", "%Y-%m-%d %H:%M:%S"
                        )
                    )
                ),
            )
            print('result here', a)
            a = str(a)
            a = a.split(" ")
            a = a[0] + "T" + a[1] + "Z"
            # print(a)
            # power_time_point.at[index_df, 'VALUE'] = time_convert +"T" + str(initial_hour) + "Z" 2022-11-02 00:00:00
            power_time_point.at[index_df, "VALUE"] = a
            power_time_point.at[
                index_df, "FIELD"
            ] = "nc:PowerTimePoint/nc:PowerTimePoint.atTime"
            index_df += 1

            mean_leistung = min(leistung)
            power_time_point.at[index_df, "VALUE"] = str(mean_leistung)
            power_time_point.at[
                index_df, "FIELD"
            ] = "nc:PowerTimePoint/nc:PowerTimePoint.activatedP"
            index_df += 1

            variable_erzeugungsauslagen = row[
                "variable_erzeugungsauslagen_"
                + str(i): "variable_erzeugungsauslagen_"
                + str(i + 3)
            ]
            variable_erzeugungsauslagen = variable_erzeugungsauslagen.replace(
                ",", ".", regex=True
            )
            variable_erzeugungsauslagen = variable_erzeugungsauslagen.astype(
                "float")
            # sum_variable_erzeugungsauslagen = variable_erzeugungsauslagen.sum()
            sum_variable_erzeugungsauslagen = min(variable_erzeugungsauslagen)
            # sum_variable_erzeugungsauslagen = sum_variable_erzeugungsauslagen

            sonstige_kosten = row[
                "sonstige_kosten_" + str(i): "sonstige_kosten_" + str(i + 3)
            ]
            sonstige_kosten = sonstige_kosten.replace(",", ".", regex=True)
            sonstige_kosten = sonstige_kosten.astype("float")
            sum_sonstige_kosten = min(sonstige_kosten)
            # sum_sonstige_kosten = sum_sonstige_kosten

            anteiliger_werteverbrauch = row[
                "anteiliger_werteverbrauch_"
                + str(i): "anteiliger_werteverbrauch_"
                + str(i + 3)
            ]
            anteiliger_werteverbrauch = anteiliger_werteverbrauch.replace(
                ",", ".", regex=True
            )
            anteiliger_werteverbrauch = anteiliger_werteverbrauch.astype(
                "float")
            sum_anteiliger_werteverbrauch = min(anteiliger_werteverbrauch)
            # sum_anteiliger_werteverbrauch = sum_anteiliger_werteverbrauch

            entgangene_intraday = row[
                "entgangene_intraday_" + str(i): "entgangene_intraday_" + str(i + 3)
            ]
            entgangene_intraday = entgangene_intraday.replace(
                ",", ".", regex=True)
            entgangene_intraday = entgangene_intraday.astype("float")

            sum_entgangene_intraday = min(entgangene_intraday)
            # sum_entgangene_intraday = sum_entgangene_intraday

            leistung = row["leistung_" + str(i): "leistung_" + str(i + 3)]
            leistung = leistung.replace(",", ".", regex=True)
            leistung = leistung.astype("float")
            # sum_leistung = leistung.sum()
            # mean_leistung = sum_leistung / 4
            activated_price = (
                sum_variable_erzeugungsauslagen
                + sum_sonstige_kosten
                + sum_anteiliger_werteverbrauch
                + sum_entgangene_intraday
            )
            # activated_price /= mean_leistung

            if math.isnan(activated_price):
                activated_price = 0.0

            power_time_point.at[index_df, "VALUE"] = str(activated_price)
            power_time_point.at[
                index_df, "FIELD"
            ] = "nc:PowerTimePoint/nc:PowerTimePoint.activatedPrice"
            index_df += 1

            power_time_point.at[index_df, "VALUE"] = (
                'rdf:resource="#_' + power_schedule["VALUE"][2] + '"'
            )
            power_time_point.at[
                index_df, "FIELD"
            ] = "nc:PowerTimePoint/nc:PowerTimePoint.PowerSchedule"
            index_df += 1
    return power_time_point
