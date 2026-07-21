import { PartialType } from '@nestjs/mapped-types';
import { CreateVendedoreDto } from './create-vendedor.dto';

export class UpdateVendedoreDto extends PartialType(CreateVendedoreDto) {}
