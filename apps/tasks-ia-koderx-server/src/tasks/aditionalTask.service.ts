import { Controller, HttpStatus } from "@nestjs/common";


import { Injectable } from "@nestjs/common";
import { SupabaseService } from "../database/supabase.service";
import { TasksService } from "./tasks.service";
import { HttpResponse } from "../users/types/http-response";
import { TaskNotFoundException } from "./exceptions/task-not-found";
import { TaskAditionalBadRequestException } from "./exceptions/task_aditional-bad-request";

@Injectable()
export class AditionalTaskService {
    constructor(
        private readonly supabaseConnection: SupabaseService,
        private readonly tasksService: TasksService
    ) { }

    async taskExists(id: number): Promise<boolean> {
        try {
            const { httpStatus } = await this.tasksService.findOne(id);
            return httpStatus === HttpStatus.OK;
        } catch (error) {
            if (error instanceof TaskNotFoundException) {
                return false;
            }
            throw new Error(`Error checking task existence: ${error.message}`);
        }
    }

    async assignAditional(id: number, updateTaskAditionalDto: any): Promise<HttpResponse<string>> {
        try {
            const task_exist = await this.taskExists(id);
            const task_aditional_exists = await this.ExistAditionalDataByTaskId(id);

            const { httpStatus: response_aditional } = await this.getAditionalById(id);

            if (response_aditional !== HttpStatus.OK) {
                if (!task_exist) {
                    throw new TaskNotFoundException(id);
                }
            }

            if(task_aditional_exists) {
                throw new TaskAditionalBadRequestException(`Additional data already exists for task with id: ${id}`);
            }



            if (response_aditional !== HttpStatus.OK) {
                const { error } = await this.supabaseConnection
                    .getClient()
                    .from('task_aditional')
                    .insert({ ...updateTaskAditionalDto, task_id: id });

                if (error) {
                    throw new Error(`Error to assign additional data to Task: ${error.message}`);
                }

                return { httpStatus: HttpStatus.OK, response: 'Additional data assigned successfully' };
            }
            else {
                const { error } = await this.supabaseConnection
                    .getClient()
                    .from('task_aditional')
                    .update(updateTaskAditionalDto)
                    .eq('id', id);

                if (error) {
                    throw new Error(`Error to update additional data for Task: ${error.message}`);
                }

                return { httpStatus: HttpStatus.OK, response: 'Additional data updated successfully' };
            }
        }
        catch (error) {
            if (error instanceof TaskNotFoundException || error instanceof TaskAditionalBadRequestException) {
                throw error;
            }
            throw new Error(`${error.message}`);
        }
    }

    async getAditionalById(id: number): Promise<HttpResponse<any>> {
        try {
            const { data, error } = await this.supabaseConnection
                .getClient()
                .from('task_aditional')
                .select('*')
                .eq('id', id)


            if (error) {
                throw new Error(`Error to get additional data for Task: ${error.message}`);
            }

            if (!data || data.length === 0) {
                return { httpStatus: HttpStatus.NOT_FOUND, response: 'No additional data found for this task' };
            }

            return { httpStatus: HttpStatus.OK, response: data };
        } catch (error: any) {
            throw new Error(`${error.message}`);
        };
    }

    async ExistAditionalDataByTaskId(taskId: number): Promise<boolean> {
        try {
            const { data } = await this.supabaseConnection
                .getClient()
                .from('task_aditional')
                .select('*')
                .eq('task_id', taskId);

            if (data && data.length > 0) {
                return true;
            }
        } catch (error: any) {
            if(error instanceof Error){
                return false;
            }
        }
    }
}