import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TaskPriority } from "../enums/tasks";

export class CreateTaskDto {
    @ApiProperty({
        example: 'Task title',
        description: 'Task title',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'Task description',
        description: 'Task description',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        example: TaskPriority.High,
        description: 'Task priority(1 High, 2 Medium, 3 Low)',
        enum: TaskPriority,
        required: true
    })
    @IsNotEmpty()
    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @ApiProperty({
        example: 1,
        description: 'Task completed(1 terminated or 0 not terminated)',
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    completed: number;

    @ApiProperty({
        example: 2,
        description: 'Id of the user who created the task',
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
