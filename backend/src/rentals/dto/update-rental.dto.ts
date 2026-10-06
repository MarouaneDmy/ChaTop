import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDto } from './create-rental.dto.js';

// PartialType rend tous les champs optionnels automatiquement
export class UpdateRentalDto extends PartialType(CreateRentalDto) {}
