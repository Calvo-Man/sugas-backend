import { Module } from '@nestjs/common';
import { ProgramasInstructorService } from './programas-instructor.service';
import { ProgramasInstructorController } from './programas-instructor.controller';

import { ProgramaModule } from 'src/programa/programa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';



@Module({
  imports: [
    
    UsuariosModule,
    ProgramaModule,
    TypeOrmModule.forFeature([Usuario]),
  ],
  controllers: [ProgramasInstructorController],
  providers: [ProgramasInstructorService],
  exports: [ProgramasInstructorService],
})
export class ProgramasInstructorModule {}
