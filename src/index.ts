import {LogCat as Logger} from './logger';
import * as http from 'http';

import App from './app';
import {setUpDb} from './database/connection';

const logger = Logger.getInstance();

const port = process.env.PORT;
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
server.setTimeout(10*1000);

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      logger.error(`${port} requires elevated privileges`);
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case 'EADDRINUSE':
      logger.error(`${port} is already in use`);
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    default:
      throw error;
  }
}

async function onListening(): Promise<void> {
  await setUpDb();
  logger.info(`Listening on ${port}`);
}

process.on('uncaughtException', (error:Error) => {
  logger.error(JSON.stringify(error));
});

process.on('unhandledRejection', (reason: string) => {
  logger.error(reason);
});
