import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class RegisterUserDto {
    @IsEmail()
    email: string;

    @Min(6)
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;
}
