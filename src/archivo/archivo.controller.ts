import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { RolesGuard } from 'src/roles/role-guard/role-guard.guard';
import { Roles } from 'src/roles/decorator/role.decorator';

@Controller('archivo')
@UseGuards(RolesGuard)
export class ArchivoController {
  constructor(private readonly archivoService: ArchivoService) {}

  @Post(':resultadoId')
  @Roles('admin','coordinador')
  create(@Body() createArchivoDto: CreateArchivoDto,
  @Param('resultadoId') id: number, ) {
    return this.archivoService.create(createArchivoDto, +id);
  }

  @Get()
  @Roles('admin','coordinador')
  findAll() {
    return this.archivoService.findAll();
  }

  @Get(':id')
  @Roles('admin','coordinador','instructor')
  findAllresultado(@Param('id') id: string) {
    return this.archivoService.findAllarchresultado(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateArchivoDto: UpdateArchivoDto) {
    return this.archivoService.update(+id, updateArchivoDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(
    @Param('id') id: number
   
  ) {
   return this.archivoService.remove(id);
  }
}
