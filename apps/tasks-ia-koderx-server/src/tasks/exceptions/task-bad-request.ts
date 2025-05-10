import { BadRequestException } from "@nestjs/common";

export class TasksBadRequestException extends BadRequestException {
  constructor(msg: string) {
    super(msg);
  }
}