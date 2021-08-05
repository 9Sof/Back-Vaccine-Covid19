
import { Body, Controller, Get, Post, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('')
    async getUsers(@Res() res): Promise<Users> {
        const result = await this.usersService.getUsers()
        return res.status(HttpStatus.OK).json(result)
    }

    @Post('/register')
    async Register(@Body() user: Users, @Res() res): Promise<any> {
        const result = await this.usersService.register(user);
        return res.status(HttpStatus.OK).json(result)
    }

    @Post('/otp')
    async OTPVerify(@Body() data, @Res() res): Promise<any> {
        const result = await this.usersService.OTPVerify(data);
        return res.status(HttpStatus.OK).json(result)
    }
}
