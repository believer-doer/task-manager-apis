import {validateSync} from 'class-validator';
import {plainToInstance} from 'class-transformer';
import {Request, Response, NextFunction} from 'express';
import httpStatusCode from 'http-status-codes';

export enum RequestProperty {
    Params = 'params',
    Query = 'query',
    Body = 'body'
}

export class ValidationMiddleware {
  public static validateDto = (
      requestProperty: RequestProperty,
      DtoClass: any,
  ) => {
    return (request: Request, response: Response, next: NextFunction) => {
      const dto = plainToInstance(DtoClass, request[requestProperty]);
      const errors = validateSync(dto);
      if (errors.length > 0) {
        response.status(httpStatusCode.UNPROCESSABLE_ENTITY).json(
            {message: JSON.stringify(Object.values(errors[0].constraints)[0])}
        );
      } else {
        next();
      }
    };
  };
}
