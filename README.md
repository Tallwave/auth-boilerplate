# auth-boilerplate

# Description
A shell for a hapi and bell powered auth system. (Boiler plate for log in and authentication).

# Tech Stack
Node

# Quick Start
1. Fork the main [Tallwave/auth-boilerplate](https://github.com/Tallwave/auth-boilerplate)
2. Clone the repo to your local machine
```js
$ git clone git@github.com:<YourRepo>/auth-boilerplate.git
```
3. Ensure you have node version greater than 8. Update if necessary

4. Install the node modules with yarn (takes care of all dependencies as specified in the yarn.lock file -- see note below if you don't have yarn):
```
yarn install
```
5. Rename the .env-keep to .env and add the environment variables:
 - AUTH_COOKIE_PASSWORD
 Set up an [oauth account](https://github.com/hapijs/bell/blob/master/API.md) and follow the instructions on how to get a cookie password
To set up additional Google provider keys, see the [Auth0 docs](https://auth0.com/docs/connections/social/devkeys)
 - GOOGLE_CLIENT_ID
 - GOOGLE_CLIENT_SECRET

6. Ensure the server code is running on another terminal

7. Run all the tests to ensure everything is passing
```
yarn test
```

# Plugins
 - bell
 - hapi-auth-cookie
 - auth (custom)

# Project Structure
/lib
  /auth
  /routes
  .hc.js
  index
/server
  index
  manifest
/test
  index

# Database(s)

# License
ISC

# Contributors
Scott Williams (main author)
Tina Heiligers