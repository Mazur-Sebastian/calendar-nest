import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiModelProperty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @MinLength(6, {
        message: 'Password must have min 6 sings',
    })
    @IsNotEmpty()
    password: string;
}
