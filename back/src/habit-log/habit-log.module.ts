import { Module } from '@nestjs/common';
import { HabitLogService } from './habit-log.service';
import { HabitLogController } from './habit-log.controller';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [HabitLogController],
  providers: [HabitLogService],
})
export class HabitLogModule {}
