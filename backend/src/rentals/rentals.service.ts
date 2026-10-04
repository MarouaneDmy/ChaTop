import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

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

    // ✅ On convertit les objets Decimal en nombres JavaScript classiques
    return rentals.map((rental) => ({
      ...rental,
      surface: Number(rental.surface),
      price: Number(rental.price),
    }));
  }
}
