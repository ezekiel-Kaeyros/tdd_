"""functions python version."""


def filter_case_one(wv_file):
    """
    This class create user for tso
    """
    # result = wv_file.loc[wv_file['auslosender_prozess'] == "PRD2 (DACF)"]
    # wv_file = wv_file.loc[wv_file['gm_art'] == "Redispatch"]
    first_filter = wv_file.loc[wv_file["gm_art"] != "Countertrade"]
    result = first_filter.query(
        'auslosender_prozess == "PRD2 (DACF)" | gm_art == "Redispatch" & ursache == "I"'
    )
    newf = wv_file.loc[
        (wv_file["auslosender_prozess"] != "PRD2 (DACF)")
        | (wv_file["gm_art"] != "Redispatch")
        | (wv_file["ursache"] != "I")
    ]
    # print(len(newf))
    return result, newf


def filter_case_two(wv_file):
    """
    This class create user for tso
    """
    result = wv_file.loc[wv_file["gm_art"] == "Countertrade"]
    result = wv_file.loc[wv_file["auslosender_prozess"] == "Intraday"]

    reste = wv_file.loc[
        (wv_file["gm_art"] != "Countertrade")
        | (wv_file["auslosender_prozess"] != "Intraday")
    ]
    # result = wv_file.loc[wv_file['auslosender_prozess'] == "Intraday"]
    # wv_file = wv_file.loc[wv_file['gm_art'] == "Countertrade"]
    # wv_file.head(1)
    # wv_file_date = wv_file.drop_duplicates(subset=["tm_von"], keep = 'first')
    return result, reste


def filter_case_three(wv_file):
    """
    This class create user for tso
    """
    first_filter = wv_file[wv_file["gm_art"] != "Countertrade"]
    result = first_filter.loc[(
        first_filter["auslosender_prozess"] == "PRD2 (DACF)")]
    wv_file_date = result[
        result.groupby(["tm_von", "tm_bis", "zeit_von", "zeit_bis"])[
            "tm_von"
        ].transform("size")
        > 1
    ]
    for i, row in wv_file_date.iterrows():
        print(row)
        wv_file = wv_file.drop(index=i)
    return wv_file_date, wv_file


def filter_case_four(wv_file):
    """
    This class create user for tso
    """
    first_filter = wv_file[wv_file["gm_art"] != "Countertrade"]
    result = first_filter.loc[
        (first_filter["gm_art"] == "Redispatch")
        & (first_filter["auslosender_prozess"] == "Intraday")
        & (first_filter["ursache"] == "I")
        & (first_filter["tm_art"] == "Markt-KW 13(1)")
    ]
    reste = wv_file.loc[
        (wv_file["gm_art"] != "Redispatch")
        | (wv_file["auslosender_prozess"] != "Intraday")
        | (wv_file["ursache"] != "I")
        | (wv_file["tm_art"] != "Markt-KW 13(1)")
    ]
    return result, reste


def filter_case_five(wv_file):
    """
    This class create user for tso

    """
    first_filter = wv_file[wv_file["gm_art"] != "Countertrade"]
    df1 = wv_file[wv_file.duplicated("tages_tm_ident", keep=False)]

    df2 = wv_file.drop_duplicates(subset=["tages_tm_ident"], keep=False)
    df1 = df1.loc[
        (df1["gm_art"] == "Redispatch" | df1["gm_art"] == "Countertrade")
        & (
            (
                (df1["auslosender_prozess"] == "FAP-Replacement")
                | (df1["auslosender_prozess"] == "PRD2 (DACF)")
            )
        )
        & (df1["ursache"] == "I")
    ]
    return df1, df2


def filter_case_6(wv_file):
    """
    This class create user for tso
    """
    result = wv_file.loc[wv_file["auslosender_prozess"] == "FAP-activation"]
    newf = wv_file.loc[wv_file["auslosender_prozess"] != "FAP-activation"]
    # print(len(newf))
    return result, newf
