import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { User } from './models/user.model';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiUseTags('user')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @Get('getUser/:id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.findUserById(id);
    }
}
