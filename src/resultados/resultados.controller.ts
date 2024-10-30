import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ResultadosService } from './resultados.service';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { RolesGuard } from 'src/roles/role-guard/role-guard.guard';
import { Roles } from 'src/roles/decorator/role.decorator';

@Controller('resultados')
@UseGuards(RolesGuard)
export class ResultadosController {
  constructor(private readonly resultadosService: ResultadosService) {}

  @Post(':competenciaId/:programaId')
  @Roles('admin')
  create(@Body() createResultadoDto: CreateResultadoDto,
  @Param('competenciaId') competenciaId: number, 
  @Param('programaId') programaId : number) {
    console.log(programaId)
    return this.resultadosService.create(createResultadoDto,competenciaId,programaId);
  }

  @Get()
  findAll() {
    return this.resultadosService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.resultadosService.findOne(+id);
  }

  @Get(':idprograma/:idcompetencia')
  @Roles('admin','coordinador','instructor')
  findcomppro(@Param('idcompetencia') idcomp: number,
  @Param('idprograma') idprog: number,) {
    return this.resultadosService.findresultadoprocomp(idprog,idcomp);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateResultadoDto: UpdateResultadoDto) {
    return this.resultadosService.update(+id, updateResultadoDto);
  }

  @Delete('codigo/:id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.resultadosService.remove(id);
  }
}
