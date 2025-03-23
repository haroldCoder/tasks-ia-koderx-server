import { HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/database/supabase.service';
import { User } from './dto/user.dto';
import { HttpResponse } from './types/http-response';
import { UserNotFoundException } from 'src/shared/exceptions/users/user-not-found';

@Injectable()
export class UsersService {
    constructor(private readonly supabaseConnection: SupabaseService){}

    async getUSerByEmailOrCelphone(term: string): Promise<HttpResponse<User>> {
        try{
         const {data} : {data: User} = await this.supabaseConnection.getClient()
        .from('users')
        .select()
        .eq('email', term)
        .eq('celphone', term)
        .single();

        if(!data){
            throw new UserNotFoundException(term);
        }

        return {httpStatus: HttpStatus.OK, response: data};   
        }
        catch(error){
            if(error instanceof UserNotFoundException){
                throw error;
            }
            throw new Error(`${error.message}`);
        }
    }
}
