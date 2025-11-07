import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HabitLogService {

        constructor(private readonly databaseService: DatabaseService) {}
  create(createHabitLogDto: Prisma.HabitLogCreateInput) {
    return this.databaseService.habitLog.create({data: createHabitLogDto});
  }

  findAll() {
    return this.databaseService.habitLog.findMany({});
  }

  findOne(id: string) {
    return  this.databaseService.habitLog.findUnique({
      where: {id}
    });
  }

  update(id: string, updateHabitLogDto: Prisma.HabitLogUpdateInput) {
    return this.databaseService.habitLog.update({where: {id} ,   data: updateHabitLogDto});
  }

  remove(id: string) {
    return  this.databaseService.habitLog.delete({
      where: {id}
    });
  }


  // گزارش ۳۰ روز گذشته برای همه‌ی عادت‌ها (یا فقط کاربر خاص)
async getMonthlyReport(userId: string) {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  return this.databaseService.habitLog.groupBy({
    by: ['habitId'],
    where: {
      completed: true,
      date: {
        gte: thirtyDaysAgo,
        lte: now,
      },
      habit: {
        userId, // اگر habit مدل userId دارد
      },
    },
    _count: { _all: true },
  });
}

}
