import { Module } from "@nestjs/common";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { MetasModule } from "../metas/metas.module";
import { VendedoresModule } from "../vendedores/vendedores.module";

@Module({
  imports: [MetasModule, VendedoresModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}