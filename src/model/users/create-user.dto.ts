import { IsEmail, IsString, IsEnum, IsNotEmpty } from "class-validator";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
        message: "valid role required"
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}