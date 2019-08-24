import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from '../auth/auth.module';
// import { UserResolver } from './user.resolver';
// import { UserService } from './user.service';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import * as bcrypt from 'bcryptjs';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
