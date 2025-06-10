import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class User {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    celphone: string;

    @IsNotEmpty()
    @IsNumber()
    times_logged: number;

    @IsNotEmpty()
    created_at: string;
}
