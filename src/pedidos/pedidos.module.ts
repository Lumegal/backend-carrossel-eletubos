import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendedor } from 'src/vendedores/entities/vendedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Vendedor])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
