import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramasInstructorDto } from './dto/create-programas-instructor.dto';
import { UpdateProgramasInstructorDto } from './dto/update-programas-instructor.dto';
import { ProgramaService } from 'src/programa/programa.service';
import { CompetenciaService } from 'src/competencia/competencia.service';

import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class ProgramasInstructorService {
  constructor(
    private readonly programaService: ProgramaService,
    private readonly userService: UsuariosService,
    @InjectRepository(Usuario) private userRepository: Repository<Usuario>,
  ) {}

  async AsignarProgramasAInstructor(
    createProgramasInstructorDto: CreateProgramasInstructorDto,
  ) {

    // Obtener las instructores solicitadas
    const instructor = await this.userService.findOne(
      createProgramasInstructorDto.instructor,
    );

    if (!instructor) {
      throw new NotFoundException(
        `Instructor con ID ${createProgramasInstructorDto.instructor} no encontrado`,
      );
    }
    
    // Buscar el programa por ID
    const programa = await this.programaService.findProgramasByIds(
      createProgramasInstructorDto.programa,
    );
    if (!programa || programa.length === 0) {
      throw new NotFoundException(
        `Competencias con ID ${createProgramasInstructorDto.programa} no encontradas`,
      );
    }

    // Verificar si ya existe alguna de los programas asignados al instructor
    const programasExistentes = instructor.programa || [];

    programa.forEach((nuevoPrograma) => {
      if (
        programasExistentes.some(
          (programa) => programa.id === nuevoPrograma.id,
        )
      ) {
        throw new ConflictException(
          `La competencia con ID ${nuevoPrograma.id} ya está relacionada con el programa con ID ${createProgramasInstructorDto.instructor}`,
        );
      }
    });

    // Combinar los programas existentes con las nuevos
    instructor.programa = [...programasExistentes, ...programa];

    // Cargar el instructor con las programas combinados
    const userPrograma = await this.userRepository.preload({
      id: instructor.id, // Preload busca el instructor por su ID
      programa: instructor.programa, // Asigna los programas al instructor
    });


    // Guardar el programa con las nuevas competencias
    return await this.userRepository.save(userPrograma);
  }

  findAll() {
    return `This action returns all programasInstructor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programasInstructor`;
  }

  update(
    id: number,
    updateProgramasInstructorDto: UpdateProgramasInstructorDto,
  ) {
    return `This action updates a #${id} programasInstructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} programasInstructor`;
  }
}
