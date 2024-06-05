# import paramiko
# import os
# import stat
# from datetime import datetime, timedelta
# import traceback
# import xml.etree.ElementTree as ET
# from xml.etree import ElementTree
# from dotenv import load_dotenv
# import pandas as pd
# load_dotenv()

# mRID_data = {'mRid': ['4e915654-683e-4e33-8f72-4a4887123fe7', '1af8b1e5-53ef-4dd9-a0e5-8372d0f4d561', '42ad4525-fc2d-41c4-9809-ccc6bc50a342'],
#              'TSO': ['50Hertz', 'AMP', 'TNG']}
# df = pd.DataFrame(mRID_data, columns=['mRid', 'TSO'])

# current_directory = os.getcwd()
# remote_path = f"ROSC_OUTPUT"
# out_path = f"{current_directory}/SFTP_OUT_FILES"
# directory = f"{current_directory}/SFTP_IN_FILES"


# def connect_to_sftp():
#     # create ssh client
#     ssh_client = paramiko.SSHClient()
#     # remote server credentials
#     host = os.environ.get("TDD_SERVER")
#     username = os.environ.get("TDD_USER")
#     password = os.environ.get("TDD_PASS")

#     ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#     ssh_client.connect(hostname=host, username=username,
#                        password=password, look_for_keys=False)

#     print('connection established successfully')
#     list_directories(ssh_client)
#     # ftp = ssh_client.open_sftp()
#     # ftp.listdir()

#     # ssh_client.close()
#     # return ssh_client


# def list_directories(ssh_client):

#     ftp = ssh_client.open_sftp()
#     files = ftp.listdir('ROSC_OUTPUT')

#     # files = ftp.listdir('50Hertz/IN')
#     #  ['OUT', 'IN', '.sftp']
#     # for x in files:
#     #     # directory = f"{current_directory}/SFTP_FILES/{x}/IN"
#     #     directory = f"{current_directory}/SFTP_FILES/ROSC_OUTPUT"
#     #     if not os.path.exists(directory):
#     #         os.makedirs(directory)
#     #     for fileattr in ftp.listdir_attr(x):
#     #         #    print("result of listdir====================>: ", files_list)
#     #         if 'OUT'not in f"{x}/{fileattr.filename}" and stat.S_ISDIR(fileattr.st_mode):
#     #             files = ftp.listdir(f"{x}/{fileattr.filename}")
#     #             if len(files) == 0:
#     #                 print(f"no files in {x}/{fileattr.filename}")
#     #             remote_path = f"{x}/{fileattr.filename}"
#     #             out_path = f"{current_directory}/SFTP_OUT_FILES/{x}"
#     #             if not os.path.exists(out_path):
#     #                 os.makedirs(out_path)
#     #             # Append-adds at last
#     #             file1 = open(f"{out_path}/{x}.xml", "a")  # append mode

#     #             for y in files:
#     #                 # print('hello')
#     #                 data = download_file(ssh_client, directory +
#     #                                      f"/{y}",  remote_path + "/" + y)
#     #                 for d in data:
#     #                     xml_str = ElementTree.tostring(d, encoding='unicode')
#     #                     file1.write(xml_str)

#     #             file1.close()
#     #             upload_file(ssh_client, f"{out_path}/{x}.xml",
#     #                         f"./{x}/OUT/{x}.xml")
#     #         else:
#     #             print(f"{fileattr.filename}=======> is a DIRECTORY")

#     if not os.path.exists(directory):
#         os.makedirs(directory)
#     else:
#         for filename in os.listdir(directory):
#             if os.path.isfile(os.path.join(directory, filename)):
#                 os.remove(os.path.join(directory, filename))
#     if not os.path.exists(out_path):
#         os.makedirs(out_path)
#     else:
#         for filename in os.listdir(out_path):
#             if os.path.isfile(os.path.join(out_path, filename)):
#                 os.remove(os.path.join(out_path, filename))
#     # file1 = open(f"{out_path}/{x}.xml", "a")  # append mode
#     filename = f"{out_path}/out.xml"
#     try:
#         os.remove(filename)
#     except OSError:
#         pass
#     # file1 = open(filename, "a")  # append mode

#     for y in files:
#         # print('hello')
#         # data = download_file(ssh_client, directory +
#         #                      "/" + y, remote_path + "/" + y)
#         download_file(ssh_client, directory +
#                       "/" + y, remote_path + "/" + y)
#     upload_file(ssh_client)
#     print('=====ok=====')

#     #     for d in data:
#     #         xml_str = ElementTree.tostring(d, encoding='unicode')
#     #         file1.write(xml_str)

#     # file1.close()
#     # upload_file(ssh_client, f"{out_path}/{x}.xml",
#     #             f"./{x}/OUT/{x}.xml")

#     # close the connection
#     # current_directory = os.getcwd()
#     # download_file(ssh_client, current_directory+"/hello3.xml",
#     #               "./50Hertz/test.xml")
#     # upload_file(ssh_client, current_directory+'/WV_AMP_2022_12_202301161657.xml',
#     #             "./50Hertz/test.xml")
#     ftp.close()
#     ssh_client.close()


# def upload_file(ssh_client):
#     # ROSC_OUTPUT
#     remote_path = 'META_GLOBAL'
#     try:
#         ftp = ssh_client.open_sftp()
#         for filename in os.listdir(out_path):

#             ftp.put(out_path + "/" + filename, remote_path + "/" + filename)
#         ftp.close()
#         # ssh_client.close()
#     except Exception as error:
#         print(error)


