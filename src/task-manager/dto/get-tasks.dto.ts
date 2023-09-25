/* eslint-disable new-cap */
import {IsOptional, IsString} from 'class-validator';

export class GetTasksDto {
    @IsOptional()
    @IsString()
      seed: string;

    @IsOptional()
    @IsString()
      count: string;
}
