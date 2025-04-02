class TaskNotFoundException extends Error {
  constructor(id: number) {
    super(`Task not found: ${id}`);
  }
}

export { TaskNotFoundException };