import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';


import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/role-guard/role-guard.guard';
import { Roles } from 'src/roles/decorator/role.decorator';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
@UseGuards(RolesGuard)
export class UsuariosController {
  constructor(private readonly userService: UsuariosService) {}

  @Post()
  @Roles('admin')
  create(@Body() createUserDto: CreateUsuarioDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'instructor','coordinador')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Get('/puede-recuperar/:cedula/:token')
  async puedeRecuperar(@Param('cedula') cedula: string, @Param('token') token: string) {
    return await this.userService.puedeRecuperar(cedula, token);
  }

  @Post('/recuperar-contrasena')
  async recuperarContrasena(@Body('email') email: string) {
    return await this.userService.recuperarContrasena(email);
  }

  @Get(':id/programas-asignados')
  @Roles('admin', 'instructor','coordinador')
  findProgramasAsignados(@Param('id') id: string) {
    return this.userService.findProgramasAsignados(+id);
  }

  @Get(':id/programas-no-asignados')
  @Roles('admin')
  findProgramasNoAsignados(@Param('id') id: string) {
    return this.userService.findProgramasNoAsignados(+id);
  }

  // @Patch(':id')
  // @Roles('admin')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUsuarioDto) {
  //   return this.userService.update( updateUserDto);
  // }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
