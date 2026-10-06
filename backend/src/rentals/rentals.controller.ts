import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  Put,
} from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Rentals')
@ApiBearerAuth()
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @ApiOperation({ summary: 'Récupérer toutes les locations' })
  @Get()
  findAll() {
    return this.rentalsService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer une location par son ID' })
  @ApiResponse({ status: 404, description: 'Location non trouvée.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.findOne(id);
  }

  @ApiOperation({ summary: 'Créer une nouvelle location' })
  @Post()
  create(@Body() createRentalDto: CreateRentalDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.rentalsService.create(createRentalDto, userId);
  }

  @ApiOperation({ summary: 'Mettre à jour une location' })
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
