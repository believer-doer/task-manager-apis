import {Logger} from '@tsed/logger';
import '@tsed/logger-file';

// available log levels in LogCat : ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
export class LogCat {
  private static instance: LogCat;
  private static logger: Logger;

  private constructor() {
    LogCat.logger = new Logger('task-manager-apis');
    LogCat.logger.level = 'debug';
    LogCat.logger.appenders
        .set('fileLog', {
          type: 'file',
          filename: `logs/task-manager-apis.log`,
          alwaysIncludePattern: true,
          pattern: 'yyyy-MM-dd',
          mode: 0o644,
          keepFileExt: true,
          numBackups: 10,
          layout: {
            type: 'pattern',
            pattern: '%r %p - %m',
          },
        });

    if (process.env.NODE_ENV === 'development') {
      LogCat.logger.appenders
          .set('consoleLog', {
            type: 'stdout',
          });
    }
  }

  public static getInstance() {
    if (!LogCat.instance) {
      LogCat.instance = new LogCat();
    }
    return LogCat.instance;
  }

  public trace(text: string) {
    LogCat.logger.trace(text);
  }

  public debug(text: string) {
    LogCat.logger.debug(text);
  }

  public info(text: string) {
    LogCat.logger.info(text);
  }

  public warn(text: string) {
    LogCat.logger.warn(text);
  }

  public error(text: string) {
    LogCat.logger.error(text);
  }

  public fatal(text: string) {
    LogCat.logger.fatal(text);
  }
}
