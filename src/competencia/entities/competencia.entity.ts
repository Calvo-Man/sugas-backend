import { Programa } from "src/programa/entities/programa.entity";
import { Resultado } from "src/resultados/entities/resultado.entity";
import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index("IDX_COMPETENCIA_CODIGO", ["codigo"], { unique: true })
export class Competencia {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 80 })
    codigo: string;
  
    @Column({ length: 200 })
    nombre: string;

    @Column()
    duracion: number;

    
    @ManyToMany(() => Programa, programa => programa.competencias,{ nullable: false })
    programas: Programa[];
  
    @OneToMany(() => Resultado, (resultado) => resultado.competencia,{ nullable: false })
    resultado: Resultado[]
    
}


