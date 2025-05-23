import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException{
    constructor(term: string){
        super(`Not found a user with email or celphone or username ${term}`, HttpStatus.NOT_FOUND);
    }
}