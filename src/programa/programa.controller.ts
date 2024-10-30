import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { RolesGuard } from 'src/roles/role-guard/role-guard.guard';
import { Roles } from 'src/roles/decorator/role.decorator';

@Controller('programa')
@UseGuards(RolesGuard)
export class ProgramaController {
  constructor(private readonly programaService: ProgramaService) {}

  @Post('CrearPrograma')
  @Roles('admin')
  create(@Body() createProgramaDto: CreateProgramaDto) {
    return this.programaService.create(createProgramaDto);
  }

  @Get()
  @Roles('admin','coordinador','instructor')
  findAll() {
    return this.programaService.findAll();
  }
  @Get(':id/competencias')
  @Roles('admin','instructor')
  async getCompetenciasPorPrograma(@Param('id') programaId: string) {
    return this.programaService.getCompetenciasPorPrograma(+programaId);
  }

  @Get('codigo/:id')
  @Roles('admin','coordinador','instructor')
  findOne(@Param('id') id: string) {
    return this.programaService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateProgramaDto: UpdateProgramaDto) {
    return this.programaService.update(+id, updateProgramaDto);
  }

  @Delete('codigo/:id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.programaService.remove(id);
  }
}
