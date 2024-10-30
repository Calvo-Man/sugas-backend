import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProgramasInstructorDto {

    @IsNotEmpty()
    @IsNumber()
    instructor: number;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    programa: number[];
}
