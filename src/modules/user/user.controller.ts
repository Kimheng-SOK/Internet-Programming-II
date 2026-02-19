import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post('/')
  createUser(@Body() body: createUserDto) {
    return this.userService.create(body);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
