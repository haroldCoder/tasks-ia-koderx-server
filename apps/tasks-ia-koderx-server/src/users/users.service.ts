import { HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/database/supabase.service';
import { User } from './dto/user.dto';
import { HttpResponse } from './types/http-response';
import { UserNotFoundException } from 'src/shared/exceptions/users/user-not-found';
import { CreateUserDto } from './dto/create-user.dto';
import { UserBadRequestException } from 'src/shared/exceptions/users/user-bad-request';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly supabaseConnection: SupabaseService,
        private readonly authService: AuthService
    ) { }

    async getUSerByEmailOrCelphone(term: string): Promise<HttpResponse<User>> {
        try {
            const { data }: { data: User } = await this.supabaseConnection.getClient()
                .from('users')
                .select()
                .or(`email.eq.${term},celphone.eq.${term}`)
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
            if (await this.verifyUserExist(user)) {
                throw new UserNotFoundException(user.username);
            }

            if (await this.getUserByTerm(user)) {
                await this.updateUser({ times_logged: 1 }, user.email || user.celphone);
                return await this.authService.login(user);
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
            if (error instanceof UserBadRequestException || error instanceof UserNotFoundException) {
                console.log(error);

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
                .or(`email.eq.${user.email},celphone.eq.${user.celphone}`)
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

    async getUserById(id: number): Promise<User> {
        try {
            const { data }: { data: User } = await this.supabaseConnection.getClient()
                .from('users')
                .select()
                .eq('id', id)
                .single();

            if (!data) {
                throw new UserNotFoundException(id.toString());
            }

            return data;
        }
        catch (error) {
            return null;
        }
    }

    async verifyUserExist(user: CreateUserDto): Promise<boolean> {
        try {
            const existingUser = await this.getUserByTerm(user);

            return existingUser == null ? false : !existingUser;
        }
        catch (error) {
            return null;
        }
    }

    async updateUser(user: UpdateUserDto, term: string): Promise<HttpResponse<string>> {
        try {
            const existingUser = await this.getUSerByEmailOrCelphone(term);

            if (!existingUser) {
                throw new UserNotFoundException(term);
            }

            if (existingUser.response.times_logged) {
                user.times_logged = existingUser.response.times_logged + user.times_logged;
            }

            await this.supabaseConnection.getClient()
                .from('users')
                .update(user)
                .or(`email.eq.${term},celphone.eq.${term}`)
                .single();

            return { httpStatus: HttpStatus.OK, response: "User updated successfully" };
        }
        catch (error) {
            if (error instanceof UserNotFoundException) {
                throw error;
            }
            throw new Error(`${error.message}`);
        }
    }
}
