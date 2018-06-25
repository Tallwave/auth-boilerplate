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
5. Review [Google's OAuth 2.0 documentation](https://developers.google.com/identity/protocols/OAuth2).
6. Create a Google OAuth application, if necessary. (see [oauth](#oauth))
7. Rename the .env-keep to .env and add the environment variables:

 - `AUTH_COOKIE_PASSWORD` - This can be anything. When deploying to a production environment, use a strong value. There is a minimum length of 32 characters.
 Set up an [oauth account](https://github.com/hapijs/bell/blob/master/API.md) and follow the instructions on how to get a cookie password
To set up additional Google provider keys, see the [Auth0 docs](https://auth0.com/docs/connections/social/devkeys)
 - `GOOGLE_CLIENT_ID`
 - `GOOGLE_CLIENT_SECRET`

8. Ensure the server code is running on another terminal

9. Run all the tests to ensure everything is passing
```
yarn test
```

# Plugins
 - bell
 - hapi-auth-cookie
 - auth (custom)

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
  /routes
  .hc.js
  index
/server
  index
  manifest
/test
  index
```

# Contributors
* Scott Williams
* Tina Heiligers
