import { Test, TestingModule } from '@nestjs/testing';
import { HabitLogController } from './habit-log.controller';
import { HabitLogService } from './habit-log.service';

describe('HabitLogController', () => {
  let controller: HabitLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitLogController],
      providers: [HabitLogService],
    }).compile();

    controller = module.get<HabitLogController>(HabitLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
