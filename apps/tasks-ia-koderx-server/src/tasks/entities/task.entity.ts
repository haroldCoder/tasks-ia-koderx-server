import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Task {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    priority: string;

    @IsNotEmpty()
    @IsNumber()
    completed: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
