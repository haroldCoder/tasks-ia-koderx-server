import { NotFoundException } from '@nestjs/common';

class TaskNotFoundException extends NotFoundException {
  constructor(id: number | string) {
    super(`Task not found: ${id}`);
  }
}

export { TaskNotFoundException };
