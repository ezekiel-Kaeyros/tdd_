"""Module to create power time point."""

import uuid
from datetime import time
import time as t
import math
import numpy as np
import pandas as pd
from src.utils import incremente_hour, get_utc_time


def create_power_time_point(
    row, power_schedule, client_zone
):  # pylint: disable=too-many-locals, too-many-statements
    """Function."""

    calculation = {
        "00": 1,
        "01": 5,
        "02": 9,
        "03": 13,
        "04": 17,
        "05": 21,
        "06": 25,
        "07": 29,
        "08": 33,
        "09": 37,
        "10": 41,
        "11": 45,
        "12": 49,
        "13": 53,
        "14": 57,
        "15": 61,
        "16": 65,
        "17": 69,
        "18": 73,
        "19": 77,
        "20": 81,
        "21": 85,
        "22": 89,
        "23": 93
    }
    power_time_point = pd.DataFrame({"FIELD": [], "VALUE": []})
    index_df = 0

    np.seterr(divide="ignore", invalid="ignore")

    initial_hour = time(23, 30)

    # print('colums is =====>',
    #       row['rd_2_0_entschadigung_energetischer_ausgleich': 'rd_2_0_entschadigung_energetischer_ausgleich_3'])

    for i in range(1, 101, 4):

        initial_hour = incremente_hour(initial_hour)
        # t.sleep(2000)
        # x = row["leistung_" + str(i): "leistung_" + str(i + 3)]

        if i >= 97 or i+3 >= 97:
            sum_leistung = 0

            # data = [[0, 0, 0, 0]]
            # df = pd.DataFrame(data, columns=["leistung_" + str(i), "leistung_" + str(
            #     i+1), "leistung_" + str(i+2), "leistung_" + str(i+3)])
            # leistung = df
          # t.sleep(2000)
        else:
            leistung = row["leistung_" + str(i): "leistung_" + str(i + 3)]
            leistung = leistung.replace(",", ".", regex=True)
            leistung = leistung.astype("float")
            sum_leistung = leistung.sum()
            # if sum_leistung.empty is False:
            #     pass
            # else:
            mrid = str(uuid.uuid4())
            power_time_point.at[index_df,
                                "VALUE"] = "rdf:ID=" + '"_' + mrid + '"'
            power_time_point.at[index_df, "FIELD"] = "nc:PowerTimePoint"
            index_df += 1
            time_convert = row["tm_von"].replace("/", "-")
            time_convert = time_convert.replace(".", "-")
            time_convert = time_convert.split('-')
            time_convert = time_convert[2] + '-' + \
                time_convert[1] + '-' + time_convert[0]
            t_to_utc = f'{time_convert} {initial_hour}'

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
            a = str(a)
            a = a.split(" ")
            b = a[0] + " " + a[1]
            a = a[0] + "T" + a[1] + "Z"

            # power_time_point.at[index_df, 'VALUE'] = time_convert +"T" + str(initial_hour) + "Z" 2022-11-02 00:00:00
            power_time_point.at[index_df,
                                "VALUE"] = str(
                get_utc_time(client_zone, str(t_to_utc))).replace(" ", "T").replace('+00:00', 'Z')

            power_time_point.at[
                index_df, "FIELD"
            ] = "nc:PowerTimePoint/nc:PowerTimePoint.atTime"
            index_df += 1
            activateDP = leistung.sum()/4
            if isinstance(activateDP, float):
                activateDP = round(activateDP, 1)

            mean_leistung = min(leistung)
            power_time_point.at[index_df, "VALUE"] = str(activateDP)
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

            sum_variable_erzeugungsauslagen = sum(variable_erzeugungsauslagen)

            sonstige_kosten = row[
                "sonstige_kosten_" + str(i): "sonstige_kosten_" + str(i + 3)
            ]
            sonstige_kosten = sonstige_kosten.replace(",", ".", regex=True)
            sonstige_kosten = sonstige_kosten.astype("float")

            sum_sonstige_kosten = sum(sonstige_kosten)
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

            sum_anteiliger_werteverbrauch = sum(anteiliger_werteverbrauch)
            entgangene_intraday = row[
                "entgangene_intraday_" + str(i): "entgangene_intraday_" + str(i + 3)
            ]
            entgangene_intraday = entgangene_intraday.replace(
                ",", ".", regex=True)
            entgangene_intraday = entgangene_intraday.astype("float")

            sum_entgangene_intraday = sum(entgangene_intraday)
            # sum_entgangene_intraday = sum_entgangene_intraday

            # new file format

            if "rd_2_0_zusatzliche_aufwendungen_" + str(i) in row:

                # print("rd_2_0_zusatzliche_aufwendungen_", i)
                # t.sleep(10000)

                rd_2_0_zusatzliche_aufwendungen = row[
                    "rd_2_0_zusatzliche_aufwendungen_"
                    + str(i): "rd_2_0_zusatzliche_aufwendungen_"
                    + str(i + 3)
                ]
                rd_2_0_zusatzliche_aufwendungen = rd_2_0_zusatzliche_aufwendungen.replace(
                    ",", ".", regex=True
                )
                rd_2_0_zusatzliche_aufwendungen = rd_2_0_zusatzliche_aufwendungen.astype(
                    "float")
                # sum_variable_erzeugungsauslagen = rd_2_0_zusatzliche_aufwendungen.sum()

                sum_rd_2_0_zusatzliche_aufwendungen = sum(
                    rd_2_0_zusatzliche_aufwendungen)
            else:
                sum_rd_2_0_zusatzliche_aufwendungen = 0

            if "rd_2_0_entschadigung_entgangene_einnahmen_eeg_und_kwk_" + str(i) in row:

                rd_2_0_entschadigung_entgangene_einnahmen_eeg = row[
                    "rd_2_0_entschadigung_entgangene_einnahmen_eeg_und_kwk_"
                    + str(i): "rd_2_0_entschadigung_entgangene_einnahmen_eeg_und_kwk_"
                    + str(i + 3)
                ]
                rd_2_0_entschadigung_entgangene_einnahmen_eeg = rd_2_0_entschadigung_entgangene_einnahmen_eeg.replace(
                    ",", ".", regex=True
                )
                rd_2_0_entschadigung_entgangene_einnahmen_eeg = rd_2_0_entschadigung_entgangene_einnahmen_eeg.astype(
                    "float")
                # sum_variable_erzeugungsauslagen = rd_2_0_entschadigung_entgangene_einnahmen.sum()

                sum_rd_2_0_entschadigung_entgangene_einnahmen_eeg = sum(
                    rd_2_0_entschadigung_entgangene_einnahmen_eeg)
            else:
                sum_rd_2_0_entschadigung_entgangene_einnahmen_eeg = 0

            if 'd_2_0_ersparte_aufwendungen_' + str(i) in row:

                d_2_0_ersparte_aufwendungen = row[
                    "d_2_0_ersparte_aufwendungen_"
                    + str(i): "d_2_0_ersparte_aufwendungen_"
                    + str(i + 3)
                ]
                d_2_0_ersparte_aufwendungen = d_2_0_ersparte_aufwendungen.replace(
                    ",", ".", regex=True
                )
                d_2_0_ersparte_aufwendungen = d_2_0_ersparte_aufwendungen.astype(
                    "float")
                # sum_variable_erzeugungsauslagen = d_2_0_ersparte_aufwendungen.sum()

                sum_d_2_0_ersparte_aufwendungen = sum(
                    d_2_0_ersparte_aufwendungen)
            else:
                sum_d_2_0_ersparte_aufwendungen = 0

            if 'rd_2_0_abweichung_zwischen_dem_bilanziellen_' + str(i) in row:

                rd_2_0_abweichung_zwischen_dem_bilanziellen = row[
                    "rd_2_0_abweichung_zwischen_dem_bilanziellen_"
                    + str(i): "rd_2_0_abweichung_zwischen_dem_bilanziellen_"
                    + str(i + 3)
                ]
                rd_2_0_abweichung_zwischen_dem_bilanziellen = rd_2_0_abweichung_zwischen_dem_bilanziellen.replace(
                    ",", ".", regex=True
                )
                rd_2_0_abweichung_zwischen_dem_bilanziellen = rd_2_0_abweichung_zwischen_dem_bilanziellen.astype(
                    "float")
                # sum_variable_erzeugungsauslagen = rd_2_0_abweichung_zwischen_dem_bilanziellen.sum()

                sum_rd_2_0_abweichung_zwischen_dem_bilanziellen = sum(
                    rd_2_0_abweichung_zwischen_dem_bilanziellen)
            else:
                sum_rd_2_0_abweichung_zwischen_dem_bilanziellen = 0

            if 'abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall_' + str(i) in row:

                abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall = row[
                    "abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall_"
                    + str(i): "abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall_"
                    + str(i + 3)
                ]
                abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall = abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall.replace(
                    ",", ".", regex=True
                )
                abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall = abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall.astype(
                    "float")
                # sum_variable_erzeugungsauslagen = abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall.sum()

                sum_im_clusterfall = sum(
                    abweichungen_zu_dem_vom_anf_nb_als_bk_fahrplan_gelieferten_energetischen_ausgleich_im_clusterfall)
            else:
                sum_im_clusterfall = 0

            if 'rd_2_0_entschadigung_energetischer_ausgleich_' + str(i) in row:

                rd_2_0_entschadigung_energetischer_ausgleich = row[
                    "rd_2_0_entschadigung_energetischer_ausgleich_"
                    + str(i): "rd_2_0_entschadigung_energetischer_ausgleich_"
                    + str(i + 3)
                ]
                rd_2_0_entschadigung_energetischer_ausgleich = rd_2_0_entschadigung_energetischer_ausgleich.replace(
                    ",", ".", regex=True
                )
                rd_2_0_entschadigung_energetischer_ausgleich = rd_2_0_entschadigung_energetischer_ausgleich.astype(
                    "float")
                # sum_variable_erzeugungsauslagen = rd_2_0_entschadigung_energetischer_ausgleich.sum()

                sum_rd_2_0_entschadigung_energetischer_ausgleich = sum(
                    rd_2_0_entschadigung_energetischer_ausgleich)
            else:
                sum_rd_2_0_entschadigung_energetischer_ausgleich = 0

            leistung = row["leistung_" + str(i): "leistung_" + str(i + 3)]
            leistung = leistung.replace(",", ".", regex=True)
            leistung = leistung.astype("float")
            # sum_leistung = leistung.sum()
            # mean_leistung = sum_leistung / 4

            val = leistung.sum()/4
            activated_price = 0.0
            if val != 0:
                sum_variable_erzeugungsauslagen = sum_variable_erzeugungsauslagen
                sum_sonstige_kosten = sum_sonstige_kosten
                sum_anteiliger_werteverbrauch = sum_anteiliger_werteverbrauch
                sum_entgangene_intraday = sum_entgangene_intraday
                activated_price = (
                    sum_variable_erzeugungsauslagen
                    + sum_sonstige_kosten
                    + sum_anteiliger_werteverbrauch
                    + sum_entgangene_intraday
                    + sum_rd_2_0_zusatzliche_aufwendungen
                    + sum_rd_2_0_entschadigung_entgangene_einnahmen_eeg
                    + sum_d_2_0_ersparte_aufwendungen
                    + sum_rd_2_0_abweichung_zwischen_dem_bilanziellen
                    + sum_im_clusterfall
                    + sum_rd_2_0_entschadigung_energetischer_ausgleich
                ) / abs(val)

            # else:
            #     activated_price = 0.0
            if math.isnan(activated_price):
                activated_price = 0.0
            if isinstance(activated_price, float):
                activated_price = round(activated_price, 1)

            # t.sleep(2000)

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
    # t.sleep(10000)
    return power_time_point
