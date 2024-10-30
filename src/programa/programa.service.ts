import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { In, Repository } from 'typeorm';
import { Competencia } from 'src/competencia/entities/competencia.entity';

@Injectable()
export class ProgramaService {
  programassena = []
  constructor(
    @InjectRepository(Programa)
    private programaRepository: Repository<Programa>,
  ) {}
  
  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    
    const pro = this.programaRepository.create(createProgramaDto);
    try{
    return this.programaRepository.save(pro);
    }
    catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Ya existe un programa con este código');
      }
    }
  }

  findAll(): Promise<Programa[]> {
    return this.programaRepository.find({ relations: ['competencias'] });
  }
  async findProgramasByIds( programasIds: number[]): Promise<Programa[]> {
    return await this.programaRepository.find({
      where: {
        id: In(programasIds),
      },
    
    });
  }
  async getCompetenciasPorPrograma(programaId: number): Promise<Competencia[]> {
    
    const programa = await this.programaRepository.findOne({
      where: { id: programaId },
      relations: ['competencias'], // Asegúrate de tener la relación configurada correctamente
    });

    return programa ? programa.competencias : [];
  }

  //{ relations: ['competencias'] }
  findOne(id: number): Promise<Programa> {
    
    return this.programaRepository.findOne({ where: { id },  relations: ['competencias'] });
  }
 //

  async update(id: number, updateProgramaDto: UpdateProgramaDto): Promise<Programa> {
    console.log(id)
    const programa = await this.programaRepository.findOne({where : {id}});

    if (!programa) {
      throw new NotFoundException(`Programa con ID ${id} no encontrado`);
    }
    Object.assign(programa, updateProgramaDto);

    // Guardar los cambios en la base de datos
    return this.programaRepository.save(programa);
    
  }

  async remove(codigo: string) {
    // Buscar el usuario por su código (ID)
    const programa = await this.programaRepository.findOne({ where: { codigo: codigo } });

    // Lanzar excepción si no se encuentra el usuario
    if (!programa) {
      throw new NotFoundException(`Programa con código ${codigo} no encontrado`);
    }

    // Eliminar el usuario
    await this.programaRepository.remove(programa);
  }
}
