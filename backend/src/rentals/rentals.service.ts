import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';

@Injectable()
export class RentalsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const rentals = await this.prisma.rental.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return rentals.map((rental) => ({
      ...rental,
      surface: Number(rental.surface),
      price: Number(rental.price),
    }));
  }

  async findOne(id: number) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!rental) {
      throw new NotFoundException(`Location avec l'id ${id} non trouvée.`);
    }

    return {
      ...rental,
      surface: Number(rental.surface),
      price: Number(rental.price),
    };
  }

  async create(createRentalDto: CreateRentalDto, userId: number) {
    const rental = await this.prisma.rental.create({
      data: {
        ...createRentalDto,
        owner_id: userId,
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return {
      ...rental,
      surface: Number(rental.surface),
      price: Number(rental.price),
    };
  }

  async update(id: number, updateRentalDto: UpdateRentalDto, userId: number) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) {
      throw new NotFoundException(`Location avec l'id ${id} non trouvée.`);
    }

    if (rental.owner_id !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres locations.',
      );
    }

    const updatedRental = await this.prisma.rental.update({
      where: { id },
      data: updateRentalDto,
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return {
      ...updatedRental,
      surface: Number(updatedRental.surface),
      price: Number(updatedRental.price),
    };
  }
}
