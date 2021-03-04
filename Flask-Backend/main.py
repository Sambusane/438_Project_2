from flask import Flask, session, request
from flaskext.mysql import MySQL
from flask_restful import Api, Resource


mysql = MySQL()
app = Flask(__name__)
api = Api(app)

class Items(Resource):
    def post(self, userId):
        placer = mysql.get_db().cursor()
        _userId = int(userId)
        item_name = str(request.json['item_name'])
        item_description = str(request.json['item_description'])
        item_link = str(request.json['item_list'])
        item_price = int(request.json['item_price'])

        sql = ( "INSERT INTO items (userId, itemName, itemDescription, itemLink, itemPrice)"
                " VALUES (%s, %s, %s, %s, %s)")
        params = [_userId, item_name, item_description, item_link, item_price]
        placer.execute(sql, params)
        mysql.get_db().commit()
        placer.close()
        return "success"
        
class Users(Resource):

    #this is the api endpoint for getting a user from the database
    def get(self, username):
        placer = mysql.get_db().cursor()
        sql = ("SELECT * FROM users WHERE username LIKE (%s)")
        result = placer.execute(sql, [username])
        if result > 0:
            data = placer.fetchall()
        else: data = {
            "msg": "no users"
        }
        placer.close()
        return data

    #this is this endpoint for adding a user to the database
    #this needs to still check that the user is not already in the database before adding
    #usernames must be unique
    def post(self, username):
        placer = mysql.get_db().cursor()
        _username = str(username)
        first_name = str(request.json['first_name'])
        email = str(request.json['email'])
        last_name = str(request.json['last_name'])
        password = str(request.json['password'])

        sql =( "INSERT INTO users (username, email, firstname, lastname, password)"
               " VALUES (%s,%s,%s,%s,%s)")
        params = [_username, email, first_name, last_name, password]
        placer.execute(sql, params)
        mysql.get_db().commit()
        placer.close()
        return "success"

    #this is the delete route for the db
    #this checks if the user is in the db then it removes them
    def delete(self,username):
        placer = mysql.get_db().cursor()
        sql = ("SELECT * FROM users WHERE username LIKE (%s)")
        result = placer.execute(sql, [username])
        data = {
            "msg" : "user not found"
        }
        if  result > 0:
            sql2 = ("DELETE FROM users WHERE username= (%s)")
            placer.execute(sql2,[username])
            data = {
                "msg": "user deleted"
            }
            mysql.get_db().commit()
        placer.close()

        return data

#this is the route for the user things in the database the methods are defined in the class called Users above
api.add_resource(Users, "/user/<string:username>")

#Confiq Mysql
app.config["MYSQL_DATABASE_HOST"] = "phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
app.config["MYSQL_DATABASE_USER"] = "tv46rwbi8adoj2md"
app.config["MYSQL_DATABASE_PASSWORD"] = "tbjwty26y82u9rts"
app.config["MYSQL_DATABASE_DB"] = "y3fd3bb0x7gmyzqc"
app.config["MYSQL_DATABASE_CURSORCLASS"] = 'DictCursor'

#init MySql
mysql.init_app(app)
db = mysql.connect()


@app.route("/")
def index():
    return 'Index'


if  __name__ == '__main__':
    app.run(debug=True)



