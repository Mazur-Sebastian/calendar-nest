import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from './../user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { JwtToken } from './models/jwtToken.model';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './../user/models/user.model';

const salt = bcrypt.genSaltSync(10);

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async loginUser(loginData: LoginUserDto): Promise<JwtToken> {
        const user = await this.userService.findUserByEmail(loginData.email);
        const match = await bcrypt.compareSync(
            loginData.password,
            user.password,
        );

        if (!match) {
            throw new NotAcceptableException('Bad password');
        }

        return this.jwtSign(user);
    }

    async registerUser(registerData: RegisterUserDto): Promise<JwtToken> {
        const hashPassword = await bcrypt.hashSync(registerData.password, salt);
        const userWithHashedPassword = {
            ...registerData,
            password: hashPassword,
        };
        const user = await this.userService.createUser(userWithHashedPassword);

        return this.jwtSign(user);
    }

    jwtSign(user: User): JwtToken {
        const accessToken = this.jwtService.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        });

        return { accessToken };
    }

    async validateUser(id: string): Promise<User> {
        return await this.userService.findUserById(id);
    }
}
