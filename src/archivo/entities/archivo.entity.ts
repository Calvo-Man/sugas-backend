import { Resultado } from 'src/resultados/entities/resultado.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
@Entity()
export class Archivo {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column()
      name: string; // Otros campos que necesites
      
      @Column()
      url: string; // Otros campos que necesites
      

      @Column()
      tamano : number

      @Column()
      publicid : string
      
      @CreateDateColumn({ type: 'timestamp' })
      createdAt: Date;
    
      @UpdateDateColumn({ type: 'timestamp' })
      updatedAt: Date;

      @ManyToOne(() => Resultado, (resultado) => resultado.archivo,{ nullable: false })
      resultadoId: Resultado
    }


