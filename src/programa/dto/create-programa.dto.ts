import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProgramaDto {
  @IsString()
  @IsNotEmpty()
  nombre : string;

  @IsString()
  @IsNotEmpty()
  codigo : string;

  @IsNumber()
  @IsNotEmpty()
  version : number
}
