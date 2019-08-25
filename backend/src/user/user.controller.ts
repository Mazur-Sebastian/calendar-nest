import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @Get('getUser/:id')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Param('id') id: number): Promise<UserEntity> {
        return this.userService.findUserById(id);
    }
}
