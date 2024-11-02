import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ToUpperCase } from "../decoradores/toUpperCaseDecorator";

export class CreateCompetenciaDto {
    @IsString()
    @IsNotEmpty()
    @ToUpperCase()
    nombre : string;
    
    @IsString()
    @IsNotEmpty()  
    codigo : string;
    
    @IsNumber()
    @IsNotEmpty()
    duracion : number;  
}
