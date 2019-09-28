import { Injectable, NotAcceptableException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { USER_SCHEMA } from 'src/constants/schemas';
import { User } from './models/user.model';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_SCHEMA)
        private readonly userModel: Model<User>,
    ) {}

    async findUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({ email }).exec();

            return user;
        } catch {
            throw new NotAcceptableException('User not found');
        }
    }

    async createUser(userData: RegisterUserDto): Promise<User> {
        const user = await this.findUserByEmail(userData.email);

        if (user) {
            throw new NotAcceptableException('User exist');
        }

        const createdUser = new this.userModel(userData);
        return createdUser.save();
    }

    async findUserById(_id: string): Promise<User> {
        try {
            const user = await this.userModel.findById({ _id }).exec();

            return user;
        } catch {
            throw new NotAcceptableException('User not found');
        }
    }
}
