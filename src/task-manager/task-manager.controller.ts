
import express from 'express';
import httpStatusCodes from 'http-status-codes';
import TaskManagerService from './task.manager.service.ts';

export default class TaskManagerController {
  public path = '/tasks';
  public app: express.Application;
  public taskManagerService : TaskManagerService;

  constructor(taskManagerService: TaskManagerService) {
    this.app = express();
    this.initializeRoutes();
    this.taskManagerService = taskManagerService;
  }

  public initializeRoutes() {
    this.app.post(
        `${this.path}`,
        this.addTask
    );
    this.app.get(
        `${this.path}`,
        this.getTasks
    );
    this.app.put(
        `${this.path}/:id`,
        this.updateTask
    );
    this.app.get(
        `${this.path}/metrics`,
        this.getTasksMetrics
    );
    this.app.get(
        `${this.path}/:id`,
        this.getTaskById
    );
    this.app.delete(
        `${this.path}`,
        this.deleteTaskById
    );
  }

  private addTask = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const addTaskData = request.body;
      const result = await this.taskManagerService.addTask(addTaskData);
      response.status(httpStatusCodes.CREATED).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };

  private getTasks = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const getTasks = request.query as any;
      const result = await this.taskManagerService.getTasks(getTasks);
      response.status(httpStatusCodes.OK).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };

  private updateTask = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const taskId = request.params.id;
      const addTasksData = request.body;
      const result = await this.taskManagerService.updateTask(taskId, addTasksData);
      response.status(httpStatusCodes.OK).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };

  private getTasksMetrics = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const result = await this.taskManagerService.getTasksMetrics();
      response.status(httpStatusCodes.OK).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };

  private getTaskById = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const id = request.params.id;
      const result = await this.taskManagerService.getTaskById(id);
      response.status(httpStatusCodes.OK).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };
  private deleteTaskById = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const id = request.params.id;
      const result = await this.taskManagerService.deleteTaskById(id);
      response.status(httpStatusCodes.OK).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };
}

