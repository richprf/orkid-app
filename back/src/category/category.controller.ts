import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Prisma } from 'generated/prisma';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: Prisma.CategoryCreateInput) {
    return this.categoryService.create(createCategoryDto);
  }

@Get('user/:userId')
async findAllByUser(@Param('userId') userId: string) {
  return this.categoryService.findAllByUser(userId);
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
