# banka

Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.

[![Coverage Status](https://coveralls.io/repos/github/olayinkaraheem/banka/badge.svg?branch=develop)](https://coveralls.io/github/olayinkaraheem/banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/8839f1b0d014ba8c6bd8/maintainability)](https://codeclimate.com/github/olayinkaraheem/banka/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/8839f1b0d014ba8c6bd8/test_coverage)](https://codeclimate.com/github/olayinkaraheem/banka/test_coverage) [![Build Status](https://travis-ci.org/olayinkaraheem/banka.svg?branch=develop)](https://travis-ci.org/olayinkaraheem/banka)

**UI template:** (https://olayinkaraheem.github.io/banka/)

**API Link** (https://app-banka.herokuapp.com)

**Pivotal Tracker Link** (https://www.pivotaltracker.com/n/projects/2320535)

## Built With

- [Express](https://expressjs.com)
- [Node.js](https://nodejs.org/en/)
- [HTML5]()
- [CSS3]()

## Installation

1. Download and install [Node.js](https://nodejs.org/en/)

1. Clone project

```bash
    > git clone https://github.com/olayinkaraheem/banka.git
```
3. Install Dependencies

```bash
    > npm install
```
4. Run project
```bash
    > npm start
```

## Features

- **Client/User** can sign up.
- **Client/User** can login.
- **Client/User** can create a bank account.
- **Cashier/Staff** can debit a user's bank account.
- **Cashier/Staff** can credit user (client) account.
- **Admin/Staff** can activate or deactivate an account.
- **Admin/Staff** can delete an account.

## Tools
- [Travis CI](https://travis-ci.org)
- [Codeclimate](https://codeclimate.com)
- [Coveralls](https://coveralls.io)

## API Routes

| Description        | HTTP Method | Endpoints                               |
| ----------------------- | ----------- | ------------------------------------ |
|       Sign up User        | POST        | /api/v1/auth/signup                  |
|        Log in User        | POST        | /api/v1/auth/signin                  |
|   Create a bank account   | POST        | /api/v1/accounts                     |
|  Activate a bank account  | PATCH       | /api/v1/accounts/account-number      |
| Deactivate a bank account | PATCH       | /api/v1/accounts/{account-number}    |
|   Delete a bank account   | DELETE      | /api/v1/accounts/{account-number}    |
|   Credit a bank account   | POST        | /api/v1/transactions/account-number/credit |
|   Debit a bank account    | POST         | /api/v1/transactions/account-number/debit |

## Sample Payloads
### User Signup
```json
{
    "email": "user2@mail.com",
    "firstName": "Smith",
    "lastName": "Rex",
    "password": "userpass@421",
    "type": "client",
    "isAdmin": false,
    "created_at": "2019-04-07 07:00:43",
    "updated_at": ""
}
```
### User Signin
```json
{
    "email": "admin@banka.com",
    "password": "adminpass@421"
}
```
### Create Account
```json
{
    "owner": 3,
    "type": "current"
}
```
### Deactivate Account
```json
{
    "userId": 1,
    "status": "dormant"
}
```
### Activate Account
```json
{
    "userId": 1,
    "status": "active"
}
```
### Delete Account
```json
{
    "userId": 1,
    "status": "deleted"
}
```
### Debit Transaction
```json
{
    "amount": "3000.00",
    "cashier": 2,
    "type": "debit"
}
```
### Credit Transaction
```json
{
    "amount": "5000.00",
    "cashier": 2,
    "type": "credit"
}
```
### Sample Params
```json
Account number: 1233445642
```


## License

&copy; Olayinka Raheem