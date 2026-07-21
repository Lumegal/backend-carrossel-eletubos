import { Body, Controller, Get, Put } from '@nestjs/common';
import { MetasService } from './metas.service';
import { Meta } from './entities/meta.entity';

@Controller('metas')
export class MetasController {
  constructor(private readonly metasService: MetasService) {}

  @Get()
  async get(): Promise<Meta> {
    return this.metasService.get();
  }

  @Put()
  async update(@Body() dados: Partial<Meta>): Promise<Meta> {
    return this.metasService.update(dados);
  }
}
