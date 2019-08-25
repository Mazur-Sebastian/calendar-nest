import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
    @ApiModelProperty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @MinLength(6, {
        message: 'Password must have min 6 sings',
    })
    @IsNotEmpty()
    password: string;

    @ApiModelProperty()
    @MinLength(6, {
        message: 'Name must have min 6 sings',
    })
    @IsNotEmpty()
    username: string;
}
