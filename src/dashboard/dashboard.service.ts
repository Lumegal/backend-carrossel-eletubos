import { Injectable } from '@nestjs/common';
import { MetasService } from '../metas/metas.service';
import { VendedoresService } from '../vendedores/vendedores.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly metasService: MetasService,
    private readonly vendedoresService: VendedoresService,
  ) {}

  async getDashboard() {
    const metas = await this.metasService.get();
    const vendedores = await this.vendedoresService.findAll();

    return {
      metas,
      vendedores,
    };
  }
}
