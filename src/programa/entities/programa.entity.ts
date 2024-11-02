import { Competencia } from "src/competencia/entities/competencia.entity";
import { Resultado } from "src/resultados/entities/resultado.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index("IDX_PROGRAMA_CODIGO", ["codigo"], { unique: true })
export class Programa {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 80 })
    nombre: string;
  
    @Column({ length: 20 })
    codigo: string;

    @Column()
    version: number;

    @OneToMany(() => Resultado, resultado => resultado.programa)
    resultados: Resultado[];
    
    @ManyToMany(() => Competencia, competencia => competencia.programas)
    @JoinTable()
    competencias: Competencia[];

    @ManyToMany(() => Usuario, (user) => user.programa)
    @JoinTable()
    usuario:Usuario[]
}
