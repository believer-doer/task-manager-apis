import compression from 'compression';
import express, {NextFunction, Request, Response} from 'express';
import helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import {LogCat as Logger} from './logger';
import TaskManagerService from './task-manager/task.manager.service.ts';
import TaskManagerController from './task-manager/task-manager.controller';

const logger = Logger.getInstance();
// Creates and configures an ExpressJS web server.
class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(express.json({limit: '1mb'}));
    this.express.use(express.urlencoded({extended: false}));
    this.express.use(helmet());
    this.express.use(compression());
  }

  // Configure API endpoints.
  private routes(): void {
    const app = this.express;
    const taskManagerService = new TaskManagerService();
    const taskManagerController = new TaskManagerController(taskManagerService);
    app.use('/', taskManagerController.app);
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      logger.error(JSON.stringify(err));
    });

    // Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().express;
