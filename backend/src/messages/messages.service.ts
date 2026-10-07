import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto, userId: number) {
    const rental = await this.prisma.rental.findUnique({
      where: { id: createMessageDto.rental_id },
    });

    if (!rental) {
      throw new NotFoundException(
        `Location avec l'id ${createMessageDto.rental_id} non trouvée.`,
      );
    }

    const message = await this.prisma.message.create({
      data: {
        ...createMessageDto,
        user_id: userId,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return message;
  }
}
