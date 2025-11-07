import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class CategoryService {
    constructor(private readonly databaseService: DatabaseService) {}
  create(createCategoryDto:Prisma.CategoryCreateInput ) {
    return   this.databaseService.category.create({ data: createCategoryDto });
  }

  findAll() {
    return this.databaseService.category.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  findAllByUser(userId: string) {
    return this.databaseService.category.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { habits: true },
    });
  }


  findOne(id: string) {
    return this.databaseService.category.findUnique({
      where: {id}
    })
  }

  update(id: string, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.databaseService.category.update({
      where: {id},
      data: updateCategoryDto
    })
  }

  remove(id: string) {
    return this.databaseService.category.delete({
      where : {id}
    })
  }
}
