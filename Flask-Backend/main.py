import pymysql
from flask import Flask, session, request
from flaskext.mysql import MySQL
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
import MySQLdb as mdb
import MySQLdb.cursors as mbd2
import json
import re

mysql = MySQL()
app = Flask(__name__)
app.secret_key = 'this is the secret key'
api = Api(app)
cors = CORS(app, resources ={r"/login/": {"origins": "*"}}) 
cors = CORS(app, resource = {r"/signup/": {"origins": "*"}})
class Signup(Resource):
    def post(self):
        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        firstName = request.json['firstName']
        lastName = request.json['lastName']

        print(username + " pass: " + password + " email: " + email + " first name: " + firstName + " last name: " + lastName)

        data = Users.get(self, username)
        empty = {
            "msg": "no users"
        }
        if data == empty:
            if len(password) < 6:
                data = {
                    "msg": "password is too short"
                }
            elif re.search('[0-9]', password) is None:
                data = {                  
                    "msg": "password needs number"
                }
            elif re.search('[A-Z]', password) is None:
               data = {           
                    "msg": "password needs capital letter"
               }

            elif re.search('[!"#$%&]', password) is None:
                data = {
                    "msg": "password needs a special character"
                }
            else:
                data = Users.post(self,username)
                data = {
                    "msg": "you are now registered"
                }
        else:
            data = {
                "msg": "duplicate username"
            }

        return data

class Login(Resource):
    # this function takes the username and password in a post method and then checks the db for the user and if found
    # it verifies the password the user is saved in the session and the session value loggedIn is set to true.
    def post(self):

        username = request.json['username']
        password = request.json['password']
        print(username + " pass: " + password)

        data = Users.get(self, username)
        empty = {
            "msg": "no users"
        }
        if data == empty:
            session["loggedIn"] = False
            session["username"] = ""
        else:
            if data[0]["password"] == password:
                session["loggedIn"] = True
                session["username"] = data[0]["username"]
                data = {
                    "username": session["username"],
                    "loggedIn": session["loggedIn"],
                    "userId": data[0]["id"],
                    "msg": "Successfully logged in"
                }
            else:
                session["loggedIn"] = False
                session["username"] = data[0]["username"]
                data = {
                    "username": session["username"],
                    "loggedIn": session["loggedIn"],
                    "msg": "Incorrect password"
                }
        print(session["username"])
        print(session["loggedIn"])
        return data


class Items(Resource):

    def get(self, userID):
        placer = mysql.get_db().cursor()
        sql = ("SELECT * FROM items WHERE userID LIKE (%s)")
        result = placer.execute(sql, [userID])
        if result > 0:
            data = placer.fetchall()
        else : data = {
            "msg": "no items"
        }
        placer.close()
        return data

    def post(self, userID):
        placer = mysql.get_db().cursor()
        _userId = int(userID)
        item_name = str(request.json['itemName'])
        item_description = str(request.json['itemDescription'])
        item_link = str(request.json['itemLink'])
        item_price = float(request.json['itemPrice'])

        sql = ("INSERT INTO items (userId, itemName, itemDescription, itemLink, itemPrice)"
               " VALUES (%s, %s, %s, %s, %s)")
        params = [_userId, item_name, item_description, item_link, item_price]
        placer.execute(sql, params)
        mysql.get_db().commit()
        placer.close()
        return "success"
        # def deleteId(self, itemID):
        
class Users(Resource):

    # this is the api endpoint for getting a user from the database
    def get(self, username):
        placer = mysql.get_db().cursor()
        sql = ("SELECT * FROM users WHERE username LIKE (%s)")
        result = placer.execute(sql, [username])
        if result > 0:
            data = placer.fetchall()
        else:
            data = {
                "msg": "no users"
            }
        placer.close()
        return data

    # this is this endpoint for adding a user to the database
    # this needs to still check that the user is not already in the database before adding
    # usernames must be unique
    def post(self, username):
        placer = mysql.get_db().cursor()
        _username = str(username)
        first_name = str(request.json['firstName'])
        email = str(request.json['email'])
        last_name = str(request.json['lastName'])
        password = str(request.json['password'])

        sql = ("INSERT INTO users (username, email, firstname, lastname, password)"
               " VALUES (%s,%s,%s,%s,%s)")
        params = [_username, email, first_name, last_name, password]
        placer.execute(sql, params)
        mysql.get_db().commit()
        placer.close()
        return "success"

    # this is the delete route for the db
    # this checks if the user is in the db then it removes them
    def delete(self, username):
        placer = mysql.get_db().cursor()
        sql = ("SELECT * FROM users WHERE username LIKE (%s)")
        result = placer.execute(sql, [username])
        data = {
            "msg": "user not found"
        }
        if result > 0:
            sql2 = ("DELETE FROM users WHERE username= (%s)")
            placer.execute(sql2, [username])
            data = {
                "msg": "user deleted"
            }
            mysql.get_db().commit()
        placer.close()

        return data


# this is the route for the user things in the database the methods are defined in the class called Users above
api.add_resource(Users, "/user/<string:username>")
api.add_resource(Items, "/items/<int:userID>")
api.add_resource(Login, "/login")
api.add_resource(Signup, "/signup")
# Confiq Mysql
app.config["MYSQL_DATABASE_HOST"] = "phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
app.config["MYSQL_DATABASE_USER"] = "tv46rwbi8adoj2md"
app.config["MYSQL_DATABASE_PASSWORD"] = "tbjwty26y82u9rts"
app.config["MYSQL_DATABASE_DB"] = "y3fd3bb0x7gmyzqc"
app.config["MYSQL_CURSORCLASS"] = pymysql.cursors.DictCursor

# init MySql
mysql.init_app(app)
db = mysql.connect()


@app.route("/")
def index():
    return 'Index'


if __name__ == '__main__':
    app.run(debug=True)
