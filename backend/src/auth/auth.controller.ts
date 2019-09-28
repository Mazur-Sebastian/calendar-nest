import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginData: LoginUserDto) {
        return await this.authService.loginUser(loginData);
    }

    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }
}
