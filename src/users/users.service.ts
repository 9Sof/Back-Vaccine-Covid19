import { Injectable } from '@nestjs/common';
import { UsersRepository } from "./users.repository";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository
    ) { }

    async getUsers(): Promise<any> {
        const users = await this.usersRepository.getUsers();
        return { success: true, users: users }
    }

    async register(data): Promise<any> {
        const user = await this.usersRepository.register(data);
        return { success: true, user: user }
    }
    
    async OTPVerify(data): Promise<any> {
        const otp = await this.usersRepository.OTPVerify(data);
        return { success: true, otp: otp }
    }
}
