import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { main, tasksRoutes, version } from './routes/tasks.routes';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateTaskAditionalDto } from './dto/update-task-aditional.dto';
import { AditionalTaskService } from './aditionalTask.service';

@Controller(`${version}${main}`)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly aditionalTaskService: AditionalTaskService,
  ) {}

  @Post(tasksRoutes.post_tasks)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get(tasksRoutes.get_tasks_user)
  @ApiOperation({ summary: 'Get all tasks by user' })
  @ApiParam({
    name: 'term',
    required: true,
    description: 'Email or cellphone number of the user',
  })
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
  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiParam({ name: 'id', required: true, description: 'Id of the task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Get(tasksRoutes.get_task_id_app)
  @ApiOperation({ summary: 'Get a task by id and id of the application' })
  @ApiResponse({ status: 200, description: 'Task found successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOneByIdApp(
    @Param('idapp') id_app: string,
    @Param('userId') userId: number,
  ) {
    return this.tasksService.searchTaskByIdApp(id_app, +userId);
  }

  @Patch(tasksRoutes.assign_task_aditional)
  @ApiOperation({ summary: 'Assign additional information to a task' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of the task or aditional data',
  })
  @ApiBody({
    type: UpdateTaskAditionalDto,
    required: true,
    description: 'Additional data to assign to the task',
  })
  @ApiResponse({
    status: 200,
    description: 'Additional data assigned successfully',
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  assignAditional(
    @Param('id') id: string,
    @Body() updateTaskAditionalDto: UpdateTaskAditionalDto,
  ) {
    return this.aditionalTaskService.assignAditional(
      +id,
      updateTaskAditionalDto,
    );
  }
}
