import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UpdatePasswordDto  {
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsEmail()
    email: string

 
}