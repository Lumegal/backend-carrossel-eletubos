import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Meta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mensal: number;

  @Column()
  semanal: number;

  @Column()
  diaria: number;
}
