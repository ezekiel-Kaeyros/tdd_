"""Module to convert xlsx to csv."""
import pandas as pd
import os
import openpyxl
import csv
def convert_to_csv(xlsx_file_path,filename):
    """Function to convert xlsx to csv."""
    filename= filename.split('.')[0]
    # read_file = pd.read_excel (xlsx_file_path)
    path= f'{os.getcwd()}/{filename}.csv'
    # read_file.to_csv (path,encoding='utf-8',index=None, header=True)
    # creating or loading an excel workbook
    newWorkbook = openpyxl.load_workbook(xlsx_file_path)
    # getting the active workbook sheet(Bydefault-->Sheet1)
    firstWorksheet = newWorkbook.active

    # Opening a output csv file in write mode
    OutputCsvFile = csv.writer(open(path, 'w'), delimiter=";")

    # Traversing in each row of the worshsheet
    for eachrow in firstWorksheet.rows:

    # Writing data of the excel file into the result csv file row-by-row
       OutputCsvFile.writerow([cell.value for cell in eachrow])

    return path