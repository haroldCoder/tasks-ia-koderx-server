import { NotFoundException } from "@nestjs/common";

class TaskNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Task not found: ${id}`);
  }
}

export { TaskNotFoundException };