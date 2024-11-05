import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProgramacompetenciaDto {

    @IsNumber()
    @IsNotEmpty()
    programaId : number;

    @IsNumber({}, { each: true })
    @IsNotEmpty()
    competenciaId : number[];
}
