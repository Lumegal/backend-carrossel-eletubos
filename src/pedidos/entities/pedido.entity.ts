import { Vendedor } from 'src/vendedores/entities/vendedor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  numero: number;

  @Column({
    type: 'date',
  })
  data: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  pesoKg: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  valor: number;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.pedidos, {
    nullable: false,
    onDelete: 'RESTRICT',
    eager: true,
  })
  vendedor: Vendedor;
}
