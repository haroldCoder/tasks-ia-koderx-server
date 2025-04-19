import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { HttpResponse } from '../users/types/http-response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async login(user: CreateUserDto): Promise<HttpResponse<any>> {
        return { httpStatus: HttpStatus.OK, response: await this.jwtService.signAsync(user) }
    }
}
