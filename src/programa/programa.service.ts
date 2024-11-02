import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { In, Repository } from 'typeorm';
import { Competencia } from 'src/competencia/entities/competencia.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class ProgramaService {
  programassena = []
  constructor(
    @InjectRepository(Programa)
    private programaRepository: Repository<Programa>,
  ) {}
  
  async create(createProgramaDto: CreateProgramaDto) {
    const findProgramByCode = await this.programaRepository.findOne({
        where: { codigo: createProgramaDto.codigo },
    });
    if (findProgramByCode) {  
      return {
        message: "Ya existe un programa con este Código",
        type: "error",
        column: "codigo",
        success: false
      };
    }

    const findProgramByName = await this.programaRepository.findOne({
        where: { nombre: createProgramaDto.nombre },
    });
    if (findProgramByName) {
       return {
        message: "Ya existe un programa con este Nombre",
        type: "error",
        column: "nombre",
        success: false
       }
    }
    try {
        const programa = this.programaRepository.create(createProgramaDto);
        await this.programaRepository.save(programa);
        return {
            message: "Programa creado correctamente",
            type: "success",  
            success: true
        }
    } catch (error) {
        if (error instanceof ConflictException) {
            throw error;
        }
        // Puedes capturar otros tipos de errores o loggear el error
        throw new Error('Hubo un problema al crear el programa');
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
  async getInstructoresPorPrograma(programaId: number) {
    
    const programa = await this.programaRepository.findOne({
      where: { id: programaId },
      relations: ['usuario','usuario.role'], 
    });

    return programa ? programa.usuario : [];
  }


  findOne(id: number): Promise<Programa> {
    
    return this.programaRepository.findOne({ where: { id },  relations: ['competencias','usuario'] });
  }
 

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
