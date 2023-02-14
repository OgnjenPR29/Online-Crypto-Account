CREATE DATABASE crypto_exchange;
use crypto_exchange;

CREATE TABLE users(
    Email varchar(50) not null,
    First_name varchar(100) not null,
    Last_name varchar(100) not null,
    Address varchar(100) not null,
    City varchar(100) not null,
    Country varchar(100) not null,
    Phone varchar(15) not null,
    Pass char(64) not null,
    JWT_token tinyint(1) not null,
    Dollar decimal(19,9) not null,
    BTC decimal(19,9) not null,
    ETH decimal(19,9) not null,
    BNB decimal(19,9) not null,
    DOGE decimal(19,9) not null,
    XRP decimal(19,9) not null,
    PRIMARY KEY (Email)
);

CREATE TABLE transactions(
    Transaction_ID char(64) not null,
    Sender varchar(50) not null,
    Reciever varchar(50) not null,
    Amount decimal(19,9) not null,
    Currency varchar(10) not null,
    Time_stamp timestamp not null,
    PRIMARY KEY(Transaction_ID),
    FOREIGN KEY(Sender) REFERENCES users(Email),
    FOREIGN KEY(Reciever) REFERENCES users(Email)
);
