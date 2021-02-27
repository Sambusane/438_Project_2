from flask import Flask
from flaskext.mysql import MySQL

mysql=MySQL()

app = Flask(__name__)

@app.route("/")
def index():
    return 'Index'


if  __name__ == '__main__':
    app.run(debug=True)


#Confiq Mysql
app.config["MYSQL_HOST"] = "phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
app.config["MYSQL_USER"] = "tv46rwbi8adoj2md"
app.config["MYSQL_PASSWORD"] = "tbjwty26y82u9rts"
app.config["MYSQL_DB"] = "y3fd3bb0x7gmyzqc"
app.config["MYSQL_CURSORCLASS"] = 'DictCursor'

#init MySql
mysql=MySQL(app)
