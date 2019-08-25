import {
    Injectable,
    ForbiddenException,
    // HttpException,
    // ForbiddenException,
    // BadRequestException,
} from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';

import { UserService } from './../user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { JwtToken } from './models/jwtToken.model';
import { UserEntity } from './../user/user.entity';
// import { JwtPayload } from './models/jwtPayload.model';

const salt = bcrypt.genSaltSync(10);

@Injectable()
export class AuthService {
    constructor(
        // private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    // async loginUser(loginData: LoginDto): Promise<JwtToken | HttpException> {
    //     try {
    //         const { _id, password } = await this.userService.getUser(
    //             loginData.email,
    //         );

    //         const match = await bcrypt.compareSync(
    //             loginData.password,
    //             password,
    //         );

    //         if (!match) {
    //             return new BadRequestException('Bad password');
    //         }

    //         const accessToken = this.jwtService.sign({ id: _id });

    //         return { accessToken };
    //     } catch (error) {
    //         throw new ForbiddenException();
    //     }
    // }

    async registerUser(registerData: RegisterUserDto): Promise<JwtToken> {
        try {
            const hashPassword = await bcrypt.hashSync(
                registerData.password,
                salt,
            );

            const userWithHashPassword = {
                ...registerData,
                password: hashPassword,
            };

            const user = await this.userService.createUser(
                userWithHashPassword,
            );
            console.log(user);
            // const accessToken = this.jwtService.sign({ id: _id });
            const accessToken = 'gdsbfghasfj';
            return { accessToken };
        } catch (error) {
            throw new ForbiddenException('Some message');
        }
    }

    async validateUser(id: number): Promise<UserEntity> {
        return await this.userService.findUserById(id);
    }

    // async verifyToken(accessToken: string): Promise<string | object> {
    //     const userData = await jwt.verify(accessToken, process.env.SECRET_KEY);

    //     return userData;
    // }
}
