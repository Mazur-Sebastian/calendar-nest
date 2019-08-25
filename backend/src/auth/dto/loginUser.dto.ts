import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    email: string;

    @Min(6)
    @IsNotEmpty()
    password: string;
}
