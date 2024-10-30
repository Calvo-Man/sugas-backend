import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProgramacompetenciaDto {

    @IsNumber()
    @IsNotEmpty()
    programaId : number;


    competenciaId : number[];
}
