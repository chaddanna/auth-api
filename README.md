# Boilerplate Node Server
A Node, Express + Mongo auth server. Uses babel to allow for ES6+ development.

## Setup:
1. You will need a running MongoDB server.
2. `git clone https://github.com/chaddanna/auth-api.git`
3. `cd auth-api`
4. `yarn install`
5. I have provided `example-config.js`. You can use this to create a `config.js` that provides a secret key to be used with password encryption.

## Usage:
1. `yarn start` (Development: `yarn run dev`)
2. Available routes:
  * `app.get('/')`
  * `app.post('/signup')`
  * `app.post('/signin')`
