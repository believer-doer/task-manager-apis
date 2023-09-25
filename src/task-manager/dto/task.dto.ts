/* eslint-disable new-cap */
import {IsEnum, IsOptional, IsString} from 'class-validator';
import {TaskStatus} from '../../types';

export class TaskDto {
    @IsString()
      title: string;

    @IsString()
      description: string;

    @IsOptional()
    @IsEnum(TaskStatus)
      status: TaskStatus;
}
