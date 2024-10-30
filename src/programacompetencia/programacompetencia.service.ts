import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramacompetenciaDto } from './dto/create-programacompetencia.dto';
import { UpdateProgramacompetenciaDto } from './dto/update-programacompetencia.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from 'src/programa/entities/programa.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';

@Injectable()
export class ProgramacompetenciaService {
  constructor(
    @InjectRepository(Programa)
    private programaRepository: Repository<Programa>,
    @InjectRepository(Competencia)
    private competenciaRepository: Repository<Competencia>,
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

  async remove(programId: number, competenciaId : number) {
    console.log(programId, competenciaId)
    const programa = await this.programaRepository.findOne({
      where: { id: programId },
      relations: ['competencias'],
    });

    console.log(programa)
    if (!programa) {
      throw new Error('Programa not found');
    }

    // Filtrar el rol que quieres eliminar
    programa.competencias = programa.competencias.filter(competencia => competencia.id != competenciaId);
    console.log(programa)

    return await this.programaRepository.save(programa);
  }

  
}
