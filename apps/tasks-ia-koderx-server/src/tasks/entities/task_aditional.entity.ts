import { IsArray, IsDate, IsEnum, IsNumber } from "class-validator";
import { LabelsTasks } from "../enums/labels_tasks";

export class TaskAditional {
    @IsDate()
    created_at: Date;

    @IsNumber()
    task_id: number;

    @IsDate()
    start_date: Date;

    @IsDate()
    end_date: Date;

    @IsEnum(LabelsTasks)
    @IsArray()
    type: LabelsTasks;
}