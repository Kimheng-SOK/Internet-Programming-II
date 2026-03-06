import {
  Body,
  Get,
  Post,
  Delete,
  Controller,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ReceiptService } from './receipts.service';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('api/receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Get()
  findAll() {
    return this.receiptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateReceiptDto) {
    return this.receiptService.create(dto);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReceiptDto) {
    return this.receiptService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptService.remove(id);
  }
}
