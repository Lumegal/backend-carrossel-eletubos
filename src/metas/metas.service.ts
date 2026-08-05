import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meta } from './entities/meta.entity';
import { EventsGateway } from 'src/websocket/events.gateway';

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(Meta)
    private readonly metasRepository: Repository<Meta>,

    private readonly eventsGateway: EventsGateway,
  ) {}

  async get(): Promise<Meta> {
    let meta = await this.metasRepository.findOne({
      where: { id: 1 },
    });

    if (!meta) {
      meta = await this.metasRepository.save({
        id: 1,
        mensal: 0,
        semanal: 0,
        diaria: 0,
      });
    }

    return meta;
  }

  async update(dados: Partial<Meta>): Promise<Meta> {
    const metas = await this.metasRepository.update(1, dados);

    this.eventsGateway.emit('metasAtualizadas', metas);

    return this.get();
  }
}
