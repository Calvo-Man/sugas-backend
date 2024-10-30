import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    
    email: string
    password: string
}
