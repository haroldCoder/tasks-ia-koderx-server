import { HttpStatus } from "@nestjs/common";

export interface HttpResponse<T = any>{
    httpStatus: HttpStatus,
    response: T
}