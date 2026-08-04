import {
  IsDateString,
  IsInt,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  @IsPositive()
  numero: number;

  @IsDateString()
  data: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  pesoKg: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valor: number;

  @IsInt()
  @IsPositive()
  vendedorId: number;
}