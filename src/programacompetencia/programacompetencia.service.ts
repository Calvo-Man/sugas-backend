import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramacompetenciaDto } from './dto/create-programacompetencia.dto';
import { UpdateProgramacompetenciaDto } from './dto/update-programacompetencia.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from 'src/programa/entities/programa.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';
import { ProgramaService } from 'src/programa/programa.service';

@Injectable()
export class ProgramacompetenciaService {
  constructor(
    @InjectRepository(Programa)
    private programaRepository: Repository<Programa>,
    @InjectRepository(Competencia)
    private competenciaRepository: Repository<Competencia>,
    private readonly programaService: ProgramaService
  ) {}

  async create(createProgramacompetenciaDto: CreateProgramacompetenciaDto) {
       
    const pro = await this.programaRepository.findOne({ where: { id: createProgramacompetenciaDto.programaId }, relations: ['competencias'] });
    if(!pro){
      throw new NotFoundException('Programa no encontrado')
    }


    for (let idc of createProgramacompetenciaDto.competenciaId){
      const comp = await this.competenciaRepository.findOne({ where: { id: idc } });

           if ( !comp) {
             throw new Error('User or Group not found');
            }
          pro.competencias.push(comp);
      }
    return await this.programaRepository.save(pro);
  }

  findAll() {
    return `This action returns all programacompetencia`;
  }

  findOne(programaId: number) {
   
    return 'ok';
  }
  

  update(id: number, updateProgramacompetenciaDto: UpdateProgramacompetenciaDto) {
    return `This action updates a #${id} programacompetencia`;
  }

  async remove(programId: number, competenciaCodigo : string) {
    const programa = await this.programaRepository.findOne({ where: { id: programId }, relations: ['competencias'] });
    if(!programa){
      throw new NotFoundException('Programa no encontrado')
    }

    const competencia = await this.competenciaRepository.findOne({ where: { codigo: competenciaCodigo } });
    if(!competencia){
      throw new NotFoundException('Competencia no encontrada')
    }
     // Filtra para eliminar el usuario del programa
     programa.competencias = programa.competencias.filter((competencia) => competencia.codigo !== competenciaCodigo);
     await this.programaService.update(programId, programa);
     return { message: 'Competencia eliminada del programa correctamente' };
    
  }

  
}
