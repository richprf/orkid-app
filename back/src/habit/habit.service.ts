import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HabitService {
      constructor(private readonly databaseService: DatabaseService) {}
  create(createHabitDto: Prisma.HabitCreateInput) {
  return   this.databaseService.habit.create({ data: createHabitDto });
  }

findAll() {
  return this.databaseService.habit.findMany({
    orderBy: { createdAt: "desc" },
  });
}

findAllByUser(userId: string) {
  return this.databaseService.habit.findMany({
    where: { userId },
   
  });
}



 findOne(id: string) {
    return this.databaseService.habit.findUnique({
      where: {id}
    })
  }

  update(id: string, updateHabitDto: Prisma.HabitUpdateInput) {
    return this.databaseService.habit.update({
      where: {id},
      data: updateHabitDto
    })
  }


  remove(id: string) {
    return this.databaseService.habit.delete({
      where : {id}
    })
  }
}
