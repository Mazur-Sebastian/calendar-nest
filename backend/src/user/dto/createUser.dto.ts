import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Min(6)
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;
}
