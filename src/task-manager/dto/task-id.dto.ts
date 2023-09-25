/* eslint-disable new-cap */
import {IsString} from 'class-validator';

export class TaskIdDto {
    @IsString()
      id: string;
}
