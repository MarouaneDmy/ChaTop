import { Controller, Post, Body, Request } from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.messagesService.create(createMessageDto, userId);
  }
}
