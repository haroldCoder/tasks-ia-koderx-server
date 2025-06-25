import { BadRequestException, HttpStatus } from "@nestjs/common";


export class TaskAditionalBadRequestException extends BadRequestException {
  constructor(message: string) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Task Aditional Bad Request: ${message}`,
      error: 'Bad Request',
    });
  }
}