=========================
PROJECT EXECUTION PROCESS
=========================
​
1- Open the project using your prefered IDE (Visual Studio Code for example) or a using a common command-window(Batch, CMD)
​
2- set up a virtual environment for project with the following commands
python -m venv env
source env/Scripts/activate

3- if you use linux os comment these two packages in the requirements.txt file
pywin32==305
pywinpty==2.0.10
​
4- install requirements with the following commands
pip install -r requirements.txt

5- Start the database engine sqlAlchemy
flask shell
db.create_all()
from src.database import db
quit()

=====================================
update db if some new column or table
=====================================

flask db init
flask db migrate -m "Adding column x."
8f20963359fc -> 2de1d9d8b8e7 e83c9587c252
flask db upgrade (add option like ---> e83c9587c252)
8f20963359fc -> 2de1d9d8b8e7 e83c9587c252

or do this

$ flask db stamp head
$ flask db migrate
$ flask db upgrade

​
6- Run the project application
flask run
​
Done!!!
​
login: super.admin.tdd@amprion.net
passsword: super.admin.tdd

------ Change download output path ----- in docs/config.ini
