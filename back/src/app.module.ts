import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { HabitModule } from './habit/habit.module';
import { HabitLogModule } from './habit-log/habit-log.module';

@Module({
  imports: [DatabaseModule, UsersModule, CategoryModule, HabitModule, HabitLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
