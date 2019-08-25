import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from './../user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { JwtToken } from './models/jwtToken.model';
import { UserEntity } from './../user/user.entity';
import { LoginUserDto } from './dto/loginUser.dto';
// import { JwtPayload } from './models/jwtPayload.model';

const salt = bcrypt.genSaltSync(10);

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async loginUser(loginData: LoginUserDto): Promise<any> {
        const user = await this.userService.findUserByEmail(loginData.email);
        const match = await bcrypt.compareSync(
            loginData.password,
            user.password,
        );

        if (!match) {
            throw new NotAcceptableException('Bad password');
        }

        const accessToken = this.jwtService.sign({ id: user.id });

        return { accessToken };
    }

    async registerUser(registerData: RegisterUserDto): Promise<JwtToken> {
        const hashPassword = await bcrypt.hashSync(registerData.password, salt);
        const userWithHashPassword = {
            ...registerData,
            password: hashPassword,
        };
        const { id } = await this.userService.createUser(userWithHashPassword);
        const accessToken = this.jwtService.sign({ id });

        return { accessToken };
    }

    async validateUser(id: number): Promise<UserEntity> {
        return await this.userService.findUserById(id);
    }
}
