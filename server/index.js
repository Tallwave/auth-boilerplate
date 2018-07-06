'use strict';

const Glue = require('glue');
const Manifest = require('./manifest');

exports.deployment = async (start) => {
  const manifest = Manifest.get('/', process.env);
  const server = await Glue.compose(manifest, { relativeTo: __dirname });

  await server.initialize();

  if (!start) {
    return server;
  }
  await server.start();
  /* eslint-disable no-console */
  console.log(`Server started at ${server.info.uri}`);
  /* eslint-enable */

  return server;
};

if (!module.parent) {
  exports.deployment(true);

  process.on('unhandledRejection', (err) => {
    throw err;
  });
}
