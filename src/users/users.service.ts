import { Injectable } from '@nestjs/common';
import { UsersRepository } from "./users.repository";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository
    ) { }

    async getUsers(): Promise<any> {
        const result = await this.usersRepository.getUsers();
        return result
    }

    async getUser(userId): Promise<any> {
        const result = await this.usersRepository.getUser(userId);
        return result
    }

    async register(data): Promise<any> {
        const result = await this.usersRepository.register(data);
        return result
    }

    async OTPVerify(data): Promise<any> {
        const result = await this.usersRepository.OTPVerify(data);
        return result
    }

    async search(data): Promise<any> {
        const result = await this.usersRepository.search(data);
        return result
    }
}
