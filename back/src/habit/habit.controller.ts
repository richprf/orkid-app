import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitService } from './habit.service';
import { Prisma } from 'generated/prisma';

@Controller('habit')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Post()
  create(@Body() createHabitDto: Prisma.HabitCreateInput) {
    return this.habitService.create(createHabitDto);
  }

  @Get()
  findAll() {
    return this.habitService.findAll();
  }

  @Get('user/:userId')
findByUser(@Param('userId') userId: string) {
  return this.habitService.findAllByUser(userId);
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitDto: Prisma.HabitUpdateInput) {
    return this.habitService.update(id, updateHabitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitService.remove(id);
  }
}
