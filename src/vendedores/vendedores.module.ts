import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendedoresController } from './vendedores.controller';
import { VendedoresService } from './vendedores.service';
import { Vendedor } from './entities/vendedor.entity';
import { EventsModule } from 'src/websocket/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vendedor]), EventsModule],
  controllers: [VendedoresController],
  providers: [VendedoresService],
  exports: [VendedoresService],
})
export class VendedoresModule {}
