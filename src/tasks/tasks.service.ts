import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SupabaseService } from 'src/database/supabase.service';
import { Task } from './entities/task.entity';
import { HttpResponse } from 'src/users/types/http-response';
import { TaskNotFoundException } from './exceptions/task-not-found';
import { UsersService } from 'src/users/users.service';
import { UserNotFoundException } from 'src/shared/exceptions/users/user-not-found';

@Injectable()
export class TasksService {

  constructor(private readonly supabaseConnection: SupabaseService, 
    private readonly usersService: UsersService) { }
  async create(createTaskDto: CreateTaskDto): Promise<HttpResponse<string>> {
    try {
      const data = await this.usersService.getUserById(createTaskDto.userId);

      if (!data) {
        throw new NotFoundException(`User not found with id: ${createTaskDto.userId}`);
      }

      const { error } = await this.supabaseConnection
        .getClient()
        .from('tasks')
        .insert(createTaskDto);

      if (error) {
        throw new Error(`Error to create Task: ${error.message}`);
      }

      return { httpStatus: HttpStatus.OK, response: 'Task created successfully' };
    }
    catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`${error.message}`);
    }
  }

  async findAllByUser(term: string): Promise<HttpResponse<Task[]>> {
    try {
      const { data, error } = await this.supabaseConnection
        .getClient()
        .from('tasks')
        .select(`
    id, 
    title, 
    description, 
    priority, 
    completed, 
    userId,
    users (
      id,
      email,
      celphone
    )
      `)
        .or(`email.eq.${term},celphone.eq.${term}`, { referencedTable: 'users' })

      if (error) {
        throw new Error(`Error to search User: ${error.message}`);
      }

      if (!data) {
        throw new UserNotFoundException(term);
      }

      return { httpStatus: HttpStatus.OK, response: data };
    }
    catch (error) {
      if (error instanceof UserNotFoundException) {
        throw error;
      }
      throw new Error(`${error.message}`);
    }
  }

  async findOne(id: number): Promise<HttpResponse<Task>> {
    try {
      const { data, error } = await this.supabaseConnection
        .getClient()
        .from('tasks')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(`Error to search Task: ${error.message}`);
      }

      if (!data) {
        throw new TaskNotFoundException(id);
      }

      return { httpStatus: HttpStatus.OK, response: data };
    }
    catch (error) {
      if (error instanceof TaskNotFoundException) {
        throw error;
      }
      throw new Error(`${error.message}`);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<HttpResponse<string>> {
    try {
      const { httpStatus } = await this.findOne(id);

      if (httpStatus !== HttpStatus.OK) {
        throw new TaskNotFoundException(id);
      }

      const { error } = await this.supabaseConnection
        .getClient()
        .from('tasks')
        .update(updateTaskDto)
        .eq('id', id);

      if (error) {
        throw new Error(`Error to update Task: ${error.message}`);
      }

      return { httpStatus: HttpStatus.OK, response: 'Task updated successfully' };
    }
    catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async remove(id: number): Promise<HttpResponse<string>> {
    try {
      const { httpStatus } = await this.findOne(id);

      if (httpStatus !== HttpStatus.OK) {
        throw new TaskNotFoundException(id);
      }

      const { error } = await this.supabaseConnection
        .getClient()
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Error to delete Task: ${error.message}`);
      }

      return { httpStatus: HttpStatus.OK, response: 'Task deleted successfully' };
    }
    catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
