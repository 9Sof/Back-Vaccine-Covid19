import { Repository, EntityRepository } from "typeorm"
import { NotFoundException } from '@nestjs/common';
import { Users } from './users.entity';
import { OtpDto } from "./dto/otp.dto";

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    async getUsers(): Promise<Users[]> {
        const users = await this.find();
        return users
    }

    async register(data): Promise<any> {
        const user = new Users();

        user.id = data.id;
        user.name_prefix = data.name_prefix;
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.id_card = data.id_card;
        user.birthdate = data.birthdate;
        user.email = data.email;
        user.phone_number = data.phone_number;
        user.vaccination_date = data.vaccination_date;

        await user.save()
        return user;
    }

    async OTPVerify(data): Promise<any> {
        const phoneCheck = await this.findOne({ phone_number: data.phone_number });
        const idCardCheck = await this.findOne({ id_card: data.id_card });

        if (phoneCheck && idCardCheck) {
            return Promise.reject(new NotFoundException('User already exists'));
        }
        const phoneOTP = new OtpDto()

        let otp = Math.floor(100000 + Math.random() * 900000);
        phoneOTP[data.phone_number] = otp
        return phoneOTP;
    }
}