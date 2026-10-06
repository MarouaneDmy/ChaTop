import { Controller, Post, Body, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';

@ApiTags('Messages')
@ApiBearerAuth() // Toutes les routes de ce controller sont protégées
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Envoyer un message concernant une location' })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({ status: 201, description: 'Message créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  @ApiResponse({ status: 404, description: 'Location non trouvée.' })
  create(@Body() createMessageDto: CreateMessageDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.messagesService.create(createMessageDto, userId);
  }
}
