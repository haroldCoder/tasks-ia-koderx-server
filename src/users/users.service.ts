import { HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/database/supabase.service';
import { User } from './dto/user.dto';
import { HttpResponse } from './types/http-response';
import { UserNotFoundException } from 'src/shared/exceptions/users/user-not-found';
import { CreateUserDto } from './dto/create-user.dto';
import { UserBadRequestException } from 'src/shared/exceptions/users/user-bad-request';

@Injectable()
export class UsersService {
    constructor(private readonly supabaseConnection: SupabaseService) { }

    async getUSerByEmailOrCelphone(term: string): Promise<HttpResponse<User>> {
        try {
            const { data }: { data: User } = await this.supabaseConnection.getClient()
                .from('users')
                .select()
                .eq('email', term)
                .eq('celphone', term)
                .single();

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

    async LoginUser(user: CreateUserDto): Promise<HttpResponse<string>> {
        try {
            if (this.getUserByTerm(user)) {
                throw new UserBadRequestException('User already exists');
            }

            if (!user.email && !user.celphone) {
                throw new UserBadRequestException('Email or celphone is required');
            }

            await this.supabaseConnection.getClient()
                .from('users')
                .insert(user);

            return { httpStatus: HttpStatus.OK, response: 'User created successfully' }
        }
        catch (error) {
            if (error instanceof UserBadRequestException) {
                throw error;
            }
            throw new Error(`${error.message}`);
        }
    }

    async getUserByTerm(user: CreateUserDto): Promise<User> {
        try {
            const { data }: { data: User } = await this.supabaseConnection.getClient()
                .from('users')
                .select()
                .eq('email', user.email)
                .eq('celphone', user.celphone)
                .eq('username', user.username)
                .single();

            if (!data) {
                return null;
            }

            return data;
        }
        catch (error) {
            return null;
        }
    }
}
