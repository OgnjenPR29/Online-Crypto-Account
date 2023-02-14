from API.dataBase import db
from marshmallow import Schema, fields
import hashlib


class Users(db.Model):
    Email = db.Column(db.String(50), primary_key=True)
    First_name = db.Column(db.String(100), nullable=False)
    Last_name = db.Column(db.String(100), nullable=False)
    Address = db.Column(db.String(100), nullable=False)
    City = db.Column(db.String(100), nullable=False)
    Country = db.Column(db.String(100), nullable=False)
    Phone = db.Column(db.String(64), nullable=False)
    Pass = db.Column(db.Text())
    JWT_token = db.Column(db.Boolean())
    Dollar = db.Column(db.Float(), nullable=False)
    BTC = db.Column(db.Float(), nullable=False)
    ETH = db.Column(db.Float(), nullable=False)
    BNB = db.Column(db.Float(), nullable=False)
    DOGE = db.Column(db.Float(), nullable=False)
    XRP = db.Column(db.Float(), nullable=False)


    def __init__(self, email, firs, last, add, city, country, phone, pas, token, dollar, btc, eth, bnb, dodge,xrp):
        self.Email = email
        self.First_name = firs
        self.Last_name = last
        self.Address = add
        self.City = city
        self.Country = country
        self.Phone = phone
        self.Pass = pas
        self.JWT_token = token
        self.Dollar = dollar
        self.DOGE = dodge
        self.BNB = bnb
        self.BTC = btc
        self.ETH = eth
        self.XRP = xrp

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.Pass = hashlib.sha256(password.encode('utf-8')).hexdigest()

    def set_jwt_auth_active(self, set_status):
        self.JWT_token = set_status

    def update_email(self, new_email):
        self.Email = new_email

    def update_first(self, new_name):
        self.First_name = new_name

    def update_last(self, new_lastn):
        self.Last_name = new_lastn

    def update_adress(self, new_address):
        self.Address = new_address

    def update_city(self, new_city):
        self.City = new_city

    def update_phone(self, new_phone):
        self.Phone = new_phone

    def update_country(self, new_country):
        self.Country = new_country
    def update_currency(self, currency, amount):
        if currency == 'Dollar':
            self.Dollar += amount
        elif currency == 'BTC':
            self.BTC += amount
        elif currency == 'DOGE':
            self.DOGE += amount
        elif currency == 'BNB':
            self.BNB += amount
        elif currency == 'XRP':
            self.XRP += amount
        elif currency == 'ETH':
            self.ETH += amount

    def get_by_email(self, email):
        return self.Email, self.First_name, self.Last_name, self.Address, self.City, self.Country, self.Phone, self.DOGE, self.BNB, self.BTC, self.ETH, self.XRP


class UsersRegScheme(Schema):
    Email = fields.Str()
    First_Name = fields.Str()
    Last_Name = fields.Str()
    Address = fields.Str()
    City = fields.Str()
    Country = fields.Str()
    Phone = fields.Str()
    Password = fields.Str()

class UsersScheme(Schema):
    Email = fields.Str()
    FirstName = fields.Str()
    LastName = fields.Str()
    Address = fields.Str()
    City = fields.Str()
    Country = fields.Str()
    Phone = fields.Str()
    Pass = fields.Str()
    JWT_token = fields.Boolean()
    Dollar = fields.Float()
    DOGE = fields.Float()
    BNB = fields.Float()
    BTC = fields.Float()
    ETH = fields.Float()
    XRP = fields.Float()

class UserLoginScheme(Schema):
    Email = fields.Str()
    Password = fields.Str()

class GetScheme(Schema):
    Email = fields.Str()
    First_name = fields.Str()
    Last_name = fields.Str()
    Address = fields.Str()
    City = fields.Str()
    Country = fields.Str()
    Phone = fields.Str()
    Dollar = fields.Float()
    DOGE = fields.Float()
    BNB = fields.Float()
    BTC = fields.Float()
    ETH = fields.Float()
    XRP = fields.Float()