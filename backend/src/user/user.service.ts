import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}
    async createUser(userData: RegisterUserDto): Promise<UserEntity> {
        const isUserExist = await this.userRepository.findOne({
            email: userData.email,
        });

        if (isUserExist) {
            throw new ForbiddenException('User exist');
        }

        const createdUser = this.userRepository.create(userData);

        return this.userRepository.save(createdUser);
    }

    async findUserById(id: number): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({
                id,
            });

            return user;
        } catch {
            throw new ForbiddenException('User exist');
        }
    }
}
