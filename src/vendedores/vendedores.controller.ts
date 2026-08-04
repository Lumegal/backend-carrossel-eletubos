import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { Vendedor } from './entities/vendedor.entity';

@Controller('vendedores')
export class VendedoresController {
  constructor(private readonly vendedoresService: VendedoresService) {}

  @Get()
  async findAll(): Promise<Vendedor[]> {
    return this.vendedoresService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Vendedor | null> {
    return this.vendedoresService.findOne(id);
  }

  @Post()
  async create(@Body() vendedor: Partial<Vendedor>): Promise<Vendedor> {
    return this.vendedoresService.create(vendedor);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() vendedor: Partial<Vendedor>,
  ): Promise<Vendedor | null> {
    return this.vendedoresService.update(id, vendedor);
  }

  @Patch(':id')
  async setAtivo(
    @Param('id', ParseIntPipe) id: number,
    @Body('ativo') ativo: boolean,
  ): Promise<Vendedor | null> {
    return this.vendedoresService.setAtivo(id, ativo);
  }

  @Patch('desativar/:id')
  async setDesativado(
    @Param('id', ParseIntPipe) id: number,
    @Body('ativo') ativo: boolean,
  ): Promise<Vendedor | null> {
    return this.vendedoresService.setDesativado(id, ativo);
  }
}
