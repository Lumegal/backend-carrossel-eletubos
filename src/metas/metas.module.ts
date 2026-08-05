import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetasController } from './metas.controller';
import { MetasService } from './metas.service';
import { Meta } from './entities/meta.entity';
import { EventsModule } from 'src/websocket/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meta]), EventsModule],
  controllers: [MetasController],
  providers: [MetasService],
  exports: [MetasService],
})
export class MetasModule {}
