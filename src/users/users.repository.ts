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
    async getUser(userId): Promise<any> {
        const user = await this.findOne(userId);

        if (!user) {
            return { status: "fail" };
        }

        return { status: "success", user }
    }

    async register(data): Promise<any> {
        const user = new Users();
        const phoneCheck = await this.findOne({ phone_number: data.phone_number });
        const idCardCheck = await this.findOne({ id_card: data.id_card });

        if (phoneCheck || idCardCheck) {
            return { status: "fail" };
        }

        let birthdate = new Date(`${data.vaccination_date.slice(0, 10)} 00:00:00`)
        let vaccination_date = new Date(`${data.vaccination_date.slice(0, 10)} 00:00:00`)

        const vaccineDate = await this.query(`
            SELECT COUNT(vaccination_date) FROM users
            WHERE vaccination_date='${data.vaccination_date.slice(0, 10)}'
        `)

        if (vaccineDate[0].count >= 3000) {
            return { status: "date full", date: data.vaccination_date.slice(0, 10) };
        }
        user.id = data.id;
        user.name_prefix = data.name_prefix;
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.id_card = data.id_card;
        user.birthdate = birthdate
        user.email = data.email || "ไม่ได้ระบุ";
        user.phone_number = data.phone_number;
        user.vaccination_date = vaccination_date

        await user.save()
        return { status: "success", user };
    }

    async OTPVerify(data): Promise<any> {
        const phoneCheck = await this.findOne({ phone_number: data.phone_number });
        const idCardCheck = await this.findOne({ id_card: data.id_card });

        if (phoneCheck || idCardCheck) {
            return { status: "fail" };
        }
        const phoneOTP = new OtpDto()

        let otp = Math.floor(100000 + Math.random() * 900000);
        phoneOTP[data.phone_number] = otp
        return { status: "success", phoneOTP };
    }

    async search(search): Promise<any> {
        const user = await this.query(`
                SELECT * FROM users 
                WHERE CAST(id AS TEXT) LIKE '%${search.id}%'
                and first_name LIKE '%${search.first_name}%'
                and last_name LIKE '%${search.last_name}%'
                and phone_number LIKE '%${search.phone_number}%'
                ${ search.startDate && search.endDate && 
                `and vaccination_date BETWEEN  '${search.startDate}' and '${search.endDate.slice(0, 10)}'` }
                ORDER BY id ASC;
            `)

        return { status: "success", user }

    }
}