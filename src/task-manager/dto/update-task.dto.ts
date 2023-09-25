/* eslint-disable new-cap */
import {IsEnum, IsString} from 'class-validator';
import {TaskStatus} from '../../types';

export class UpdateTaskDto {
    @IsString()
      title: string;

    @IsString()
      description: string;

    @IsEnum(TaskStatus)
      status: TaskStatus;
}
