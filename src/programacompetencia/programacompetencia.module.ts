import { Module } from '@nestjs/common';
import { ProgramacompetenciaService } from './programacompetencia.service';
import { ProgramacompetenciaController } from './programacompetencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from 'src/programa/entities/programa.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';
import { ProgramaModule } from 'src/programa/programa.module';

@Module({
  imports: [TypeOrmModule.forFeature([Programa,Competencia ]),ProgramaModule,],
  controllers: [ProgramacompetenciaController],
  providers: [ProgramacompetenciaService],
})
export class ProgramacompetenciaModule {}