# def download_file(ssh_client, local_file_path, remote_file_path):
#     try:
#         ftp = ssh_client.open_sftp()
#         ftp.get(remote_file_path, local_file_path)
#         ftp.close()
#         # ssh_client.close()
#         print(local_file_path)
#         extract_data = parse_xml(local_file_path)
#     except Exception as error:
#         print(error)
#         # parse_xml(local_file_path)

#     return extract_data


# def remove_file(ssh_client, remote_file_path):
#     ftp = ssh_client.open_sftp()
#     ftp.remove(remote_file_path)
#     ftp.close()
#     ssh_client.close()


# def create_directory(ssh_client, remote_directory_path):
#     ftp = ssh_client.open_sftp()
#     ftp.mkdir(remote_directory_path)
#     ftp.close()
#     ssh_client.close()


# def parse_xml(xml_file):
#     print(xml_file)
#     tree = ET.parse(xml_file)
#     root = tree.getroot()
#     # print(len(root))
#     # print(root.tag)
#     # for child in root:
#     #     print(f'tag====>: {child.tag}')
#     #     print(f'attrib====>: {child.attrib}')
#     # print(child.tag, child.attrib)
#     # print(child[0])
#     # print(child[0])
#     # for country in root.findall('nc:RedispatchScheduleAction'):
#     #     rank = country.find(
#     #         'nc:PowerScheduleAction.RemedialActionSchedule').text
#     #     # name = country.get('name')
#     #     print(rank)
#     results = []
#     namespaces = {'nc': 'http://entsoe.eu/ns/nc#'}  # add more as needed

#     for element in root.findall('nc:RedispatchScheduleAction', namespaces):
#         print('hello')
#         # key_values = {}
#         # for key in ['rdf:ID']:
#         #     key_values[key] = element.attrib[key]
#         for child in element.iter():
#             if 'mRID' in child.tag:
#                 # if child.tag == 'accession':
#                 #     key_values['accession type'] = child.attrib['type']
#                 # elif child.tag == 'name' and child.attrib['type'] == 'identifier':
#                 #     key_values['name type identifier'] = child.text
#                 # elif child.tag == 'name' and child.attrib['type'] == 'synonym':
#                 #     key_values['name type synonym'] = child.text
#                 # ici ont recupere le mRID et on va chercher le tso correspondant
#                 # dans le stamDatei file
#                 # print(
#                 #     df.loc[df['mRid'] == '4e915654-683e-4e33-8f72-4a4887123fe7']['TSO'].values[0])
#                 print(f'hello mrid tag====>: {child.tag}')
#                 print(f'the value is====>: {child.text}')
#                 if child.text:
#                     tso = df.loc[df['mRid'] ==
#                                  f'{child.text}']['TSO'].values[0]
#                     if tso:
#                         filename = f"{out_path}/{tso}.xml"
#                         file1 = open(filename, "a")  # append mode
#         xml_str = ElementTree.tostring(element, encoding='unicode')
#         file1.write(xml_str)
#         file1.close()

#         results.append(element)
#     return results
#     #     results.append([
#     #             # Using the get method of the dict object in case any particular
#     #             # entry does not have all the required attributes.
#     #              key_values.get('category'            , None)
#     #             ,key_values.get('created'             , None)
#     #             ,key_values.get('last_updated'        , None)
#     #             ,key_values.get('accession type'      , None)
#     #             ,key_values.get('name type identifier', None)
#     #             ,key_values.get('name type synonym'   , None)
#     #             ])

#     # print(results)


# def get_files_from_sftp(sftp, date_limit, remote_path):
#     """ get new files from sftp and load to s3 """
#     to_load = False  # will set to True if there are files to load (for later implementation)
#     # set a date variable to compare files to
#     max_last_modified = datetime.now() - timedelta(days=7)

#     files = sftp.listdir(remote_path)  # get files in directory
#     # check for new files above date limit
#     max_file_path = ""
#     try:
#         for f in files:
#             # get last modified date/timestamp from file metadata
#             last_modified = sftp.stat(remote_path + f).st_mtime
#             last_modified_ts = datetime.fromtimestamp(last_modified)
#             last_modified_date = datetime.fromtimestamp(last_modified).date()

#             if last_modified_date > date_limit:  # check limit
#                 # check if file is empty (in this case larger than 1MB)
#                 if sftp.stat(remote_path + f).st_size > 1000:
#                     if last_modified_ts > max_last_modified:  # maintain last modified file
#                         max_last_modified = last_modified_ts
#                         max_file = f
#                         to_load = True

#         print(max_file)
#         return to_load, max_file
#     except:
#         trace_error = traceback.format_exc()
#         print('something is wrong - did not get files \n' + trace_error)


# def main():

#     # set date limit for files
#     days_back = 2
#     date_limit = datetime.date(datetime.now()) - timedelta(days=days_back)
#     # set from & to paths for files to download
#     remote_path = '/your_path/'
#     host = os.environ.get("TDD_SERVER")
#     username = os.environ.get("TDD_USER")
#     password = os.environ.get("TDD_PASS")

#     # establish sftp connection
#     sftp_conn = set_sftp_conn(host, 22, username, password)

#     to_load, max_file = get_files_from_sftp(sftp_conn, date_limit, remote_path)
#     # check if there are files to load
#     print(max_file)
#     print(to_load)
#     print("ALL DONE!")


# def set_sftp_conn(host, port, username, password):
#     """ set sftp connection to get the files, using config.py """
#     # connect to sftp
#     transport = paramiko.Transport((host, port))
#     print("connecting to SFTP...")
#     transport.connect(username=username, password=password)
#     sftp = paramiko.SFTPClient.from_transport(transport)
#     print("connection established.")
#     return sftp


# connect_to_sftp()
