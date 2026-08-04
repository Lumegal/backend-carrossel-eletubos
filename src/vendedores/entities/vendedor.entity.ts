import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Vendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    type: 'text',
  })
  foto: string;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Pedido, (pedido) => pedido.vendedor)
  pedidos!: Pedido[];
}
