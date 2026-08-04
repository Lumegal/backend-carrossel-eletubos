import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    console.log(createPedidoDto);
    const vendedor = await this.vendedoresRepository.findOneBy({
      id: createPedidoDto.vendedorId,
    });

    if (!vendedor) {
      throw new NotFoundException('Vendedor não encontrado.');
    }

    console.log(vendedor);

    const pedido = this.pedidosRepository.create({
      numero: createPedidoDto.numero,
      data: new Date(createPedidoDto.data),
      pesoKg: createPedidoDto.pesoKg,
      valor: createPedidoDto.valor,
      vendedor,
    });

    console.log(pedido);

    return this.pedidosRepository.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidosRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
