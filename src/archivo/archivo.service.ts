import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { Archivo } from './entities/archivo.entity';
import { Resultado } from 'src/resultados/entities/resultado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import cloudinary from 'src/cloudinary.config';
import axios from 'axios';
@Injectable()
export class ArchivoService {
  constructor(
    @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,
    @InjectRepository(Resultado)
    private readonly resultadoRepository: Repository<Resultado>,
  ) {}

  async create(createArchivoDto: CreateArchivoDto, id : number) {
     const resultadoId = await this.resultadoRepository.findOne({ where: { id }});
    
    if (!resultadoId) {
      throw new NotFoundException('Resultado not found');
    }

    const nuevoArchivo = this.archivoRepository.create({
      ...createArchivoDto,
      resultadoId,
    });

    return await this.archivoRepository.save(nuevoArchivo);
  }

  findAll() {
    return `This action returns all archivo`;
  }

 async findAllarchresultado(id: number) {
  const resultadoId = await this.resultadoRepository.findOne({ where: { id  } });
    
  if (!resultadoId) {
    throw new NotFoundException('Resultado not found');
  }

  return await this.archivoRepository.find({
    where: { resultadoId },
  });
  }

  update(id: number, updateArchivoDto: UpdateArchivoDto) {
    return `This action updates a #${id} archivo`;
  }

  async borrarArchivo(publicId: string, id : number) {
    try {
     const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'raw',
      });
      return result
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      throw error;
    }
  }
  
  
  async remove(id: number) {
    const archivo = await this.archivoRepository.findOne({ where: { id }});
    const r = this.borrarArchivo(archivo.publicid,archivo.id)
    if (r)
      return await this.archivoRepository.remove(archivo);
  

  }
}
