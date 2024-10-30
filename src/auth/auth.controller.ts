import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'src/roles/role-guard/role-guard.guard';
import { Roles } from 'src/roles/decorator/role.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(RolesGuard)
   @Roles('admin')
  Register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('cambiar-contrasena')
  
  cambiarContrasena( @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.cambiarContrasena(updatePasswordDto);
  }

  @Post('login')
  Login(@Body() loginAuthDto: LoginAuthDto) {
     return this.authService.login(loginAuthDto);
  }
  
}
