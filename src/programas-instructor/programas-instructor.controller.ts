import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProgramasInstructorService } from './programas-instructor.service';
import { CreateProgramasInstructorDto } from './dto/create-programas-instructor.dto';
import { UpdateProgramasInstructorDto } from './dto/update-programas-instructor.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/role-guard/role-guard.guard';
import { Roles } from 'src/roles/decorator/role.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('programas-instructor')
export class ProgramasInstructorController {
  constructor(private readonly programasInstructorService: ProgramasInstructorService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createProgramasInstructorDto: CreateProgramasInstructorDto) {
    return await this.programasInstructorService.AsignarProgramasAInstructor(createProgramasInstructorDto);
  }

  @Get()
  findAll() {
    return this.programasInstructorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programasInstructorService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateProgramasInstructorDto: UpdateProgramasInstructorDto) {
    return this.programasInstructorService.update(+id, updateProgramasInstructorDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.programasInstructorService.remove(+id);
  }
}
