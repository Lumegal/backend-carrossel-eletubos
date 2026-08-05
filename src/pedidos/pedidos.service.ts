import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, QueryFailedError, Repository } from 'typeorm';
import { Vendedor } from 'src/vendedores/entities/vendedor.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,

    @InjectRepository(Vendedor)
    private readonly vendedoresRepository: Repository<Vendedor>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      const vendedor = await this.vendedoresRepository.findOneBy({
        id: createPedidoDto.vendedorId,
      });

      if (!vendedor) {
        throw new NotFoundException('Vendedor não encontrado.');
      }

      const pedido = this.pedidosRepository.create({
        numero: createPedidoDto.numero,
        data: new Date(createPedidoDto.data),
        pesoKg: createPedidoDto.pesoKg,
        valor: createPedidoDto.valor,
        vendedor,
      });

      return await this.pedidosRepository.save(pedido);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).driverError?.code === '23505' // PostgreSQL: unique_violation
      ) {
        throw new BadRequestException('Já existe um pedido com esse número.');
      }

      throw error;
    }
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidosRepository.find();
  }

  findOne(id: number) {
    return `findone`;
  }

  async findMesAtual(): Promise<Pedido[]> {
    const hoje = new Date();

    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 1);

    return this.pedidosRepository
      .createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.vendedor', 'vendedor')
      .where('pedido.data >= :primeiroDia', { primeiroDia })
      .andWhere('pedido.data < :ultimoDia', { ultimoDia })
      .orderBy('pedido.data', 'ASC')
      .getMany();
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.pedidosRepository.findOne({
      where: { id },
      relations: {
        vendedor: true,
      },
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    const vendedor = await this.vendedoresRepository.findOneBy({
      id: updatePedidoDto.vendedorId,
    });

    if (!vendedor) {
      throw new NotFoundException('Vendedor não encontrado.');
    }

    const pedidoComMesmoNumero = await this.pedidosRepository.findOneBy({
      numero: updatePedidoDto.numero,
    });

    if (pedidoComMesmoNumero && pedidoComMesmoNumero.id !== id) {
      throw new BadRequestException('Já existe um pedido com esse número.');
    }

    pedido.numero = updatePedidoDto.numero;
    pedido.data = new Date(updatePedidoDto.data);
    pedido.pesoKg = updatePedidoDto.pesoKg;
    pedido.valor = updatePedidoDto.valor;
    pedido.vendedor = vendedor;

    return await this.pedidosRepository.save(pedido);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.pedidosRepository.delete(id);
  }
}
