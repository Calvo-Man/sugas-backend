import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProgramacompetenciaService } from './programacompetencia.service';
import { CreateProgramacompetenciaDto } from './dto/create-programacompetencia.dto';
import { UpdateProgramacompetenciaDto } from './dto/update-programacompetencia.dto';
import { RolesGuard } from 'src/roles/role-guard/role-guard.guard';
import { Roles } from 'src/roles/decorator/role.decorator';

@Controller('programacompetencia')
@UseGuards(RolesGuard)
export class ProgramacompetenciaController {
  constructor(private readonly programacompetenciaService: ProgramacompetenciaService) {}

  @Post()
  @Roles('admin')
  create(@Body() createProgramacompetenciaDto: CreateProgramacompetenciaDto) {
    return this.programacompetenciaService.create(createProgramacompetenciaDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.programacompetenciaService.findAll();
  }

  @Get('programa/:id')
  @Roles('admin','coordinador','instructor')
  findOne(@Param('id') id: string) {
    return this.programacompetenciaService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateProgramacompetenciaDto: UpdateProgramacompetenciaDto) {
    return this.programacompetenciaService.update(+id, updateProgramacompetenciaDto);
  }

  

  @Delete(':programId/competencia/:competenciaId')
  @Roles('admin')
   removeRole(@Param('programId') programId: number, @Param('competenciaId') competenciaId: number) {
    return  this.programacompetenciaService.remove(programId,competenciaId);
    
  }
}
