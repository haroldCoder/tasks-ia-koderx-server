import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { main, tasksRoutes, version } from './routes/tasks.routes';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller(`${version}${main}`)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(tasksRoutes.post_tasks)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 200, description: 'Task created successfully' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get(tasksRoutes.get_tasks_user)
  @ApiOperation({ summary: 'Get all tasks by user' })
  @ApiParam({ name: 'term', required: true, description: 'Email or cellphone number of the user' })
  @ApiResponse({ status: 200, description: 'Tasks found successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findAll(@Param('term') term: string) {
    return this.tasksService.findAllByUser(term);
  }

  @Get(tasksRoutes.get_task)
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiParam({ name: 'id', required: true, description: 'Id of the task' })
  @ApiResponse({ status: 200, description: 'Task found successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(tasksRoutes.patch_tasks)
  @ApiOperation({ summary: 'Update a task by id' })
  @ApiParam({ name: 'id', required: true, description: 'Id of the task' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(tasksRoutes.delete_tasks)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
