import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesModule } from 'src/roles/roles.module';
import { ProgramaModule } from 'src/programa/programa.module';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    RolesModule,
    ProgramaModule,
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('HOST_EMAIL'),
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_REMITENTE'),
            pass: configService.get<string>('PASSWORD_EMAIL_REMITENTE'),
          },
          
        },
        defaults: {
          from: `'SUGAS' ${configService.get<string>('EMAIL_REMITENTE')}`,
        },
        template: {
          dir:  './templates/',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },     
      }),inject:[ConfigService]
    })
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
