
import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/role-guard/role-guard.guard';
import { Roles } from 'src/roles/decorator/role.decorator';
import { ProgramaService } from 'src/programa/programa.service';
import * as bcryptjs from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constans/jwt.constans';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private userRepository: Repository<Usuario>,
    private readonly programaService: ProgramaService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}


 async create(createUserDto: CreateUsuarioDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
 
  async findAll() {
    const users = await this.userRepository.find({
      relations: ['programa', 'role'],
      select: ['id', 'name', 'email', 'cedula', 'telefono'],
    });
    return users;
  }
  async recuperarContrasena(email: string): Promise<any> {
    
    const usuario = await this.userRepository.findOne({ where: { email: email } });

    if (usuario == null) {
      return {
        success: false,
        message: "No se encontró ningún usuario con ese correo electrónico",
      };
    }
    const payload = {
      cedula: usuario.cedula,
    };
    const token = await this.jwtService.signAsync(payload);
    return await this.mailerService.sendMail({
      to: email,
      subject: "Recuperación de contraseña",
      template: 'correo-recuperacion',
      context: {
        nombres: `${usuario.name} `,
        endpointBackend:this.configService.get<string>('ENDPOINT_BACKEND'),
        fondoPlantilla:`${this.configService.get<string>('ENDPOINT_BACKEND')}/public/img/fondo.png`,
        linkRecuperacion: `${this.configService.get<string>('ENDPOINT_FRONTEND')}${usuario.cedula}/${token}`,
      }
    }).then((send) => {
      return send.accepted.length > 0 ? {
        success: true,
        message: "Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña",
      } : {
        success: false,
        message: "No se ha podido enviar el correo electrónico",
      };
    }).catch(error => {
      return {
        success: false,
        message: "Sucedió un error enviando el correo",
        ex: error
      }
    });
  }
  async puedeRecuperar(cedula: string, token: string) {
    const usuario = await this.userRepository.findOne({ where: { cedula: cedula } });
    if (usuario == null) {
      return {
        puede: false,
        message: "No existe el usuario",
        ex: null
      };
    }
    try {
      const isValidToken = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      return {
        puede: true,
        message: null,
        ex: null,
        email: usuario.email
      };
    } catch (error) {
      return {
        puede: false,
        message: "Error al verificar el token",
        ex: error
      };
    }
  }


  async findProgramasAsignados(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['programa', 'programa.competencias'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user.programa;
  }
  async findProgramasNoAsignados(id: number) {
    // Obtener el usuario con los programas asignados
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['programa'],
    });
  
    // Obtener todos los programas
    const allProgramas = await this.programaService.findAll();
  
    // Filtrar los programas que no están asignados al usuario
    const programasNoAsignados = allProgramas.filter(
      (programa) => !user.programa.some((userPrograma) => userPrograma.id === programa.id)
    );
  
    
    return programasNoAsignados;
  }
  

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['programa'],
    });
  }
  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },relations: ['role']
    
    });
  }
async update( updateUserDto: UpdateUsuarioDto) {
    const user = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
    });
    console.log(user)
    
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
