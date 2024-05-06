# import paramiko
# import os
# from dotenv import load_dotenv
# load_dotenv()


# def connect_to_sftp():
#     # create ssh client
#     ssh_client = paramiko.SSHClient()
#     # remote server credentials
#     host = os.environ.get("TDD_SERVER")
#     username = os.environ.get("TDD_USER")
#     password = os.environ.get("TDD_PASS")

#     ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#     ssh_client.connect(hostname=host, username=username, password=password)

#     print('connection established successfully')
#     list_directories(ssh_client)
#     # ftp = ssh_client.open_sftp()
#     # ftp.listdir()

#     # ssh_client.close()
#     # return ssh_client


# def list_directories(ssh_client):

#     ftp = ssh_client.open_sftp()
#     files = ftp.listdir()
#     # files = ftp.listdir('50Hertz/IN')
#     #  ['OUT', 'IN', '.sftp']

#     print("Listing all the files and Directory: ", files)
#     for x in files:
#         print(x)
#         files_list = ftp.listdir(x)
#         print("result of listdir====================>: ", files_list)
#         for y in files_list:
#             res = ftp.listdir(f"{x}/{y}")
#             print(f"res of {x}/{y} is here====================>: ", res)

#     # close the connection
#     ftp.close()
#     ssh_client.close()


# def upload_file(ssh_client, local_file_path, remote_file_path):
#     ftp = ssh_client.open_sftp()
#     ftp.put(local_file_path, remote_file_path)
#     ftp.close()
#     ssh_client.close()


# def download_file(ssh_client, local_file_path, remote_file_path):
#     ftp = ssh_client.open_sftp()
#     ftp.get(remote_file_path, local_file_path)
#     ftp.close()
#     ssh_client.close()


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


# connect_to_sftp()
