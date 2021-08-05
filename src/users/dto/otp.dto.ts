import { IsObject } from 'class-validator';

export class OtpDto {
    @IsObject()
    phoneOTP: {};
}
