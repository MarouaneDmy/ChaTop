import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { RentalsService } from './rentals.service.js';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';

@ApiTags('Rentals')
@ApiBearerAuth()
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @ApiOperation({ summary: 'Récupérer toutes les locations' })
  @ApiResponse({
    status: 200,
    description: 'Liste des locations récupérée avec succès.',
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié (token manquant ou invalide).',
  })
  @Get()
  findAll() {
    return this.rentalsService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer une location par son ID' })
  @ApiResponse({ status: 200, description: 'Location récupérée avec succès.' })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  @ApiResponse({ status: 404, description: 'Location non trouvée.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.findOne(id);
  }

  @ApiOperation({ summary: 'Créer une nouvelle location' })
  @ApiBody({ type: CreateRentalDto })
  @ApiResponse({ status: 201, description: 'Location créée avec succès.' })
  @ApiResponse({
    status: 400,
    description: 'Données invalides (erreur de validation DTO).',
  })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  @Post()
  create(@Body() createRentalDto: CreateRentalDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.rentalsService.create(createRentalDto, userId);
  }

  @ApiOperation({ summary: 'Mettre à jour une location' })
  @ApiBody({ type: UpdateRentalDto })
  @ApiResponse({
    status: 200,
    description: 'Location mise à jour avec succès.',
  })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  @ApiResponse({
    status: 403,
    description:
      "Interdit (vous n'êtes pas le propriétaire de cette location).",
  })
  @ApiResponse({ status: 404, description: 'Location non trouvée.' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRentalDto: UpdateRentalDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    return this.rentalsService.update(id, updateRentalDto, userId);
  }
}
