import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramasInstructorDto } from './create-programas-instructor.dto';

export class UpdateProgramasInstructorDto extends PartialType(CreateProgramasInstructorDto) {}
