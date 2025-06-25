import { IsArray, IsDate, IsEnum } from "class-validator";
import { LabelsTasks } from "../enums/labels_tasks";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateTaskAditionalDto {
    @ApiProperty({
        description: 'Start date of the task',
        required: false,
        example: '2023-10-01T00:00:00Z'
    })
    @IsDate()
    start_date: Date;

    @ApiProperty({
        description: 'End date of the task',
        required: false,
        example: '2023-10-31T23:59:59Z'
    })
    @IsDate()
    end_date: Date;

    @ApiProperty({
        description: 'Type of the task label',
        required: false,
        enum: LabelsTasks,
        example: [LabelsTasks.Events, LabelsTasks.Study]
    })
    @IsEnum(LabelsTasks)
    @IsArray()
    type: LabelsTasks;

}