import { Archivo } from 'src/archivo/entities/archivo.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

export class Resultado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nombre: string;

  @Column()
  duracion: number;

  @ManyToOne(() => Programa, programa => programa.resultados,{ nullable: false,onDelete: 'CASCADE' })
  programa: Programa;

  @ManyToOne(() => Competencia, (competencia) => competencia.resultado,{ nullable: false,onDelete: 'CASCADE' })
    competencia: Competencia
   
    @OneToMany(() => Archivo, (archivo) => archivo.resultadoId,{ nullable: false,onDelete: 'CASCADE' })
    archivo: Archivo[]
}
