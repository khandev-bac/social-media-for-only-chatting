import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUser {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
export class LoginUser {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string;
}