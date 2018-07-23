# auth-boilerplate

# Description
A shell for a hapi and bell powered auth system using JWT and cookies for session storage. (Boiler plate for log in and authentication).
The server is composed with Glue while the plugin composition is handled by [haute-courture](https://www.npmjs.com/package/haute-couture). Haute-couture uses a file-based indexing system:
For example:
Route configurations placed in your routes/ directory will be registered using server.route().
Authentication scheme(s) in auth/schemes.js rather than calling server.auth.scheme().
Plugins are placed in the plugins/ folder and the file name takes it's name from the plugin package with contents of `module.exports = {}` if no configurations need be set.


Two methods of authentication are implemented: username and password (with the username as an email address) and login with Google. Both methods generate a JWT and return the token as both a header with 'Authorization', 'jwt ${userJWTtoken}' and a session cookie.

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
5. Review [Google's OAuth 2.0 documentation](https://developers.google.com/identity/protocols/OAuth2).
6. Create a Google OAuth application, if necessary. (see [oauth](#oauth))
7. Rename the .env-keep to .env and add the environment variables:

 - `AUTH_COOKIE_PASSWORD` - This can be anything. When deploying to a production environment, use a strong value. There is a minimum length of 32 characters.
 

 Set up an [oauth account](https://github.com/hapijs/bell/blob/master/API.md) and follow the instructions on how to get a cookie password
To set up additional Google provider keys, see the [Auth0 docs](https://auth0.com/docs/connections/social/devkeys)

 - `GOOGLE_CLIENT_ID`
 - `GOOGLE_CLIENT_SECRET`

To set up JWT:

- `JWT_PASSWORD` - This can be anything. Use a string password with a minimum of 32 characters (alphanumeric)

8. Ensure the server code is running on another terminal

9. Run all the tests to ensure everything is passing
```
yarn test
```

# Plugins
 - bell
 - hapi-auth-jwt2

# OAuth
An application registered with Google is required for Google's OAuth to work. An application can be created by navigating to their [API console](https://console.developers.google.com/apis) and clicking "Create a Project". The project is where the authentication screen can be customized.

Projects can have multiple credentials associated with them. Click on the "Create Credential" button and create an "OAuth client ID". 

Select "Web application" from the Application type list.

Provide the application with a name and enter valid URLs for the JavaScript origins and redirect URIs fields. The origin URL is what will be sending the request to google. For this example that will be `http://localhost:4000`.

The redirect URI is similar, and must match what is configured in the routes, in this example it is `http://localhost:4000/auth/google`.

Click the Create button to create the Client ID and Client Secret tokens and add them to your `.env` file.

# Project Structure
```
/lib
  /auth
  /cookies
  /plugins
  /routes
  .hc.js
  index
/server
  index
  manifest
/test
/utils
  index
```

# Tests
This project uses [lab](https://github.com/hapijs/lab) as the testing framework and [code](https://github.com/hapijs/code) as the assertion library.

Lab and code are only compatible with Node.js v8+.

All test files need to be within the test folder. 

If you're new to testing within the Hapi17 ecosystem, there are great tutorials on [futureStudio](https://futurestud.io/tutorials/hapi-getting-started-with-testing-using-lab-and-code) to help get you started.

The API docs for expectations with code are [here](https://github.com/hapijs/code/blob/HEAD/API.md#equalvalue-options)

# Contributors
* Scott Williams
* Tina Heiligers
