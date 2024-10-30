import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramaModule } from './programa/programa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from './programa/entities/programa.entity';
import { CompetenciaModule } from './competencia/competencia.module';
import { Competencia } from './competencia/entities/competencia.entity';
import { ResultadosModule } from './resultados/resultados.module';
import { Resultado } from './resultados/entities/resultado.entity';
import { ProgramacompetenciaModule } from './programacompetencia/programacompetencia.module';
import { ArchivoModule } from './archivo/archivo.module';
import { Archivo } from './archivo/entities/archivo.entity';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { RoleSeedModule } from './roles/rol-seed.module';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { inject } from 'vue';
import { ProgramasInstructorModule } from './programas-instructor/programas-instructor.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'templates'),
      serveRoot: '/public/'
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'gguias',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //  entities: [Programa, Competencia, Resultado, Archivo],
      synchronize: true,
    }),
    
    ProgramaModule,
    CompetenciaModule,
    ResultadosModule,
    ProgramacompetenciaModule,
    ArchivoModule,
    AuthModule,
    UsuariosModule,
    RolesModule,
    RoleSeedModule,
    ProgramasInstructorModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
