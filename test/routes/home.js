'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Server = require('../../server');
const jwt = require('jsonwebtoken');
const mockedUsers = require('../../utils/mockuserDatabase'); // Ideally, this should be replaced with factory-created test instances
// Test shortcuts

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

const mockJWTtoken = (requestedUserName) => {
  const user = mockedUsers.find((person) => person.username === requestedUserName);
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),// setting expiration as 1 day
    id: user.id,
    username: user.username,
  }, process.env.JWT_PASSWORD);
  return token;
};

describe("routes -> '/'", () => {
  it('responds on any request', async () => {
    const server = await Server.deployment();
    const options = {
      method: 'GET',
      url: '/',
    };
    const result = await server.inject(options);
    expect(result).to.exist();
    expect(result.statusCode).to.equal(200);
  });
});
describe("routes -> '/restricted'", () => {
  it('permits authorized users to access the route', async () => {
    const server = await Server.deployment();
    const testUserName = mockedUsers[0].username; // do not do this at home folks! Use factory created instances of your user model.
    const testToken = mockJWTtoken(testUserName);
    const options = {
      method: 'GET',
      url: '/restricted',
      headers: {
        Authorization: `${testToken}`,
      },
    };
    const result = await server.inject(options);
    expect(result).to.exist();
    expect(result.statusCode).to.equal(200);
    expect(result.headers.authorization).to.equal(testToken);
    const decodedToken = jwt.verify(result.headers.authorization, process.env.JWT_PASSWORD);
    expect(decodedToken.username).to.equal(mockedUsers[0].username);
  });
  it('does not permit unauthorized users to access the route', async () => {
    const server = await Server.deployment();
    const mockJWTtoken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),// setting expiration as 1 day
      id: '2',
      username: 'someone_else@something.com',
    }, process.env.JWT_PASSWORD);
    const options = {
      method: 'GET',
      url: '/restricted',
      headers: {
        Authorization: `${mockJWTtoken}`,
      },
    };
    const result = await server.inject(options);
    expect(result).to.exist();
    expect(result.statusCode).to.equal(401);
  });
});
describe("routes -> '/auth/logout'", () => {
  it('logs users out', async () => {
    const server = await Server.deployment();
    const options = {
      method: 'GET',
      url: '/auth/logout',
    };
    const result = await server.inject(options);
    expect(result).to.exist();
    expect(result.statusCode).to.equal(200);
    expect(result.headers.authorization).to.be.null();
    expect(result.result).to.equal('Good bye!');
    expect(result.request.state).to.equal({});
  });
});
