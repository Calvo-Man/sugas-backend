/* eslint-disable prettier/prettier */
import { jwtConstants } from './constans/jwt.constans';
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


import { RolesModule } from 'src/roles/roles.module';
import { ProgramaModule } from 'src/programa/programa.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
    UsuariosModule,
    RolesModule,
    ProgramaModule
    ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
