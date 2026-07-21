import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendedor } from './entities/vendedor.entity';

@Injectable()
export class VendedoresService {
  constructor(
    @InjectRepository(Vendedor)
    private readonly vendedoresRepository: Repository<Vendedor>,
  ) {}

  async findAll(): Promise<Vendedor[]> {
    return this.vendedoresRepository.find({
      order: {
        nome: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Vendedor | null> {
    return this.vendedoresRepository.findOne({
      where: { id },
    });
  }

  async create(vendedor: Partial<Vendedor>): Promise<Vendedor> {
    const novoVendedor = this.vendedoresRepository.create(vendedor);

    return this.vendedoresRepository.save(novoVendedor);
  }

  async update(
    id: number,
    vendedor: Partial<Vendedor>,
  ): Promise<Vendedor | null> {
    await this.vendedoresRepository.update(id, vendedor);

    return this.findOne(id);
  }

  async setAtivo(id: number, ativo: boolean): Promise<Vendedor | null> {
    await this.vendedoresRepository.update(id, { ativo });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.vendedoresRepository.delete(id);
  }
}
