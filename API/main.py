from flask import Flask, jsonify, request
from flaskext.mysql import MySQL
from API.dataBase import db
from Models.transactionModel import Transactions, TransactionsSchema, NewTransactionSchema
from Models.UserModel import Users, UsersScheme, UsersRegScheme, UserLoginScheme, GetScheme
from flask_restx import Namespace, Resource, fields
from datetime import datetime, timedelta
from marshmallow import ValidationError
from functools import wraps
from time import sleep
from multiprocessing import Queue, Process
from flask_cors import CORS, cross_origin
import jwt
import hashlib
import sha3
import json
import random

app = Flask(__name__)
cors = CORS(app)
mysql = MySQL()
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'lozinka1234'
app.config['MYSQL_DATABASE_DB'] = 'crypto_exchange'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
mysql.init_app(app)
mysql.init_app(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:lozinka1234@127.0.0.1:3307/crypto_exchange'
db.init_app(app)

api = Namespace('user', description='Users related operations')
SECRET_KEY = "flask-app-secret-key"

card_expiration = "02/23"
date_format = "%m/%y"
card_expiration_date = datetime.strptime(card_expiration, date_format)
security_code_card = "123"
card_number = "4242 4242 4242 4242"

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        data = None
        token = None
        # jwt is passed in the request header
        if 'Authorization' in request.headers:
            data = request.headers['Authorization']
            token = str.replace(str(data), 'Bearer ', '')
            # return 401 if token is not passed
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = Users.query.filter(Users.Email.like(data['email'])).first()
        except:
            return jsonify({'message' : 'Token is invalid !!'}), 401
        # returns the current logged in users contex to the routes
        return f(*args, **kwargs)
    return decorated

@app.route('/register', methods=['POST'])
@cross_origin()
def post_reg():

    req_data = request.get_json()

    schemaReg = UsersRegScheme()
    try:
        schemaReg.load(req_data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    _email = req_data.get("Email")
    _first_name = req_data.get("First_Name")
    _last_name = req_data.get("Last_Name")
    _address = req_data.get("Address")
    _city = req_data.get("City")
    _country = req_data.get("Country")
    _phone = req_data.get("Phone")
    _password = req_data.get("Password")


    user_exists = Users.query.filter(Users.Email.like(_email)).first()
    if user_exists:
        return {"success": False,
                "msg": "Email already taken"}, 400
    token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, SECRET_KEY)

    new_user = Users(_email, _first_name, _last_name, _address, _city, _country, _phone, _password, True, 0, 0, 0, 0, 0, 0)

    new_user.set_password(_password)
    new_user.save()

    return {"success": True,
            "userID": new_user.Email,
            "token" : token,
            "msg": "The user was successfully registered"}, 200


@app.route('/login', methods=['POST'])
@cross_origin()
def post_log():

    req_data = request.get_json()

    schemaUser = UserLoginScheme()
    try:
        schemaUser.load(req_data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    _email = req_data.get("Email")
    _password = req_data.get("Password")

    user_exists = Users.query.filter(Users.Email.like(_email)).first()
    schema = UsersScheme()
    user = schema.dump(user_exists)



    if not user_exists:
        return {"success": False,
                "msg": "This email does not exist."}, 400

    hash_pass = hashlib.sha256(_password.encode('utf-8')).hexdigest()
    if not user["Pass"] == hash_pass:
        return {"success": False,
                "msg": "Wrong credentials."}, 400

        # create access token uwing JWT
    token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, SECRET_KEY)
    user_exists.set_jwt_auth_active(True)
    user_exists.save()

    return {"success": True,
            "token" : token,
            "msg": "The user was successfully loged in"}, 200

@app.route('/edit', methods = ['POST'])
@cross_origin()
@token_required
def post_edit():

    req_data = request.get_json()

    _email = req_data.get("Email")
    _new_first_name = req_data.get("First_Name")
    _new_last_name = req_data.get("Last_Name")
    _new_address = req_data.get("Address")
    _new_city = req_data.get("City")
    _new_country = req_data.get("Country")
    _new_phone = req_data.get("Phone")
    _new_password = req_data.get("Password")

    user_exists = Users.query.filter(Users.Email.like(_email)).first()

    schemaUser = UsersRegScheme()
    try:
        schemaUser.load(req_data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    if _new_first_name:
        user_exists.update_first(_new_first_name)

    if _new_last_name:
        user_exists.update_last(_new_last_name)

    if _new_city:
        user_exists.update_city(_new_city)

    if _new_address:
        user_exists.update_adress(_new_address)

    if _new_phone:
        user_exists.update_phone(_new_phone)

    if _new_password:
        user_exists.set_password(_new_password)

    if _new_country:
        user_exists.update_country(_new_country)

    user_exists.save()

    return {"success": True}, 200

@app.route('/transactions/<email>')
@cross_origin()
@token_required
def get_transacions(email):
    data = Transactions.query.filter(Transactions.Sender.like(str(email))).all()
    data += Transactions.query.filter(Transactions.Reciever.like(str(email))).all()
    schema = TransactionsSchema(many=True)
    transactions = schema.dump(data)
    return jsonify(transactions)

@app.route('/payment', methods = ['POST'])
@cross_origin()
@token_required
def buy_currency():
    req_data = request.get_json()
    email = req_data.get("Email")
    amount = req_data.get("Amount")
    currency = req_data['Currency']
    data = Users.query.filter(Users.Email.like(email)).first()

    if not data:
        return{"success": False,
                "msg": "This email does not exist"},400

    data.update_currency(currency,amount)
    data.save()

    return jsonify({"msg": "Successfully added",
            "success":True
    }),200

@app.route('/convert', methods = ['POST'])
@cross_origin()
@token_required
def convert():
    req_data = request.get_json()
    email = req_data.get("Email")
    currency1 = req_data.get("Currency1")
    currency2 = req_data.get("Currency2")
    amount = req_data.get("Amount")
    excRate = req_data.get("ExcRate")

    data = Users.query.filter(Users.Email.like(email)).first()
    schema = GetScheme()
    user = schema.dump(data)

    if not data:
        return {"success": False,
                "msg": "This email does not exist"}, 400

    currency1_amount = amount*excRate;

    if not currency1_amount <= user[currency1]:
        return {"success": False,
                "msg": "You dont have enough "+  currency1.lower()
        }

    data.update_currency(currency2, amount)
    data.update_currency(currency1, -currency1_amount)

    data.save()

    return{"success": True,
           "msg": "Successfully exchanged"

    }

@app.route('/<email>')
@cross_origin()
@token_required
def show_state(email):
    data = Users.query.filter(Users.Email.like(email)).first()

    if not data:
        return{"success": False,
                "msg": "This email does not exist"},400

    schema = GetScheme()
    user = schema.dump(data)
    return user

@app.route('/transactions', methods=['POST'])
@cross_origin()
@token_required
def new_transaction():
    transaction = request.get_json()
    schemaTransaction = NewTransactionSchema()

    try:
        schemaTransaction.load(transaction)
    except ValidationError as err:
        return jsonify(err.messages), 400

    queue = Queue()
    p = Process(target=do_transaction, args=[transaction, queue])
    p.start()
    return queue.get()


def do_transaction(transaction, queue):
    sleep(10)
    with app.app_context():
        reciever_exists = Users.query.filter(Users.Email.like(transaction.get("Reciever"))).first()

        if not reciever_exists:
            queue.put({"status": 'rejected'})
            return

        sender_exists = Users.query.filter(Users.Email.like(transaction.get("Sender"))).first()

        if not sender_exists:
            queue.put({"status": 'rejected'})
            return

        schemaUser = UsersScheme()
        sender = schemaUser.dump(sender_exists)
        currency = transaction['Currency']
        amount = transaction['Amount']

        if sender[currency] >= amount:
            sender_exists.update_currency(currency, -amount)
        else:
            queue.put({"status": 'rejected'})
            return

        reciever_exists.update_currency(currency, amount)

        transaction_hash = transaction
        transaction_hash['int'] = random.randint(1, 1000000)
        del transaction_hash["Currency"]

        hash_value = sha3.keccak_256()
        hash_value.update(json.dumps(transaction_hash).encode('utf-8'))

        time_stamp = datetime.today().strftime('%Y-%m-%d %H:%M:%S')

        new_transaction = Transactions(hash_value.hexdigest(), sender_exists.Email, reciever_exists.Email, amount, currency,
                                   time_stamp)
        db.session.add(new_transaction)
        db.session.commit()

        queue.put({"status": 'approved'})
        return


@app.route('/card_validate', methods=['POST'])
@cross_origin()
def card_validate():
    data_card = request.get_json()
    c_number = data_card['CardNumber']
    c_code = data_card['CardCode']
    current_date = datetime.now();

    if current_date > card_expiration_date:
        return {'status': 'failed', 'message': 'Card expired'}, 400
    elif c_number != card_number or c_code != security_code_card:
        return {"success": False}, 400
    return {"success":True}, 200

if __name__ == "__main__":
    app.run(port=5002, debug=True)