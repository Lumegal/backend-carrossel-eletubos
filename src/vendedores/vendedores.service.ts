import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendedor } from './entities/vendedor.entity';
import { EventsGateway } from 'src/websocket/events.gateway';

@Injectable()
export class VendedoresService {
  constructor(
    @InjectRepository(Vendedor)
    private readonly vendedoresRepository: Repository<Vendedor>,

    private readonly eventsGateway: EventsGateway,
  ) {}

  async findAll(): Promise<Vendedor[]> {
    return await this.vendedoresRepository.find({
      order: {
        nome: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Vendedor | null> {
    return await this.vendedoresRepository.findOne({
      where: { id },
    });
  }

  async create(vendedor: Partial<Vendedor>): Promise<Vendedor> {
    const novoVendedor = this.vendedoresRepository.create(vendedor);

    this.eventsGateway.emit('vendedorCriado', vendedor);

    const resultado = await this.vendedoresRepository.save(novoVendedor);

    return resultado;
  }

  async update(
    id: number,
    vendedor: Partial<Vendedor>,
  ): Promise<Vendedor | null> {
    await this.vendedoresRepository.update(id, vendedor);

    this.eventsGateway.emit('vendedorEditado', vendedor);

    return await this.findOne(id);
  }

  async setAtivo(id: number, ativo: boolean): Promise<Vendedor | null> {
    const vendedor = await this.vendedoresRepository.update(id, { ativo });

    this.eventsGateway.emit('vendedorAtivado', vendedor);

    return await this.findOne(id);
  }

  async setDesativado(id: number, ativo: boolean): Promise<Vendedor | null> {
    const vendedor = await this.vendedoresRepository.update(id, { ativo });

    this.eventsGateway.emit('vendedorDesativado', vendedor);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const resultado = this.vendedoresRepository.delete(id);

    this.eventsGateway.emit('vendedorExcluido', resultado);

    await resultado;
  }
}
