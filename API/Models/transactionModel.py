from API.dataBase import db
from marshmallow import Schema, fields


class Transactions(db.Model):
    Transaction_ID = db.Column(db.Text(), primary_key=True)
    Sender = db.Column(db.String(50), nullable=False)
    Reciever = db.Column(db.String(50), nullable=False)
    Amount = db.Column(db.Float(), nullable=False)
    Currency = db.Column(db.String(10), nullable=False)
    Time_stamp = db.Column(db.DateTime(), nullable=False)

    def __init__(self, tid, s, r, a, c, ts):
        self.Transaction_ID = tid
        self.Sender = s
        self.Reciever = r
        self.Amount = a
        self.Currency = c
        self.Time_stamp = ts

        def __repr__(self):
            return '<Student %r>' % self.Sender


class TransactionsSchema(Schema):
    Transaction_ID = fields.Str()
    Sender = fields.Str()
    Reciever = fields.Str()
    Amount = fields.Number()
    Currency = fields.Str()
    Time_stamp=fields.DateTime()

class NewTransactionSchema(Schema):
    Sender = fields.Str(required=True)
    Reciever = fields.Str(required=True)
    Amount = fields.Number(required=True)
    Currency = fields.Str(required=True)